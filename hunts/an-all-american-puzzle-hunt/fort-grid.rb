def table_entry(item, x, y, array)
    classes = ["char"]
    if item["emph"] && item["emph"] != " " then
        classes << "emph"
    end
    "<td class='#{if item["block"] == "@" then "block" else "" end}'>
        <div>
            <div class='#{classes.join " "}'>#{item["text"] or ""}</div>
        </div>
    </td>"
end