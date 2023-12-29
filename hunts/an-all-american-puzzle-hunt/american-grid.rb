def table_entry(item, x, y, array)
    color = case item["bg"]
        when "r" then "red"
        when "b" then "blue"
        when "." then "white"
        else ""
    end
    "<td class='#{color}'>
        <div>
            #{if item["bg"] == "-" then "<div class='left ellipsis'>$$\\cdots$$</div>" else "" end}
            #{if item["bg"] == "_" then "<div class='right ellipsis'>$$\\cdots$$</div>" else "" end}
            <div class='char'>#{item["text"] or ""}</div>
        </div>
    </td>"
end