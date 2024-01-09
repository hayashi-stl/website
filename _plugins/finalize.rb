require "json"
require "nokogiri"
require "pathname"

def add_dependency_scripts(site)
	t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    # Copy .webpack over to _site
    webpack_dir = File.expand_path(site.source + "/.webpack")
	dest_dir = site.dest

    FileUtils.cp_r(webpack_dir + "/.", dest_dir)

    # Make sure all HTML files load the libraries that their scripts need.

    dep_map_path = File.expand_path(site.source + "/webpack-assets.json")
    raw_dep_map = File.open(dep_map_path) {|file| JSON.load(file)}

    # Dependency map should map paths to path lists
    dep_map = raw_dep_map.map {|_, js|
        raw_list = js["js"]
        absolute_list = raw_list.map {|path|
            File.expand_path(dest_dir + path.gsub(/^auto/, ""))
        }
        [absolute_list.last, absolute_list]
    }.to_h

    github_action = ENV.key? "GITHUB_ACTION"
    puts "Dest: #{dest_dir}"
    prefix = if github_action
        /(?<pre>\/[^\/]+)\/[^\/]+$/.match(dest_dir)[:pre]
    else
        ""
    end

    Dir.glob("#{dest_dir}/**/*.html") {|html_path| 

        # Find all <script> tags and get their sources
        doc = File.open(html_path) {|file| Nokogiri::HTML(file)}
        scr_paths = doc.xpath("//script").filter_map {|scr|
            # Ignore raw scripts and http scripts
            next if !scr["src"] || scr["src"].include?("//")

            # Distinguish absolute from relative path
            if scr["src"].start_with? "/"
                rel_path = scr["src"]
                if github_action then
                    # Remove first directory; this is the directory of the overall website
                    rel_path.gsub!(/^\/[^\/]*/, "")
                end
                File.expand_path(dest_dir + rel_path)
            else
                File.expand_path(File.dirname(html_path) + "/" + scr["src"])
            end
        }.to_a
        
        # Calculate unique dependencies
        deps = scr_paths.flat_map {|path| dep_map[path]}.uniq.to_a.difference(scr_paths)

        # Get home paths
        rel_deps = deps.map{|path|
            prefix + "/" + Pathname.new(path).relative_path_from(Pathname.new dest_dir).to_s
        }
        
        # Write the dependencies!
        body = doc.xpath("//body").first
        rel_deps.each {|path| body.add_child "<script type='module' src='#{path}'></script>"}
        File.open(html_path, "w") {|file| doc.write_to(file, encoding: "UTF-8", indent: 4)}
    }

	t2 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
	puts("Finalized scripts in #{t2-t1} seconds.")
end

def convert_svg_text_to_paths(site)
	t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    # Convert SVG text to paths for consistent display regardless of font existence

    cache_dir = File.expand_path(site.source + "/.svg-cache")
    rel_paths = Dir.glob("#{site.dest}/**/*.svg").map {|path|
        Pathname.new(path).relative_path_from(Pathname.new site.dest).to_s
    }
    rel_path_set = rel_paths.map {|path| [path, true]}.to_h

    # Clear stale cache files
    Dir.glob("#{cache_dir}/**/*.svg") {|path|
        rel = Pathname.new(path).relative_path_from(Pathname.new cache_dir).to_s
        if !rel_path_set.key? rel
            FileUtils.rm(path)
        end
    }

    # Regenerate invalid cache files
    rel_paths.each {|path|
        src = File.expand_path(site.source + "/" + path)
        cache = File.expand_path(cache_dir + "/" + path)
        dest = File.expand_path(site.dest + "/" + path)

        # Check if source changed
        next if !File.exist?(src) || (File.exist?(cache) && File.mtime(cache) >= File.mtime(src))
        puts "Regenerating #{path}"
        FileUtils.mkdir_p(File.dirname cache)

        doc = File.open(dest) {|file| Nokogiri::XML(file)}
        if doc.xpath("//xmlns:text").any? {|_| true}
            # There's text!
            system('inkscape', '-l', '-T', '-o', cache, dest)
            # Remove text attributes (sometimes empty ones are left)
            doc = File.open(cache) {|file| Nokogiri::XML(file)}
            doc.xpath("//xmlns:text").each {|node| node.unlink}
            File.open(cache, "w") {|file| doc.write_to(file, encoding: "UTF-8", indent: 4)}
        else
            # No text, just copy over
            FileUtils.cp(dest, cache)
        end

        # Make modification time of cache match that of src
        # so that detection still works if src was modified while
        # cache was being generated
        FileUtils.touch(cache, :mtime => File.mtime(src))
    }

    # Copy cache files back to dest
    FileUtils.cp_r(cache_dir + "/.", site.dest)

	t2 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
	puts("Converted SVG text to paths in #{t2-t1} seconds.")
end

Jekyll::Hooks.register :site, :post_write do |site|
    add_dependency_scripts(site)
    convert_svg_text_to_paths(site)
end