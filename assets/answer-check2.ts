let check_text = document.getElementById("answer-check-text")! as HTMLInputElement
let check_button = document.getElementById("answer-check-button")!

function checkAnswer() {
    let text = check_text.value.replace(/\s/g, "").toLowerCase()
    let answer = document.getElementById("answer")!.innerHTML
    let verdict = document.getElementById("answer-check-verdict")!
    let followup = document.getElementById("answer-followup")!
    let normalized = answer.replace(/\s/g, "").toLowerCase()

    if (text === normalized) {
        verdict.innerHTML = "<span class='answer'>#{answer}</span><span class='correct'> is correct!</span>"
        followup.style.cssText = "";
    } else {
        verdict.innerHTML = "<span class='wrong'>Wrong!</span>"
        followup.style.cssText = "display: none;"
    }
}

check_button.addEventListener("click", checkAnswer)
check_text.addEventListener("keydown", function(event: KeyboardEvent) {
    if (event.key === "Enter")
        checkAnswer()
});