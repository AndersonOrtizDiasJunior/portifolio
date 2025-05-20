import {getLocalStorage} from "./utils.js"
const projectsPortfolio = document.querySelector("#projectsContainer");
const loading = document.querySelector("#portfolio-loading");
const containerPortfolio = document.querySelector("#portfolio");
var projectDiv = null;
const gamesBtn = document.querySelector('#gameFilter');
const mobileBtn = document.querySelector('#appFilter');
const allBtn = document.querySelector('#allFilter');

const allFilter = document.getElementById('allFilter');
const gameFilter = document.getElementById('gameFilter');
const appFilter = document.getElementById('appFilter');


  function isItemVisited(id) {
    const visitedItems = getLocalStorage("visitedItems");
    return visitedItems != null && visitedItems.includes(id);
  }
  
  function getPortfolioClass(id) {
    if (isItemVisited(id)) {
        return "visited";
    } else {
        return "unVisited";
    }
  }

  async function fetchProjects(stack) {
    const response = await fetch(`https://andersonportfolio.onrender.com/projects/filter/${stack}`);
    return await response.json();
}

  export function loadPortfolio(stack) {
    loading.style.display = 'none';
    fetchProjects(stack).then((projects) => {
    projectDiv = document.createElement('div');
    projectDiv.setAttribute("class", "row portfolio-container");
    projectDiv.setAttribute("data-aos", "fade-up");
    projectDiv.setAttribute("data-aos-delay", "100");

    projects.forEach((project) => {
      if (project.portfolio) {        
        var portfolioProject = document.createElement('div');
        portfolioProject.className = `col-lg-4 col-md-6 portfolio-item ${getPortfolioClass(project.id)}`;
        portfolioProject.innerHTML = `<div class="portfolio-wrap">
        <img src="${project.thumb}" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a href="details-page.html?id=${project._id}" class="align-middle">${project.name}</a>
        </div>
      </div>`;

      projectDiv.appendChild(portfolioProject);
      projectsPortfolio.appendChild(projectDiv)
    }
    })
  })
}