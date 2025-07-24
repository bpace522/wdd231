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
