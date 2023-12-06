const skills = document.querySelector("#skillsContainer");
const portfolio = document.querySelector("#projectsConatiner");
const city = document.querySelector("#location");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const whatsapp = document.querySelector("#whatsapp");
const map = document.querySelector("#map");

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

    projects.forEach((project) => {
      if (project.portfolio) {        
        var portfolioProject = document.createElement('div');
        portfolioProject.className = `col-lg-4 col-md-6 portfolio-item filter-${project.filter}`;
        portfolioProject.innerHTML = `<div class="portfolio-wrap">
        <img src="${project.thumb}" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a href="details-page.html?id=${project.id}" class="align-middle">${project.name}</a>
        </div>
      </div>`;

      portfolio.appendChild(portfolioProject);
    }
    })
}
 
function loadContact(data) {
  contact = data.contact;

  city.textContent = contact.location;
  email.textContent = contact.email;
  phone.textContent = contact.call;
  map.src = contact.map;
  whatsapp.innerHTML = `<a href="https://api.whatsapp.com/send?phone=%2B${contact.whatsapp.number}">${contact.whatsapp.label}</a>`;
}


function loadPage() {
    fetchData().then((data) => { 
        loadLogos(data);
        loadPortfolio(data);
        loadContact(data);
    })
}
  
loadPage();