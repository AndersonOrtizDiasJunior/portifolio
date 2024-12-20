import {getLocalStorage, setLocalStorage} from "./utils.js";

const id = new URLSearchParams(window.location.search).get('id')
const nameText = document.querySelector('#name');
const subtitleText = document.querySelector('#subtitle');
const skills = document.querySelector('#skills');
const description = document.querySelector('#description');
const type = document.querySelector('#type');
const detail = document.querySelector('#contentDetail');
const category = document.querySelector('#category');
const dateLabel = document.querySelector('#dateLabel');
const dateValue = document.querySelector('#dateValue');
const images = document.querySelector('#images')
const profile = document.querySelector('#profile')


async function fetchLogos(projectId) {
  const response = await fetch(`https://andersonportfolio.onrender.com/technologies/${projectId}`);
  return await response.json();
}

async function fetchProject() {
  const response = await fetch(`https://andersonportfolio.onrender.com/projects/${id}`);
  return await response.json();
}

async function fetchPersonal() {
  const response = await fetch(`https://andersonportfolio.onrender.com/about`);
  let abouts = await response.json()
  return abouts[0];
}

  function loadData() {
    fetchProject().then((details) => {
      setVisitedProject(details.id)
      updateDetails(details)

      fetchLogos(details.id).then((logos) => {
        updateLogos(logos.logos)
      })
    })

    fetchPersonal().then((about) => {
      profile.src = about.image;
    })
  }

  function setVisitedProject(id) {
    var visitedItems = getLocalStorage("visitedItems");
    if (visitedItems == null) {
      visitedItems = [];
    }
    visitedItems.push(id);
    setLocalStorage("visitedItems", visitedItems);
  }
  function updateDetails(project) {
    nameText.textContent = project.name;
    subtitleText.textContent = project.subtitle;
    description.textContent = project.description;

    project.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill
        skills.appendChild(li)
    });

    type.textContent = project.type
    category.textContent = project.category
    dateLabel.textContent = project.date.title
    dateValue.textContent = project.date.value

  var rawImageHtml = ""
  project.images.forEach(image => {
    rawImageHtml+= `<div class="swiper-slide">
    <img src="${image}" alt="">
  </div>
`
  })
images.innerHTML = rawImageHtml

if (project.access !== null) {
  const download = document.createElement('li')
  download.innerHTML = `<strong>${project.access.label} on <a href="${project.access.url}">${project.access.sourceName}</a></strong>`
  detail.appendChild(download)
}

const source = document.createElement('li')
if (project.sourceCode !== null) {
  source.innerHTML = `<li><strong>Souce code on <a href="${project.sourceCode.url}" target="_blank">${project.sourceCode.hostName}</a></strong></li>`
} else {
  source.innerHTML = `  <li><strong>Souce code not avaliable.</strong></li>`
}
detail.appendChild(source)
}
 
function updateLogos(logos) {
  var rawIconHtml = ""
  logos.forEach(logo => {
      rawIconHtml += `<div>
      <span class="iconify" data-icon="${logo.icon}"></span>
      <p>${logo.label}</p>
    </div>`
  })
  const icons = document.createElement('li')
  icons.className = 'display-3'
  icons.innerHTML = rawIconHtml
  detail.appendChild(icons)
}

loadData()