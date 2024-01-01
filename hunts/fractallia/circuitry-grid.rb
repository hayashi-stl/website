def table_entry(item, x, y, array)
    td_classes = [if /\S/.match? item["cell"] then "cell" else "empty" end]
    if item["cell"] == "c" then td_classes << "circuit" end
    if item["cell"] == "b" then td_classes << "boolean" end
    if item["cell"] == "x" then td_classes << "extract" end

    "<td class='#{td_classes.join " "}'>
        <div>
            <div class='corner'>#{item["number"]&.strip or ""}</div>
            <div class='char'>#{item["text"] or ""}</div>
        </div>
    </td>"
end