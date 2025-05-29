import {loadPortfolio} from "./portfolio.js";
const stack = new URLSearchParams(window.location.search).get('stack') ?? "gamedev"
const skills = document.querySelector("#skillsContainer");

const city = document.querySelector("#location");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const whatsapp = document.querySelector("#whatsapp");


const education = document.querySelector("#education");
const experience = document.querySelector("#experience");

const headline = document.querySelector("#headline");
const jobTitle = document.querySelector("#jobTitle");
const birthday = document.querySelector("#birthday");
const aboutCity = document.querySelector("#aboutCity");
const aboutPhone = document.querySelector("#aboutPhone");
const aboutEmail = document.querySelector("#aboutEmail");
const aboutDescription = document.querySelector("#aboutDescription");
const profile = document.querySelectorAll("#profile");

function splitArray(arr, x) {
    const subarrays = [];
    const elementsPerSubarray = Math.ceil(arr.length / x);
  
    for (let i = 0; i < arr.length; i += elementsPerSubarray) {
      const subarray = arr.slice(i, i + elementsPerSubarray);
      subarrays.push(subarray);
    }
  
    return subarrays;
}

async function fetchLogos() {
    const response = await fetch(`assets/data/${stack}.json`);

    return await response.json();
}

function loadLogos() {
  fetchLogos().then((data) => {
        const logos = data.logos;
        const logoRows = splitArray(logos, Math.ceil(logos.length / 6));

        logoRows.forEach((logoRow) => {
            const row = document.createElement("div");
            row.className = "row";

            logoRow.forEach((logo) => {
                const column = document.createElement("div");
                column.className = "col-sm";
                column.innerHTML = `<div>
                <span class="iconify" data-icon="${logo.icon}"></span>
                <p>${logo.label}</p>
              </div>`;
              row.appendChild(column);
            })

            skills.appendChild(row);
        })
      })

}

async function fetchPersonal() {
  const response = await fetch(`assets/data/about.json`);
  return await response.json();
}

function loadPersonalInfo() {
  fetchPersonal().then((abouts) => {
    const about = abouts[0]
    profile.forEach((picture) => {
    picture.src = about.image;
  }) 
  city.textContent = about.city;
  email.textContent = about.email;
  phone.textContent = about.phone;
  whatsapp.innerHTML = `<a href="https://api.whatsapp.com/send?phone=%2B${about.whatsapp.number}">${about.whatsapp.label}</a>`;
})
}

function loadPage() {
        loadLogos();
        loadPersonalInfo();
        loadPortfolio(stack);
}
  
loadPage();