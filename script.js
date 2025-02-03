const navbar = document.getElementsByTagName("nav");//Getting the navbar section
const logo = document.getElementById("konvata");// Getting company's logo
const vata = logo.firstElementChild;//Getting a part of the company's logo

const menuButton = document.querySelector("#menu-button");//Getting the button that toggles the menu's visibility
const menu = document.getElementById("menu");//Getting the menu

const hamburgerIcon = "assets/hamburger-icon.svg";//The hamburger icon
const closeIcon = "assets/close-icon.svg";//The close icon


// Functionality to toggle the menu's visibility
menuButton.addEventListener("click", function () {
    menu.classList.toggle("hidden");
    // menButton.firstElementChild.src = "assets/close-icon.svg";
    menuButton.firstElementChild.src = menuButton.firstElementChild.src.includes(closeIcon) ? hamburgerIcon : closeIcon;//Toggling the src value of the img tag in the menu button
})

// Functionality to close the menu when clicking outside of it
document.addEventListener("click", (event)=> {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)){
        menu.classList.add("hidden");//Closing the menu
        menuButton.firstElementChild.src = hamburgerIcon;//Changing the icon back to hamburger icon
    }
})

// Functionality to show the go-to-top link when the user scrolls the web page
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

 const firstSelect = document.getElementById("first-select");//Getting the first select element
 const secondSelect = document.getElementById("second-select");//Getting the second select element
 
 
 const firstInput = document.querySelector("#first-input");//Getting the first input
 let firstInputValue = firstInput.value;// Getting the first input value 
 let firstInputError = document.getElementById("first-input-div").nextElementSibling;//Getting the first error field
 
 const secondInput = document.querySelector("#second-input");//Getting the second input
 let secondInputValue = secondInput.value;//Getting the second input value
 let secondInputError = document.getElementById("second-input-div").nextElementSibling;//Getting the second error field

//  Storing conversion rates globally to avoid redundant API calls
let conversionRates = {};
 

// Fetching available currencies and populate dropdowns
const apiKey = "cur_live_u6a4fUBOPBpTHy7e73gmfaOQw4kAhZ7YlCccE3M7";// Free API Key from currencyapi.com to expire on Feb 20, 2025 
const url = "https://api.currencyapi.com/v3";//URL address for the api

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
    // Trying to catch errors
    try {
        const response = await fetch (
            `${url}/latest?apikey=${apiKey}&base_currency=${first}`
        );
        const data = await response.json();
        // conversionRates = data.data;

        for (const [currency, rate] of Object.entries(data.data)) {
            conversionRates[currency] = rate;
        }

    } catch (error) {
        console.error("Error fetching conversion rates: ", error);
    }
}



//Function to convert currency in one direction (first -> second)
function convertFirstToSecond() {

    
    let floatedFirstInputValue = parseFloat(firstInput.value);
    let second = secondSelect.value;

    if (!floatedFirstInputValue || floatedFirstInputValue <= 0 || !conversionRates[second]) {
        secondInputValue = "";// Clearing the second input field if input is invalid
        return;
    }

    const rate = conversionRates[second].value;    
    const convertedValue = (floatedFirstInputValue * rate).toFixed(2);
    secondInput.value = convertedValue;
    // secondInput.value = convertedValue;
    console.log("c value: ", floatedFirstInputValue, rate, convertedValue)
    // secondInputValue.style.color = "#4CAF50";

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
    console.log();
    
    const convertedValue = (floatedSecondInputValue * rate).toFixed(2);
    firstInput.value = convertedValue;
    // firstInputValue.style.color = "#4CAF50";
    console.log("c value: ", floatedSecondInputValue, rate, convertedValue)

}


// Event listeners
firstSelect.addEventListener("change", async () => {
    await fetchConversionRates();// Update rates when the "firstSelect" changes
    convertFirstToSecond();// Calculating the result
});
secondSelect.addEventListener ("change", convertFirstToSecond); // Update result when "secondSelect" changes
firstInput.addEventListener ("input", convertFirstToSecond); // Update "secondInput" in real-time when the "firstSelect" 
secondInput.addEventListener ("input", convertSecondToFirst); // Update "firstInput" in real-time when the "secondSelect" 

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


