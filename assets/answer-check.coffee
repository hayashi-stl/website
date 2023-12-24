---
---
check_text = document.getElementById("answer-check-text")
check_button = document.getElementById("answer-check-button")

checkAnswer = () ->
    text = check_text.value.replace(/\s/g, "").toLowerCase()
    answer = document.getElementById("answer").innerHTML
    verdict = document.getElementById("answer-check-verdict")
    followup = document.getElementById("answer-followup")
    normalized = answer.replace(/\s/g, "").toLowerCase()

    if text == normalized
        verdict.innerHTML = "<span class='answer'>#{answer}</span><span class='correct'> is correct!</span>"
        followup.style = ""
    else
        verdict.innerHTML = "<span class='wrong'>Wrong!</span>"
        followup.style = "display: none;"

check_button.addEventListener("click", checkAnswer)
check_text.addEventListener("keydown", (event) ->
    if event.key == "Enter"
        checkAnswer()
)