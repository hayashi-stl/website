def table_entry(item, x, y, array)
    td_classes = []
    if item.key? "region"
        region = item["region"]
        if array.at(x, y - 1)["region"] != region then td_classes << "top" end
        if array.at(x, y + 1)["region"] != region then td_classes << "bottom" end
        if array.at(x - 1, y)["region"] != region then td_classes << "left" end
        if array.at(x + 1, y)["region"] != region then td_classes << "right" end
        if region == "Y" then td_classes << "inside" end
    end
    "<td class='#{td_classes.join " "}'>
        <div>
            #{ if item["star"] == "s" then "<div class='star'>⭐</div>" else "" end }
            <div class='char'>#{item["text"] or ""}</div>
        </div>
    </td>"
end