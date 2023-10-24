let quizzes = document.getElementsByClassName("quiz")
for (let i = 0; i < quizzes.length; i++) {
    let quiz = quizzes[i];
    let options = quiz.children;
    for (let j = 0; j < options.length; j++) {
        options[j].onclick = () => {
            if (options[j].className == "quizButton selected") {
                options[j].className = "quizButton";
            } else {
                options[j].className = "quizButton selected";
                for (let k = 0; k < options.length; k++) {
                    if (k!=j) {
                        options[k].className = "quizButton";
                    }
                }
            }
        }
    }
}