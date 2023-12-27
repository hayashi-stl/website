def table_entry(item, x, y, array)
    "<td class='#{if item["block"] == "@" then "block" else "" end}'>
        <div>
            <div class='char'>#{item["text"] or ""}</div>
        </div>
    </td>"
end