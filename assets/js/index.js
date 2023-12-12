import {loadPortfolio} from "./portfolio.js";
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

async function fetchData() {
    const response = await fetch('assets/data/db.json');
    return await response.json();
}

function loadLogos(data) {
        const logos = data.technologies.find((logosFile) => logosFile.id == "index").logos;
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
}

function loadResume(data) {
  const educationData = data.resume.education
  const experienceData = data.resume.experience

  educationData.forEach((degree) => {
    if(degree.visible) {    
    const block = document.createElement('div');
    block.className = "resume-item";
    block.innerHTML = `<h4>${degree.name}</h4>
    <h5>${degree.date}</h5>
    <p><em>${degree.instituition}</em></p>
    <p>${degree.description}</p>`;
    education.appendChild(block)}
  })

  experienceData.forEach((job) => {
    if(job.visible) {    
    const block = document.createElement('div');
    block.className = "resume-item";

    var bullets = ""
    job.bullets.forEach((bullet) => {
      bullets = bullets.concat(`<li>${bullet}</li>`);
    })
    console.log(bullets);

    block.innerHTML = `<h4>${job.name}</h4>
    <h5>${job.date}</h5>
    <p><em>${job.instituition}</em></p>
    <ul>
      ${bullets}
    </ul>`;
    experience.appendChild(block)}
  })
}

function loadPersonalInfo(data) {
  const about = data.about;

  profile.forEach((picture) => {
    picture.src = about.image;
  }) 
  headline.textContent = about.headline;
  birthday.textContent = `${new Date().getFullYear() - 2000}`;
  jobTitle.textContent = about.jobTitle;
  aboutCity.textContent = about.city;
  aboutPhone.textContent = about.phone;
  aboutEmail.textContent = about.email;
  aboutDescription.textContent = about.description;

  city.textContent = about.city;
  email.textContent = about.email;
  phone.textContent = about.phone;
  whatsapp.innerHTML = `<a href="https://api.whatsapp.com/send?phone=%2B${about.whatsapp.number}">${about.whatsapp.label}</a>`;
}

function loadPage() {
    fetchData().then((data) => { 
        loadPersonalInfo(data)
        loadLogos(data);
        loadResume(data);
        loadPortfolio(data)
    })
}
  
loadPage();
console.log(window.innerWidth);