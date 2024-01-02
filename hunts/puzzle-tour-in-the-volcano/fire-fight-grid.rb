def table_entry(item, x, y, array)
    td_classes = []

    if item["cell"] == "m" then td_classes << "move" end
    if item["cell"] == "f" then td_classes << "fire" end
    if item["cell"] == "M" then td_classes << "fire-move" end
    if item["cell"] == "→" then td_classes << "arrow" end
    if item["cell"] == " " then td_classes << "space" end
    if item["cell"] == "@" then td_classes << "extract" end
    if /\d/.match? item["cell"] then
        td_classes << "fire-cell"
        td_classes << "fire-#{item["cell"]}"
    end

    fire_cell = /\d|@/.match? item["cell"]
    length = if fire_cell then 2 else 1 end

    "<td class='#{td_classes.join " "}' colspan='#{length}'>
        <div>
            #{if item["cell"] == "f" then "<img class='centered-img' src='../thrown-fire.svg'/>" else "" end}
            #{if item["cell"] == "→" then "<img class='centered-img' src='../fire-fight-arrow.svg'/>" else "" end}
            <div class='char'>#{item["text"] or ""}</div>
        </div>
    </td>"
end