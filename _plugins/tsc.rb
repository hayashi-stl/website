# Modified from: https://gist.github.com/agatha2/fb11e8db8b6419889cfb297e46c71212

module Ag

	class TsGenerator < Jekyll::Generator
		safe true
		priority :low

		def generate(site)
			puts("      Updating TypeScript compile:")
			t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)

			#Compile TypeScript, relying on compiler to do caching
			system("tsc  --rootDir \"#{site.source}\" --outDir \".typescript\"")

			t2 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
			puts("        Builds updated in #{t2 - t1} seconds.")

			#Can't copy temporary to output here since Jekyll will nuke it, so make a post-build
			#	hook and copy the output there.

			#Remove all TypeScript files from output
			site.static_files.delete_if {|sf|
				next if not File.extname(sf.path) == ".ts"
				#puts("Removing \"#{sf.path}\" from output")
				true #note no `return`; don't want to return function
            }

			t3 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
			puts("        Files updated in #{t3 - t2} seconds.")
		end
	end

end

Jekyll::Hooks.register :site, :post_write do |site|
	t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)

	tmpdir = File.expand_path(site.source + "/.typescript")
	dstdir = site.dest

	puts("\"#{tmpdir}\" -> \"#{dstdir}\"")
	puts("#{Dir.glob("#{tmpdir}/**/*")}")

	#FileUtils.cp_r( tmpdir+"/.",dstdir, :verbose=>true );

	Dir.glob("#{tmpdir}/**/*") {|tmpfile_abs_path|
		file_rel_path = tmpfile_abs_path.gsub(tmpdir, "")
		puts("\"#{tmpfile_abs_path}\" -> \"#{file_rel_path}\"")
		dstfile_abs_path = File.join(dstdir, file_rel_path)
		puts("Copy \"#{tmpfile_abs_path}\" -> \"#{dstfile_abs_path}\"")

		if File.directory?(tmpfile_abs_path)
			FileUtils.mkdir_p(dstfile_abs_path)
		else
			FileUtils.cp(tmpfile_abs_path, dstfile_abs_path)
		end
    }

	t2 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
	puts("        Copied compiled TypeScript in #{t2-t1} seconds.")
end