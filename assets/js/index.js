const skills = document.querySelector("#skillsContainer");
const projects = document.querySelector("#projectsConatiner");

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
    const portfolio = data.portfolio

    portfolio.forEach((project) => {
        var portfolioProject = document.createElement('div');
        portfolioProject.className = `col-lg-4 col-md-6 portfolio-item filter-${project.filter}`;
        portfolioProject.innerHTML = `<div class="portfolio-wrap">
        <img src="${project.image}" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a href="details-page.html?id=${project.id}" class="align-middle">${project.name}</a>
        </div>
      </div>`;

      projects.appendChild(portfolioProject);
    })
}
  
function loadPage() {
    fetchData().then((data) => { 
        loadLogos(data);
        loadPortfolio(data);
    })
}
  
loadPage();