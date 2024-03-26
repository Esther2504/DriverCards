let jsonContent;

getDrivers();

let container = document.getElementsByClassName('card-container')

async function getDrivers() {
  try {
    const response = await fetch('https://f1-api.vercel.app/api/drivers');
    jsonContent = await response.json();

    const drivers = jsonContent.sort().map((driver) => {
      // if (driver.team == 'Ferrari') {
        return `<div class="driver-card" style="background:${driver['team-color']}" onclick="moreInfo('${driver['last-name']}')">
        <div class="img-container">
        <img src=${driver.image} alt="${driver.name}" class="driver-img" />
        <img src=${driver['country-flag']} alt="flag" class="flag" />
        <img src=${driver['number-logo']} alt="driver number" class="number" />
        </div>
        <div class="details">
         <p>${driver.name}</p>
         <p><span>Team</span> <span>${driver.team}</span></p>
         <p><span>Current rank</span> <span>${driver.rank}</span></p>
         <p><span>Points</span> <span>${driver.points}</span></p>
       </div>
  </div>`;
      // }

    }).join('')

    container[0].innerHTML = drivers


  } catch (error) {
    console.error('Error fetching data:');
  }
}



function moreInfo(driver) {
  console.log(driver);
  fetch(`http://ergast.com/api/f1/drivers/${driver}`)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log(response.status);

          return;
        }
        response.text().then(function (data) {
          console.log(data)
          const xmlString = data
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
          const familyNameElement = xmlDoc.getElementsByTagName('FamilyName')[0];
          getResults(driver);

          const familyName = familyNameElement.textContent;
          console.log(data);
          console.log(familyName)
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error', err);
    });
}

function getResults(driver) {
  console.log(driver)
  fetch(`http://ergast.com/api/f1/2024/drivers/${driver}/results?limit=24`)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log(response.status);

          return;
        }
        response.text().then(function (data) {
          const xmlString = data
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
          const familyNameElement = xmlDoc.getElementsByTagName('FamilyName')[0];

          const familyName = familyNameElement.textContent;
          console.log(data);
          console.log(familyName)
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error', err);
    });
}