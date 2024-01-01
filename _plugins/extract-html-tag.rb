# Replaces a specified character with a non-breaking space.
require "nokogiri"

module Jekyll

    module ExtractHtmlTag
        def extract_html_tag(input, tag)
            doc = Nokogiri::HTML(input)
            doc.xpath("//#{tag}").each {|node| return node.inner_html }
            ""
        end

        def exclude_html_tag(input, tag)
            doc = Nokogiri::HTML(input)
            doc.xpath("//#{tag}").each {|node| node.unlink }
            doc.to_s
        end
    end
end

Liquid::Template.register_filter(Jekyll::ExtractHtmlTag)