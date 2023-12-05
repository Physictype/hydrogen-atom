function callback(entries, observer) {
    console.log("hi")
    let index = 0;
    for (let i = entries.length-1; i >= 0; i --) {
        if (entries[i].isIntersecting) {
            index = i;
            break;
        }
    }
    // for (let i = 0; i < headingLinks.length; i++) {
    //     console.log(i,index)
    //     if (i == index) {
    //         headingLinks[i].classList = "headinglink selected"
    //     } else {
    //         headingLinks[i].classList = "headinglink"
    //     }
    // }
}

let options = {
    root: document.querySelector("#content"),
    rootMargin: "0px",
    threshold: 1.0,
  };

let observer = new IntersectionObserver(callback, options);

let headings = document.querySelectorAll("h2")
let tableOfContents = document.getElementById("tableofcontents")
let headingLinks = []
for (let i = 0; i < headings.length; i++) {
    headingLink = document.createElement("p");
    headingLink.innerText = headings[i].innerText;
    headingLink.classList = "headinglink";
    headingLink.onclick = () => {
        headings[i].scrollIntoView();
    }
    headingLinks.push(headingLink)
    tableOfContents.appendChild(headingLink)
    observer.observe(headings[i]);
}