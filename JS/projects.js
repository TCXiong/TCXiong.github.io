//const inProgress = document.querySelector('.in-progress');
const inProgressEntry = document.querySelector('.in-progress-entry');
const skillsContainer = document.querySelector('.skills-box');
window.onresize = checkForFlex;
window.onload = checkForFlex;
console.log(skillsContainer.clientWidth);
console.log(inProgressEntry.clientWidth);

function checkForFlex() {
    if (inProgressEntry.clientWidth < 1200) {
        if (inProgressEntry.classList.contains('flex-wrap') == false) {
            inProgressEntry.classList.add('flex-wrap');
            console.log("adding to inprogress");            
        }
        if (inProgressEntry.clientWidth < 560) {
            if (skillsContainer.classList.contains('flex-wrap') == false) {
                skillsContainer.classList.add('flex-wrap');
                console.log("adding to skills");
            }
        } else {
            if (skillsContainer.classList.contains('flex-wrap')) {
                skillsContainer.classList.remove('flex-wrap');
                console.log("removing from skills");
            }
        }
    } else {
        if (inProgressEntry.classList.contains('flex-wrap')) {
            inProgressEntry.classList.remove('flex-wrap');
            console.log("removing from inprogress");
        }
    }
}