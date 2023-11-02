const id = new URLSearchParams(window.location.search).get('id')
console.log(id)
const nameText = document.querySelector('#name');
const skills = document.querySelector('#skills');
const description = document.querySelector('#description');
const type = document.querySelector('#type');
const detail = document.querySelector('#contentDetail');
const category = document.querySelector('#category');
const dateLabel = document.querySelector('#dateLabel');
const dateValue = document.querySelector('#dateValue');
const images = document.querySelector('#images')

fetch('assets/data/projectDetails.json')
  .then(response => response.json())
  .then(data => {
    updatePage(data)
  })
  .catch(error => {
    console.error(error); // handle errors
  });

  function updatePage(data) {
    const project = data.projects[id]
    nameText.textContent = project.name
    description.textContent = project.description

    project.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill
        skills.appendChild(li)
    });

    type.textContent = project.type
    category.textContent = project.category
    dateLabel.textContent = project.date.title
    dateValue.textContent = project.date.value

  rawImageHtml = ""
  project.images.forEach(image => {
    rawImageHtml+= `<div class="swiper-slide">
    <img src="${image}" alt="">
  </div>
`
  })
images.innerHTML = rawImageHtml

if (project.access !== null) {
  download = document.createElement('li')
  download.innerHTML = `<strong>${project.access.label} on <a href="${project.access.url}">${project.access.sourceName}</a></strong>`
  detail.appendChild(download)
}

source = document.createElement('li')
if (project.sourceCode !== null) {
  source.innerHTML = `<li><strong>Souce code on <a href="${project.sourceCode.url}" target="_blank">${project.sourceCode.hostName}</a></strong></li>`
} else {
  source.innerHTML = `  <li><strong>Souce code and playable prototipes not avaliable due to copyright protection.</strong></li>`
}
detail.appendChild(source)
rawIconHtml = ""
project.logos.forEach(logo => {
    rawIconHtml += `<div>
    <span class="iconify" data-icon="${logo.icon}"></span>
    <p>${logo.label}</p>
  </div>`
})
icons = document.createElement('li')
icons.className = 'display-3'
icons.innerHTML = rawIconHtml
detail.appendChild(icons)
}
  