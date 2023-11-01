// Thanks to Yoshi for the hint!
// Polyfill for IE < 9
if (!Node) {
    var Node = {};
}
if (!Node.COMMENT_NODE) {
    // numeric value according to the DOM spec
    Node.COMMENT_NODE = 8;
}

function getComments(elem) {
  var children = elem.childNodes;
  var comments = [];

  for (var i=0, len=children.length; i<len; i++) {
    if (children[i].nodeType == Node.COMMENT_NODE) {
      comments.push(children[i]);
    }
  }
  return comments;
}
let quizzes = document.getElementsByClassName("quiz")
for (let i = 0; i < quizzes.length; i++) {
    let quiz = quizzes[i];
    let data = getComments(quiz);
    let question = "";
    let answers = [];
    let correct = -1;
    let index = 0;
    let explanation = "";
    data.forEach((comment) => {
        if (comment.data.startsWith("QUESTION: ")) {
            question = comment.data.substring(10);
        }
        if (comment.data.startsWith("ANSWER ")) {
            if (comment.data[7]=="!") {
                let letter = comment.data[8];
                let answer = comment.data.substring(11);
                answers.push([letter,answer]);
                correct = index;
            } else {
                let letter = comment.data[7];
                let answer = comment.data.substring(10);
                answers.push([letter,answer]);
            }
            index+=1;
        }
        if (comment.data.startsWith("EXPLANATION: ")) {
            explanation = comment.data.substring(13);
        }
    });
    let questionTitle = document.createElement('b');
    console.log(question);
    questionTitle.innerText = question;
    quiz.appendChild(questionTitle);
    let div = document.createElement('div');
    div.classList = "optionsContainer";
    answers.forEach((answer) => {
        button = document.createElement('button');
        button.classList = "quizButton";
        let letter = document.createElement('span');
        letter.classList = "optionName";
        letter.innerText = answer[0];
        button.appendChild(letter);
        let answerText = document.createElement('span');
        answerText.innerText = " "+answer[1];
        button.appendChild(answerText);
        div.appendChild(button);
    });
    quiz.appendChild(div);
    quiz.innerHTML += `<button class="submit" disabled>
    Submit
</button>
<b style="display: none">Correct! 👍</b>
<b style="display: none">Incorrect. Try again or <u><a>see an explanation.</a></u></b>`;
    let explanationElement = document.createElement('p');
    explanationElement.innerText = explanation;
    explanationElement.style.display = 'none';
    quiz.appendChild(explanationElement);

    let options = quiz.children[1].children;
    let submit = quiz.children[2];
    let selected = -1;
    for (let j = 0; j < options.length; j++) {
        options[j].onclick = () => {
            if (options[j].className == "quizButton selected") {
                options[j].className = "quizButton";
                submit.disabled = true;
                selected = -1;
            } else {
                options[j].className = "quizButton selected";
                for (let k = 0; k < options.length; k++) {
                    if (k!=j) {
                        options[k].className = "quizButton";
                    }
                }
                submit.disabled = false;
                selected = j;
            }
        }
    }
    submit.onclick = () => {
        if (selected == correct) {
            quiz.children[3].style.display = "block";
            quiz.children[4].style.display = "none";
            explanationElement.style.display = "none";
            for (let k = 0; k < options.length; k++) {
                options[k].disabled = true;
            }
            
        } else {
            quiz.children[4].style.display = "block";
        }
    };
    quiz.children[4].children[0].children[0].onclick = () => {
        explanationElement.style.display = 'block';
    };
}