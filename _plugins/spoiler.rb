module Jekyll

    class SpoilerBlock < Liquid::Block

        def initialize(tag_name, markup, parse_context)
            super
        end

        def render(context)
            text = super
            result = "<div class='spoiler' markdown='1'>
#{text}
<div class='spoiler-cover' onclick='event.srcElement.style = \"display: none;\"'>
<div class='spoiler-text'>Spoiler</div>
</div>
</div>"
        end

    end
end

Liquid::Template.register_tag('spoiler', Jekyll::SpoilerBlock)