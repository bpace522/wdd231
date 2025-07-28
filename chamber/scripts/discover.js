const short = document.querySelector("#short");
const year = document.querySelector("#year")

const today = new Date();

const time = new Intl.DateTimeFormat("en-US", {
    timeStyle: "medium",
}).format(today);

short.innerHTML = `Last Modification: <span class="highlight">${new Intl.DateTimeFormat(
    "en-US",
    {
        dateStyle: "short"
    }
).format(today)}  ${time}</,span>`;

year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

const nav = document.querySelector('nav');
const hamburger_button = document.querySelector(".hamburger");

hamburger_button.addEventListener('click', () => {
    nav.toggleAttribute("open");
    hamburger_button.toggleAttribute("open");
})

const messageElement = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisitDate");
const now = new Date();

if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = new Date(lastVisit);
    const diffTime = now - lastVisitDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffTime < 1000 * 60 * 60 * 24) {
    messageElement.textContent = "Back so soon! Awesome!";
    } else {
    const dayText = diffDays === 1 ? "day" : "days";
    messageElement.textContent = `You last visited ${diffDays} ${dayText} ago.`;
    }
}

localStorage.setItem("lastVisitDate", now.toISOString());


const locationCard = document.getElementById("location-card");

async function GetLocations() {
    try {
        const response = await fetch("data/discover.json");
        const locations = await response.json();
        displayLocations(locations);
    } catch (error) {
        console.error("Error loading members:", error)
    }
}

function displayLocations(locations) {
    locationCard.innerHTML = "";
    locations.forEach(location => {
        const card = document.createElement("div");
        card.classList.add("location");
        card.innerHTML = `
        <h2>${location.name}</h2>
        <div class="image-wrapper">
            <img src="images/${location.image}" alt="Logo of ${location.name}">
        </div>
        <p>${location.address}</p>
        <p>${location.description}</p>  
        <button>Learn More</button>  
        `;
        locationCard.appendChild(card);
    });
}

GetLocations();