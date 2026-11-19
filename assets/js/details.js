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
  const response = await fetch(`assets/data/technologies.json`);
  const technologies = await response.json();
  return technologies.find((tech) => tech.project === projectId);
}

async function fetchProject() {
  const response = await fetch(`assets/data/projects.json`);
  const projects = await response.json();
  return projects.find((project) => project._id === id);
}

async function fetchPersonal() {
  const response = await fetch(`assets/data/about.json`);
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
    ${slideContent(image)}
  </div>
`
  })
images.innerHTML = rawImageHtml
setupSlider()

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
 
// Builds a slide from an entry in "images": YouTube link, video file, or image
function slideContent(src) {
  const youtube = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (youtube) {
    return `<div class="video-slide">
      <iframe src="https://www.youtube.com/embed/${youtube[1]}?enablejsapi=1&rel=0" title="Project video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>`;
  }
  if (/\.(mp4|webm|ogg)$/i.test(src)) {
    return `<video src="${src}" controls playsinline preload="metadata"></video>`;
  }
  return `<img src="${src}" alt="">`;
}

// Refreshes the carousel with the new slides and stops autoplay on video slides
function setupSlider() {
  const swiper = document.querySelector('.portfolio-details-slider')?.swiper;
  if (!swiper) return;

  swiper.loopDestroy();
  swiper.loopCreate();
  swiper.update();
  swiper.slideToLoop(0, 0);

  const updateAutoplay = () => {
    document.querySelectorAll('#images video').forEach(video => video.pause());
    document.querySelectorAll('#images iframe').forEach(frame =>
      frame.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'));

    const active = swiper.slides[swiper.activeIndex];
    if (active && active.querySelector('iframe, video')) {
      swiper.autoplay.stop();
    } else if (!swiper.autoplay.running) {
      swiper.autoplay.start();
    }
  };
  swiper.on('slideChange', updateAutoplay);
  updateAutoplay();
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