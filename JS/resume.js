/* shows class objects when clicking classes */
const classButton = document.querySelector('.class-button');
let classesState = 0; //0 means classes not visible. 1 means classes are visible
classButton.addEventListener('click', e => {
    //console.log("button clicked!");
    var degreeArray = document.getElementsByClassName('degree-details');
    for (let i = 0; i < degreeArray.length; i++) {
        const degreeDetail = degreeArray[i];
        degreeDetail.classList.toggle("hidden");
        setTimeout(function(){
            if (classesState == 0) {
                degreeArray[0].textContent = "Software Engineering";
                degreeArray[1].textContent = "Database Systems Design";
                degreeArray[2].textContent = "Human Interface Computing";
                degreeArray[3].textContent = "Design and Analysis of Algorithms";
                degreeArray[4].style.fontSize = "1.2em";
                degreeArray[4].textContent = "Operating Systems";
                classesState = 1;
            } else if (classesState == 1) {
                degreeArray[0].textContent = "Object Oriented Programming";
                degreeArray[1].textContent = "Data Structures and Abstraction";
                degreeArray[2].textContent = "Programming Patterns";
                degreeArray[3].textContent = "Structure of Programming Languages";
                degreeArray[4].textContent = "Computer Organization";
                classesState = 2;
            } else if (classesState == 2) {
                degreeArray[0].textContent = "Introduction to Cryptology";
                degreeArray[1].textContent = "Big Data Analytics";
                degreeArray[2].textContent = "Systems Programming";
                degreeArray[3].textContent = "Computer Graphics";
                degreeArray[4].textContent = "Game Programming";
                classesState = 3;
            } else if (classesState == 3) {
                degreeArray[0].textContent = "Kent State University";
                degreeArray[1].textContent = "3.93 GPA";
                degreeArray[2].innerHTML = "Dean's List<br>(2019 - 2022)";
                degreeArray[3].textContent = "December 2022 Graduation";
                degreeArray[4].style.fontSize = "1.1em";
                degreeArray[4].textContent = "Bonus Degree: Associates of Science (May 2022)";
                classesState = 0;
            }
            degreeDetail.classList.toggle("hidden");
        }, 600);
    }
});
