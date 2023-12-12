import {getLocalStorage} from "./utils.js"
const projectsPortfolio = document.querySelector("#projectsContainer");
const containerPortfolio = document.querySelector("#portfolio");
var games = null;
var mobile = null;
const gamesBtn = document.querySelector('#gameFilter');
const mobileBtn = document.querySelector('#appFilter');
const allBtn = document.querySelector('#allFilter');

const allFilter = document.getElementById('allFilter');
const gameFilter = document.getElementById('gameFilter');
const appFilter = document.getElementById('appFilter');


allFilter.addEventListener('click', function() {
  filter('all');
});

gameFilter.addEventListener('click', function() {
  filter('game');
});

appFilter.addEventListener('click', function() {
  filter('app');
});


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

  export function loadPortfolio(data) {
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
        portfolioProject.className = `col-lg-4 col-md-6 portfolio-item ${getPortfolioClass(project.id)}`;
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