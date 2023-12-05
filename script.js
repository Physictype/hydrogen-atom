let linkedTerms = document.getElementsByClassName("term link");
for (let i = 0; i < linkedTerms.length; i++) {
    linkedTerms[i].appendChild(document.getElementById(linkedTerms[i].getAttribute("data-link")).children[0].cloneNode(true))
}