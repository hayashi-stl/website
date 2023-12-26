def table_entry(item, x, y, array)
    if x % 2 == 1 and y % 2 == 1
        borders = []
        if array[y - 1][x]["text"] != " "
            borders << "top"
        end
        if array[y + 1][x]["text"] != " "
            borders << "bottom"
        end
        if array[y][x - 1]["text"] != " "
            borders << "left"
        end
        if array[y][x + 1]["text"] != " "
            borders << "right"
        end
        "<td class='#{borders.join " "}'>
            <div>
                <div class='char'>#{item["text"]}</div>
            </div>
        </td>"
    else
        ""
    end
end