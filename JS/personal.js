const inProgress = document.querySelector('.in-progress-entry');
//const skillsContainer = document.querySelector('.skills-box');
window.onresize = checkForFlex;
window.onload = checkForFlex;
console.log("test");
console.log(inProgress.clientWidth);

function checkForFlex() {
    if (inProgress.clientWidth < 1200) {
        if (inProgress.classList.contains('flex-wrap') == false) {
            inProgress.classList.add('flex-wrap');
        }
    } else {
        if (inProgress.classList.contains('flex-wrap')) {
            inProgress.classList.remove('flex-wrap');
        }
    }
}