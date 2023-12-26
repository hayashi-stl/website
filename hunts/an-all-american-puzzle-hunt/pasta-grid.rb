def table_entry(item, x, y, array)
    "<td>
        <div>
            <div class='corner'>#{item["number"]}</div>
            #{
                if item.key? "text"
                    letter = item["text"]
                    letter_class = if letter == letter.upcase then "pastal" else "letter" end
                    letter.upcase!
                    "<div class='#{letter_class}'>#{letter}</div>"
                else
                    ""
                end
            }
        </div>
    </td>"
end