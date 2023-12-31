# Replaces a specified character with a non-breaking space.

module Jekyll

    class NbspBlock < Liquid::Block

        def initialize(tag_name, markup, parse_context)
            @char = markup.strip
            super
        end

        def render(context)
            super.gsub(@char, " ")
        end

    end
end

Liquid::Template.register_tag('nbsp', Jekyll::NbspBlock)