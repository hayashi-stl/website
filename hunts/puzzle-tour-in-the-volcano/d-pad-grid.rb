def table_entry(item, x, y, array)
    td_classes = []
    if item["emph"] then
        td_classes << if /\S/.match? item["emph"] then "emph" else "deemph" end
    end

    exist_regex = /^\s*\S\s*$/
    region_regex = /^[A-Z][a-z]|[a-z][A-Z]$/
    if item.key? "text"
        text = item["text"]
        if exist_regex.match?(text + array.at(x, y - 1)["text"]) then td_classes << "top" end
        if exist_regex.match?(text + array.at(x, y + 1)["text"]) then td_classes << "bottom" end
        if exist_regex.match?(text + array.at(x - 1, y)["text"]) then td_classes << "left" end
        if exist_regex.match?(text + array.at(x + 1, y)["text"]) then td_classes << "right" end
        if region_regex.match?(text + array.at(x, y - 1)["text"]) then td_classes << "dashed-top" end
        if region_regex.match?(text + array.at(x - 1, y)["text"]) then td_classes << "dashed-left" end
    end

    "<td class='#{td_classes.join " "}'>
        <div>
            <div class='char'>#{item["text"]&.upcase or ""}</div>
        </div>
    </td>"
    td_classes = []
end