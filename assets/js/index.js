const skills = document.querySelector("#skillsContainer");

function splitArray(arr, x) {
    const subarrays = [];
    const elementsPerSubarray = Math.ceil(arr.length / x);
  
    for (let i = 0; i < arr.length; i += elementsPerSubarray) {
      const subarray = arr.slice(i, i + elementsPerSubarray);
      subarrays.push(subarray);
    }
  
    return subarrays;
}

async function fetchLogos() {
    const response = await fetch('assets/data/db.json');
    return await response.json();
}

function loadLogos() {
    fetchLogos().then((logosData) => {
        const logos = logosData.technologies.find((logosFile) => logosFile.id == "index").logos;
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
    })
}
  
  
loadLogos();