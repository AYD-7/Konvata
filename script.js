const navbar = document.getElementsByTagName("nav");
const logo = document.getElementById("konvata");
const vata = logo.firstElementChild;


const firstInput = document.querySelector("#first-input");
const firstInputValue = firstInput.value;
const firstInputError = document.getElementById("first-input-div").nextElementSibling;

const secondInput = document.querySelector("#second-input");
const secondInputValue = secondInput.value;
const secondInputError = document.getElementById("second-input-div").nextElementSibling;


// window.addEventListener("scroll", () => {
//     if (window.scrollY > 100) {
//         navbar[0].style.backgroundColor = "#f1f1f1";
//         logo.style.color = "#212121";
//         vata.style.color = "#2e7d32";
//     }
//     else {
        
//     }
// })

firstInput.addEventListener("input", function () {
    if (isNaN(firstInput.value)) {
        firstInputError.textContent = "Please enter a valid number!";        
    } else {
        firstInputError.textContent = "";
    }
})

firstInput.addEventListener("blur", function () {
    firstInputError.textContent = "";
})

secondInput.addEventListener("input", function () {
    if (isNaN(secondInput.value)) {
        secondInputError.textContent = "Please enter a valid number!";        
    } else {
        secondInputError.textContent = "";
    }
})

secondInput.addEventListener("blur", function () {
    secondInputError.textContent = "";
})
