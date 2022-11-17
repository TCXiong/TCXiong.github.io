/*The hover animation doesn't start unless the .circle-link classes have the class "ready" added. 
This is to avoid jarring animation when the mouse hovers over the buttons during the intro animation*/
let circleLinks = document.querySelectorAll('.circle-link');
setTimeout(() => {
    for (let i = 0; i < circleLinks.length; i++) {
        let circleLink = circleLinks[i];
        circleLink.classList.add('ready');
    }
}, 1100)