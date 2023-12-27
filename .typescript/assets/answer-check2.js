"use strict";
var check_text = document.getElementById("answer-check-text");
var check_button = document.getElementById("answer-check-button");
function checkAnswer() {
    var text = check_text.value.replace(/\s/g, "").toLowerCase();
    var answer = document.getElementById("answer").innerHTML;
    var verdict = document.getElementById("answer-check-verdict");
    var followup = document.getElementById("answer-followup");
    var normalized = answer.replace(/\s/g, "").toLowerCase();
    if (text === normalized) {
        verdict.innerHTML = "<span class='answer'>#{answer}</span><span class='correct'> is correct!</span>";
        followup.style.cssText = "";
    }
    else {
        verdict.innerHTML = "<span class='wrong'>Wrong!</span>";
        followup.style.cssText = "display: none;";
    }
}
check_button.addEventListener("click", checkAnswer);
check_text.addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        checkAnswer();
});
