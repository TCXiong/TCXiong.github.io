/* shows class objects when clicking classes */
const classButton = document.querySelector(".class-button");
let classesState = 0; //0 means classes not visible. 1 means classes are visible
classButton.addEventListener("click", (e) => {
  //console.log("button clicked!");
  var degreeArray = document.getElementsByClassName("degree-details");
  for (let i = 0; i < degreeArray.length; i++) {
    const degreeDetail = degreeArray[i];
    degreeDetail.classList.toggle("hidden");
    setTimeout(function () {
      if (classesState == 0) {
        degreeArray[0].textContent = "Software Engineering";
        degreeArray[1].textContent = "Database Systems Design";
        degreeArray[2].textContent = "Artificial Intelligence";
        degreeArray[3].textContent = "Introduction to Algorithms";
        degreeArray[4].style.fontSize = "1.2em";
        degreeArray[4].textContent = "Operating Systems";
        classButton.textContent = "Major Courses";
        classesState = 1;
      } else if (classesState == 1) {
        degreeArray[0].textContent = "Object Oriented Programming";
        degreeArray[1].textContent = "Data Structures and Algorithms";
        degreeArray[2].textContent = "Programming Patterns";
        degreeArray[3].textContent = "Programming Languages and Compilers";
        degreeArray[4].textContent = "Machine Organization and Programming";
        classButton.textContent = "Major Courses";
        classesState = 2;
      } else if (classesState == 2) {
        degreeArray[0].textContent = "Building User Interface";
        degreeArray[1].textContent = "Data Programming";
        degreeArray[2].textContent = "Computer Systems";
        degreeArray[3].textContent = "Computer Graphics";
        degreeArray[4].textContent = "Web Programming";
        classButton.textContent = "My Profile";

        classesState = 3;
      } else if (classesState == 3) {
        degreeArray[0].textContent = "University of Wisconsin–Madison";
        degreeArray[1].textContent = "4.0 GPA";
        degreeArray[2].innerHTML = "Dean's List<br>(2021 - 2022)";
        degreeArray[3].textContent = "May 2024 Graduation";
        degreeArray[4].style.fontSize = "1.1em";
        degreeArray[4].textContent = "Data Science Certificate";
        classButton.textContent = "Major Courses";
        classesState = 0;
      }
      degreeDetail.classList.toggle("hidden");
    }, 600);
  }
});
