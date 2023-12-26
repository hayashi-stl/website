PropDesc = /^(?<num_lines>\d+) \s+ (?<prop>\w+) \s+ (?<format>\w+) \s* $/x

def prop_array(lines, text_format)
    arr = []

    case text_format
        when "asc"
            lines.each {|line|
                arr << line.grapheme_clusters
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
            print "#{Dir.pwd}\n"
            print "#{@mapping_filename.render(context)}\n"
            
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

            # Generate HTML!
            #require "#{Dir.pwd}#{@mapping_filename.render(context)}"
            html = ["<table>"]
            array.each_with_index {|row, y|
                html << "<tr>"
                row.each_with_index {|item, x|
                    html << ""#table_entry(item, x, y, array)
                }
                html << "</tr>"
            }
            html << "</table>"
            result = html.map {|line| "#{line}\n"}.join
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