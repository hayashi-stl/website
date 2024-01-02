PropDesc = /^(?<num_lines>\d+) \s+ (?<prop>\w+) \s+ (?<format>\w+) \s* $/x

def prop_array(lines, text_format)
    arr = []

    def dsv_split(line, sep)
        delimiter = if sep == " " then /\s+/ else /#{Regexp.quote sep}/ end
        component = /\G (?<comp> | [^"] .*? | " ([^"] | "")*? " ) (#{delimiter} | $)/x

        offset = 0
        size = line.chars.size
        result = []
        while offset < size
            match = component.match(line, offset)
            match = if match then match else raise Exception.new("#{line} is not in the proper delimiter-separated format") end
            comp = match[:comp]
            if comp.start_with? '"' then
                comp.delete_prefix! '"'
                comp.delete_suffix! '"'
                comp.gsub!('""', '"')
            end
            result << comp
            offset += match[0].chars.size
        end
        result
    end

    case text_format
        when "asc"
            lines.each {|line|
                arr << line.grapheme_clusters
            }

        when "csv"
            lines.each {|line|
                arr << dsv_split(line, ",")
            }

        when "ssv"
            lines.each {|line|
                arr << dsv_split(line, " ")
            }
    end

    # Rectangularize
    max_width = arr.map {|row| row.size}.max
    arr.each {|line| line.push *Array.new(max_width - line.size, "")}

    arr
end

module Jekyll

    class GridTagBlock < Liquid::Block

        def initialize(tag_name, markup, parse_context)
            @mapping_filename = Liquid::Variable.new(markup, parse_context)
            super
        end

        def render(context)
            text = super
            github_action = ENV.key? "GITHUB_ACTION"
            
            num_lines = 0
            prop = nil
            text_format = nil
            text_array = []

            prop_arrays = {}

            # Read attributes
            text.lines(chomp: true).each { |line|
                if num_lines == 0
                    # Deal with the blank line at the beginning
                    if /^\s*$/.match line
                        next
                    end

                    match = PropDesc.match line
                    num_lines = match[:num_lines].to_i
                    prop = match[:prop]
                    text_format = match[:format]
                else
                    text_array << line
                    num_lines -= 1

                    # Finished reading an attribute; process it
                    if num_lines == 0
                        prop_arrays[prop] = prop_array(text_array, text_format)
                        text_array = []
                    end
                end
            }

            width = prop_arrays.values.map {|arr| arr[0].size}.max
            height = prop_arrays.values.map {|arr| arr.size}.max

            # Make all arrays the same size
            prop_arrays.values.each {|arr|
                # Match widths
                arr.each {|line| line.push *Array.new(width - line.size, "")}
                # Match heights
                arr.push *Array.new(height - arr.size) {Array.new(width)}
            }

            # Collate
            array = Array.new(height) {Array.new(width) {{}}}
            (0...height).each {|y|
                (0...width).each {|x|
                    prop_arrays.each {|prop, arr|
                        array[y][x][prop] = arr[y][x]
                    }
                }
            }

            array.instance_variable_set(:@width, width)
            array.instance_variable_set(:@height, height)
            def array.keys() self[0][0].keys end

            def array.at(x, y)
                if x >= 0 && x < @width && y >= 0 && y < @height
                    self[y][x]
                else
                    keys.map {|k| [k, ""]}.to_h
                end
            end

            # Generate HTML!
            rel_path = @mapping_filename.render(context)
            if github_action then
                # Remove first directory; this is the directory of the overall website
                rel_path.gsub!(/^\/[^\/]*/, "")
            end
            load "#{Dir.pwd}#{rel_path}"
            html = ["<table>"]
            array.each_with_index {|row, y|
                entries = []
                row.each_with_index {|item, x|
                    entries << table_entry(item, x, y, array)
                }
                
                all_entries = entries.join
                if not /\A\s*\z/.match? all_entries then
                    html << "<tr>#{all_entries}</tr>"
                end
            }
            html << "</table>"
            result = html.join
            result
        end

    end

    class PropTagBlock < Liquid::Block

        def initialize(tag_name, markup, parse_context)
            super
            @markup = markup
        end

        def render(context)
            # Record number of lines so the grid block knows where each attribute begins and ends
            text = super
            text = text.lines.drop(1).join
            "#{text.lines.size} #{@markup}\n#{text}"
        end

    end
end

Liquid::Template.register_tag('grid', Jekyll::GridTagBlock)
Liquid::Template.register_tag('prop', Jekyll::PropTagBlock)