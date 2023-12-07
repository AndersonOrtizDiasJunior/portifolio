const skills = document.querySelector("#skillsContainer");
const projectsPortfolio = document.querySelector("#projectsContainer");
const containerPortfolio = document.querySelector("#portfolio");
var games = null;
var mobile = null;
const gamesBtn = document.querySelector('#gameFilter');
const mobileBtn = document.querySelector('#appFilter');
const allBtn = document.querySelector('#allFilter');

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

function filter(filter) {
  switch(filter) {
    case 'game':
      console.log(games);
      if (projectsPortfolio.contains(mobile)) {
        projectsPortfolio.removeChild(mobile);
      }
      allBtn.className = "";
      mobileBtn.className = "";
      gamesBtn.className = "filter-active";
      projectsPortfolio.appendChild(games);
      break;
    case 'app':
      if (projectsPortfolio.contains(games)) {
        projectsPortfolio.removeChild(games);
      }
      allBtn.className = "";
      gamesBtn.className = "";
      mobileBtn.className = "filter-active";
      projectsPortfolio.appendChild(mobile);
        break;
    case 'all':
      if (projectsPortfolio.contains(mobile)) {
        projectsPortfolio.removeChild(mobile);
      }
      if (projectsPortfolio.contains(games)) {
        projectsPortfolio.removeChild(games);
      }
      mobileBtn.className = "";
      gamesBtn.className = "";
      allBtn.className = "filter-active";
      projectsPortfolio.appendChild(games);
      projectsPortfolio.appendChild(mobile);
        break;
    default:
      break;
  }

  portfolio.style.height = "100%";
}

function loadLogos(data) {
        const logos = data.technologies.find((logosFile) => logosFile.id == "index").logos;
        const logoRows = splitArray(logos, Math.ceil(logos.length / 6));

        logoRows.forEach((logoRow) => {
            row = document.createElement("div");
            row.className = "row";

            logoRow.forEach((logo) => {
                column = document.createElement("div");
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

function loadPortfolio(data) {
    const projects = data.projects
    games = document.createElement('div');
    games.setAttribute("class", "row portfolio-container");
    games.setAttribute("data-aos", "fade-up");
    games.setAttribute("data-aos-delay", "100");

    mobile = document.createElement('div');
    mobile.setAttribute("class", "row portfolio-container");
    mobile.setAttribute("data-aos", "fade-up");
    mobile.setAttribute("data-aos-delay", "100");

    projects.forEach((project) => {
      if (project.portfolio) {        
        var portfolioProject = document.createElement('div');
        portfolioProject.className = `col-lg-4 col-md-6 portfolio-item`;
        portfolioProject.innerHTML = `<div class="portfolio-wrap">
        <img src="${project.thumb}" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a href="details-page.html?id=${project.id}" class="align-middle">${project.name}</a>
        </div>
      </div>`;

      switch(project.filter) {
        case 'game':
          games.appendChild(portfolioProject);
          break;
        case 'app':
          mobile.appendChild(portfolioProject);
            break;
        default:
          break;
      }
    }
    })
    filter("game");
}
 
function loadContact(data) {
  contact = data.contact;

  city.textContent = contact.location;
  email.textContent = contact.email;
  phone.textContent = contact.call;
  whatsapp.innerHTML = `<a href="https://api.whatsapp.com/send?phone=%2B${contact.whatsapp.number}">${contact.whatsapp.label}</a>`;
}

function loadResume(data) {
  educationData = data.resume.education
  experienceData = data.resume.experience

  educationData.forEach((degree) => {
    if(degree.visible) {    
    block = document.createElement('div');
    block.className = "resume-item";
    block.innerHTML = `<h4>${degree.name}</h4>
    <h5>${degree.date}</h5>
    <p><em>${degree.instituition}</em></p>
    <p>${degree.description}</p>`;
    education.appendChild(block)}
  })

  experienceData.forEach((job) => {
    if(job.visible) {    
    block = document.createElement('div');
    block.className = "resume-item";

    bullets = ""
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

function loadAbout(data) {
  about = data.about;

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
}

function loadPage() {
    fetchData().then((data) => { 
        loadAbout(data)
        loadLogos(data);
        loadResume(data);
        loadPortfolio(data);
        loadContact(data);
    })
}
  
loadPage();
console.log(window.innerWidth);