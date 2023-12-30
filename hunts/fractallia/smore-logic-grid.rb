def table_entry(item, x, y, array)
    if item["text"] == "-"
        "<td colspan='8'><div><div class='char'>$$\\cdots$$</div></div></td>"
    elsif /[A-H01?]/.match? item["text"]
        classes = ["char"]
        if /[A-H]/.match? item["text"] then classes << "name" end
        if /[01]/.match? item["text"] then classes << "sure" end
        if item["text"] == "?" then classes << "unsure" end
        "<td>
            <div>
                <div class='#{classes.join " "}'>#{item["text"]}</div>
            </div>
        </td>"
    else
        ""
    end
end