def table_entry(item, x, y, array)
    td_classes = []
    if /\S/.match? item["cell"] then td_classes << "cell" end

    lava = if item["cell"] == "." then
        td_classes << "lava"
        "<img class='center-img' src='../15-puzzle/lava.png'/>"
    else
        ""
    end

    illumination_classes = {
        ">" => "right",
        "^" => "up",
        "<" => "left",
        "v" => "down"
    }
    illumination = if /[>^<v]/.match? item["cell"]
        "<img class='center-img #{illumination_classes[item["cell"]]}' src='../15-puzzle/illumination.svg'/>"
    else
        ""
    end

    "<td class='#{td_classes.join " "}'>
        <div>
            #{lava} #{illumination}
            <div class='char'>#{item["text"] or ""}</div>
        </div>
    </td>"
end