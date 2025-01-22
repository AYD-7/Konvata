const navbar = document.getElementsByTagName("nav");
const logo = document.getElementById("konvata");
const vata = logo.firstElementChild;

const firstSelect = document.getElementById("first-select"); 
const secondSelect = document.getElementById("second-select"); 


const firstInput = document.querySelector("#first-input");
const firstInputValue = firstInput.value;
const firstInputError = document.getElementById("first-input-div").nextElementSibling;

const secondInput = document.querySelector("#second-input");
const secondInputValue = secondInput.value;
const secondInputError = document.getElementById("second-input-div").nextElementSibling;

const menuButton = document.querySelector("#menu-button");
const menu = document.getElementById("menu");

const hamburgerIcon = "assets/hamburger-icon.svg";
const closeIcon = "assets/close-icon.svg";

menuButton.addEventListener("click", function () {
    menu.classList.toggle("hidden");
    // menButton.firstElementChild.src = "assets/close-icon.svg";
    menuButton.firstElementChild.src = menuButton.firstElementChild.src.includes(closeIcon) ? hamburgerIcon : closeIcon;
})

document.addEventListener("click", (event)=> {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)){
        menu.classList.add("hidden");
        menuButton.firstElementChild.src = hamburgerIcon;
    }
})

window.addEventListener("scroll", () => {
    const goToTop = document.getElementById("go-to-top");

    if (window.scrollY > 100) {
        goToTop.style.display = "block";
    } else {
        goToTop.style.display = "none";
    }
    
//     if (window.scrollY > 100) {
//         navbar[0].style.backgroundColor = "#f1f1f1";
//         logo.style.color = "#212121";
//         vata.style.color = "#2e7d32";
//     }
//     else {
        
//     }
 })

firstInput.addEventListener("input", function () {
    if (isNaN(firstInput.value)) {
        firstInputError.style.display = "block";        
    } else {
        firstInputError.style.display = "none";
    }
})

firstInput.addEventListener("blur", function () {
    firstInputError.style.display = "none";
})

secondInput.addEventListener("input", function () {
    if (isNaN(secondInput.value)) {
        secondInputError.style.display = "block";        
    } else {
        secondInputError.style.display = "none";
    }
})

secondInput.addEventListener("blur", function () {
    secondInputError.style.display = "none";
})


