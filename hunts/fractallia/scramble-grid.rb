def table_entry(item, x, y, array)
    "<td>
        <div>
            <div class='number'>#{item["number"]&.strip or ""}</div>
            <div class='char'>#{item["text"] or ""}</div>
        </div>
    </td>"
end