FoldSrc = /\G ^.* src=('|") (?<filename>[^'"]*.fold) ('|") .*$/
module Jekyll

    class FoldBlock < Liquid::Block

        def initialize(tag_name, markup, parse_context)
            super
        end

        def render(context)
            text = super
            doc = Nokogiri::HTML(text)
            img = doc.xpath("//img").first()
            src = img.get_attribute("src")
            img.set_attribute("src", "#{src}.d.svg")
            img.set_attribute("onclick", "
if (event.srcElement.nextElementSibling.hasAttribute('style')) {
    event.srcElement.nextElementSibling.removeAttribute('style');
} else {
    event.srcElement.nextElementSibling.style = 'display: none;';
}")
            img.add_class("fold")
            result = "<div>
#{img}
<div class='fold-options' style='display: none;'>
<div><a href='#{src}'>.fold</a></div>
<div><a href='#{src}.cp'>.cp</a></div>
<div><a href='#{src}.svg'>.svg</a></div>
</div>
</div>"
            result
        end

    end
end

Liquid::Template.register_tag('fold', Jekyll::FoldBlock)