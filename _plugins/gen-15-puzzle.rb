require 'pathname'

module Jekyll

    class Gen15Puzzle < Liquid::Block
        def initialize(tag_name, markup, parse_context)
            super
        end

        def render(context)
            param_regexp = /^\s* (?<name>\w+) : (?<value>.*) $/x
            param_str = super
            params = param_str.lines.filter_map {|line|
                next if line.strip == ""

                match = param_regexp.match line
                [match[:name], match[:value]]
            }.to_h

            id = params["id"]
            assets = Pathname.new params["assets"]
            lava = params["lava"].split(" ").map {|n| n.to_i}
            bg = params["bg"].to_i
            size = 4

            lines = ["<svg id='#{id}' viewBox='0 0 #{size} #{size}'>"]
            edge_width = 0.01

            # Background
                
            bg_index = "%02d" % bg
            (0...size).each {|y|
                (0...size).each {|x|
                    lines << "<image x='#{x}' y='#{y}' width='1' height='1' href='#{assets + "tile-#{bg_index}.png"}'/>"
                    lines << "<image x='#{x}' y='#{y}' width='1' height='1' href='#{assets + "coin-#{bg_index}.png"}'/>"
                    lines << "<rect x='#{x}' y='#{y}' width='1' height='1' fill='none' stroke='black' stroke-width='#{edge_width}'/>"
                }
            }
                
            # Non-lava tile pictures
            (0...size).each {|y|
                (0...size).each {|x|
                    i = y * size + x
                    next if lava.include?(i) || i == bg
                    index = "%02d" % i
                    lines << "<g tile='#{i}' style='transform: translate(#{x}px, #{y}px);' class='interact' interact='1'>
                        <image x='0' y='0' width='1' height='1' href='#{assets + "tile-#{index}.png"}'/>
                        </g>"
                }
            }

            # Illumination for lava
            (0...size).each {|y|
                (0...size).each {|x|
                    i = y * size + x
                    next if !lava.include? i
                    
                    [[1, 0], [0, 1], [-1, 0], [0, -1]].each {|d|
                        dx = d[0]
                        dy = d[1]
                        angle = Math.atan2(dy, dx) * 180 / Math::PI + 180
                        lines << "<g tile='#{i}' style='transform: translate(#{x}px, #{y}px);'>
                            <image 
                                x='#{dx}' y='#{dy}' width='1' height='1'
                                transform='rotate(#{angle} #{dx + 0.5} #{dy + 0.5})'
                                href='#{assets + "illumination.svg"}'/>
                            </g>"
                    }
                }
            }

            # Lava tile pictures
            (0...size).each {|y|
                (0...size).each {|x|
                    i = y * size + x
                    next if !lava.include? i
                    index = "%02d" % i
                    lines << "<g tile='#{i}' style='transform: translate(#{x}px, #{y}px);' class='interact' interact='1'>
                        <image x='0' y='0' width='1' height='1' href='#{assets + "tile-#{index}.png"}'/>
                        </g>"
                }
            }

            # Coins
            (0...size).each {|y|
                (0...size).each {|x|
                    i = y * size + x
                    next if i == bg
                    index = "%02d" % i
                    lines << "<g tile='#{i}' style='transform: translate(#{x}px, #{y}px);'>
                        <image x='0' y='0' width='1' height='1' href='#{assets + "coin-#{index}.png"}'/>
                        </g>"
                }
            }

            # Borders
            (0...size).each {|y|
                (0...size).each {|x|
                    i = y * size + x
                    next if i == bg 
                    lines << "<g tile='#{y * size + x}' style='transform: translate(#{x}px, #{y}px);'>
                        <rect x='0' y='0' width='1' height='1' fill='none' stroke='black' stroke-width='#{edge_width}'/>
                        </g>"
                }
            }

            lines << "</svg>"
            lines.join ""
        end

    end
end

Liquid::Template.register_tag('gen_15_puzzle', Jekyll::Gen15Puzzle)