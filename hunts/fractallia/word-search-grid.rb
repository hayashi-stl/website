def table_entry(item, x, y, array)
    td_classes = []
    if /[^\s]/.match? item["extract"] then td_classes << "extract" end

    if item.key? "region"
        region = item["region"]
        regex = /^(?!#{Regexp.quote region}).$/
        # Checks for existence and difference at the same time
        if regex.match? array.at(x, y - 1)["region"] then td_classes << "top" end
        if regex.match? array.at(x, y + 1)["region"] then td_classes << "bottom" end
        if regex.match? array.at(x - 1, y)["region"] then td_classes << "left" end
        if regex.match? array.at(x + 1, y)["region"] then td_classes << "right" end
        if /[^\s]/.match? region then td_classes << "inside" end
    end

    txt_classes = ["char"]
    if /[rygbp]/.match? item["color"]
        txt_classes << item["color"]
    else
        txt_classes << "deemph"
    end

    # Arrow
    dir_match = /([+-]\d)([+-]\d)/.match item["loop"]
    arrow = if dir_match
        grid_size = 20
        dir = [dir_match[1].to_i, dir_match[2].to_i]
        len = 3
        angle = Math.atan2(-dir[1], dir[0]);
        width = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]) * grid_size;
        offset = -width / 2
        
        arrow_w = 8
        arrow_h = 10

        "<svg class='arrow' style='transform-origin: left; transform: translateX(#{grid_size / 2}px) rotate(#{angle}rad);'
                width='#{width}' height='#{grid_size}'>
            <line x1='#{grid_size / 3}' y1='#{grid_size / 2}' x2='#{width}' y2='#{grid_size / 2}'/>
            <polyline points='#{width - arrow_w},#{arrow_h / 2 + grid_size / 2}
                #{width},#{grid_size / 2}
                #{width - arrow_w},#{-arrow_h / 2 + grid_size / 2}'/>
        </svg>"
    else
        ""
    end

    "<td class='#{td_classes.join " "}'>
        <div>
            #{arrow}
            <div class='#{txt_classes.join " "}'>#{item["text"] or ""}</div>
        </div>
    </td>"
end