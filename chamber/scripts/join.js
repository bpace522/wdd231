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

const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');

document.getElementById("timestamp").value = new Date().toISOString();

document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', e => {
    e.preventDefault();
    const modalId = link.getAttribute('data-modal');
    document.getElementById(modalId).showModal();
    });
});


const nav = document.querySelector('nav');
const hamburger_button = document.querySelector(".hamburger");

hamburger_button.addEventListener('click', () => {
    nav.toggleAttribute("open");
    hamburger_button.toggleAttribute("open");
})

// var path = window.location.href.split("=").pop();

// var liContainer = document.getElementById("navMenu");
// const navAnchor = liContainer.getElementsByClassName('mainMenu');

// for (var i = 0; i < navAnchor.length; i++) {  
//   var liAnchor = navAnchor[i].getElementsByTagName("a");
//   for (var j = 0; j < liAnchor.length; j++) {
//     linkPath = liAnchor[j].getAttribute("href").split("=").pop();
//     if (linkPath === path) {
//       var current = document.getElementsByClassName("active");
//       current[0].className = current[0].className.replace(" active", "");
//       navAnchor[i].className += " active";
//     } 
//   }
// }