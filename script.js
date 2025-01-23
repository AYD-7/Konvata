const navbar = document.getElementsByTagName("nav");//Getting the navbar section
const logo = document.getElementById("konvata");// Getting company's logo
const vata = logo.firstElementChild;

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

 const firstSelect = document.getElementById("first-select"); 
 const secondSelect = document.getElementById("second-select"); 
 
 
 const firstInput = document.querySelector("#first-input");
 const firstInputValue = firstInput.value;
 const firstInputError = document.getElementById("first-input-div").nextElementSibling;
 
 const secondInput = document.querySelector("#second-input");
 const secondInputValue = secondInput.value;
 const secondInputError = document.getElementById("second-input-div").nextElementSibling;

//  Storing conversion rates globally to avoid redundant API calls
let conversionRates = {};
 

// Fetching available currencies and populate dropdowns
const apiKey = "cur_live_n4Qiv6gkOCOdUH6pf0mMcCuqRdzMSqWg8hMyhKnO";
const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_n4Qiv6gkOCOdUH6pf0mMcCuqRdzMSqWg8hMyhKnO";

async function  fetchCurrencies (){
    try {
        const response = await fetch (`${url}/currencies?apikey=${apiKey}`);
        const data = await response.json();
        const currencies = data.data;

        // Populating both dropdowns 
        for (let currency in currencies) {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = `${currency} - ${currencies[currency].name}`;
            firstSelect.appendChild(option1);
            secondSelect.appendChild(option2);
        }
        firstSelect.value = "USD";
        secondSelect.value = "EUR";

        //Fetching initial conversion rates
        await fetchConversionRates();
    } catch (error) {
        console.error("Error fetching currencies: ", error);
    }
    
}

//Function to fetch conversion rates for the firstSelect
async function fetchConversionRates () {
    const first = firstSelect.value;
    try {
        const response = await fetch (
            `${url}/latest?apikey=${apiKey}&base_currency=${first}`
        );
        const data = await response.json();
        conversionRates = data.data;
    } catch (error) {
        console.error("Error fetching conversion rates: ", error);
    }
}

//Function to convert currency in one direction (first -> second)
function convertFirstToSecond() {
    const floatedFirstInputValue = parseFloat(firstInputValue);
    const second = secondSelect.value;

    if (!floatedFirstInputValue || floatedFirstInputValue <= 0 || !conversionRates[second]) {
        secondInputValue = "";// cClearing the second input field if input is invalid
        return;
    }

    const rate = conversionRates[second].value;
    const convertedValue = (floatedFirstInputValue * rate).toFixed(2);
    secondInputValue = convertedValue;
    secondInputValue.style.color = "#4CAF50";
}

//Function to convert currency in the other direction (second -> first)

function convertSecondToFirst() {
    const floatedSecondInputValue = parseFloat(secondInputValue);
    const first = firstSelect.value;

    if (!floatedSecondInputValue || floatedSecondInputValue <= 0 ||!conversionRates[first]) {
        firstInputValue = "";// Clearing the first input field if input is invalid
        return;
    }

    const rate = 1 / conversionRates[first].value;
    const convertedValue = (floatedSecondInputValue * rate).toFixed(2);
    firstInputValue = convertedValue;
    firstInputValue.style.color = "#4CAF50";
}

// Event listeners
firstSelect.addEventListener("change", async () => {
    await fetchConversionRates();// Update rates when the "firstSelect" changes
    convertFirstToSecond();// Calculating the result
});
secondSelect.addEventListener ("change", convertFirstToSecond); // Update result when "secondSelect" changes
firstInput.addEventListener ("change", convertFirstToSecond); // Update "secondInput" in real-time when the "firstSelect" changes
secondInput.addEventListener ("change", convertSecondToFirst); // Update "firstInput" in real-time when the "secondSelect" changes

// Input validation
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


//Initialize the dropdowns and fetch initial data

fetchCurrencies();


