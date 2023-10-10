const id = new URLSearchParams(window.location.search).get('id')
console.log(id)
const nameText = document.querySelector('#name');

fetch('projects.json')
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
  }
  