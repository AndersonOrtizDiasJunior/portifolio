const name = new URLSearchParams(window.location.search).get('name')
url = 

async function fetch(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
        displayWindchill()
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }