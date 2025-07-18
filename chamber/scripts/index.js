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

// const membersContainer = document.getElementById("members");
// const gridButton = document.getElementById("grid-view");
// const listButton = document.getElementById("list-view");

// async function loadMembers() {
//     try {
//         const response = await fetch("data/members.json");
//         const members = await response.json();
//         displayMembers(members);
//     } catch (error) {
//         console.error("Error loading members:", error)
//     }
// }

// function displayMembers(members) {
//     membersContainer.innerHTML = "";
//     members.forEach(member => {
//         const card = document.createElement("div");
//         card.classList.add("member-card");
//         card.innerHTML = `
//         <img src="images/${member.image}" alt="Logo of ${member.name}">
//         <h2>${member.name}</h2>
//         <p>${member.address}</p>
//         <p>${member.phone}</p>
//         <a href="${member.website}" target="_blank">Visit Website</a>
//         <p class="membership-level">Membership: ${levelName(member.membership)}</p>
//         <p>${member.description}</p>
//         `;
//         membersContainer.appendChild(card);
//     });
// }

// function levelName(level) {
//     switch(level) {
//         case 1: return "Member";
//         case 2: return "Silver";
//         case 3: return "Gold";
//         default: return "Unknown";
//     }
// }

// gridButton.addEventListener("click", () => {
//     membersContainer.classList.add("grid");
//     membersContainer.classList.remove("list");
// });

// listButton.addEventListener("click", () => {
//     membersContainer.classList.add("list");
//     membersContainer.classList.remove("grid");
// });

// loadMembers();

const spotlightsContainer = document.getElementById('spotlights');

async function loadSpotlights() {
  const response = await fetch('data/members.json');
  const members = await response.json();

  const featuredMembers = members.filter(member => 
    member.membership === 3 || member.membership === 2
  );

  featuredMembers.sort(() => 0.5 - Math.random());

  const spotlightCount = Math.floor(Math.random() * 2) + 2;
  const spotlights = featuredMembers.slice(0, spotlightCount);

  spotlightsContainer.innerHTML = spotlights.map(member => `
    <div class="spotlight-card">
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Website</a></p>
       <p class="membership-level">Membership: ${levelName(member.membership)}</p>
    </div>
  `).join('');

function levelName(level) {
    switch(level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Unknown";
    }
}
}

loadSpotlights();


const weatherContainer = document.getElementById('weather');
const apiKey = 'b3ddf6dfc368e767b3c45f7509e9d88d';
const lat = '-23.533773';
const lon = '-46.625290';

async function getWeather() {
  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const currentResponse = await fetch(currentUrl);
    const currentData = await currentResponse.json();
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    displayWeather(currentData, forecastData);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    weatherContainer.innerHTML = `<p>Unable to load weather data at this time.</p>`;
  }
}

function displayWeather(currentData, forecastData) {
  const currentTemp = currentData.main.temp.toFixed(1);
  const currentDesc = currentData.weather[0].description;
  const locationName = currentData.name;
  let forecastHTML = '<h3>3-Day Forecast</h3><ul>';
  const intervals = [8, 16, 24]; 
  intervals.forEach((i, idx) => {
    if (forecastData.list[i]) {
      const dayTemp = forecastData.list[i].main.temp.toFixed(1);
      const desc = forecastData.list[i].weather[0].description;
      const date = new Date(forecastData.list[i].dt_txt);
      forecastHTML += `<li>Day ${idx+1} (${date.toLocaleDateString()}): ${dayTemp} °F, ${desc}</li>`;
    }
  });
  forecastHTML += '</ul>';

  weatherContainer.innerHTML = `
    <h2>Current Weather in ${locationName}</h2>
    <p>Temperature: ${currentTemp} °F</p>
    <p>Conditions: ${currentDesc}</p>
    ${forecastHTML}
  `;
}

getWeather();



