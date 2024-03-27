let jsonContent;

getDrivers();

let container = document.getElementsByClassName('card-container')

async function getDrivers() {
  try {
    const response = await fetch('https://f1-api.vercel.app/api/drivers');
    jsonContent = await response.json();

    const drivers = jsonContent.sort().map((driver, index) => {
      console.log(driver)
      // if (driver.team == 'Ferrari') {
        return `<div class="driver-card" id="${driver['last-name']}" style="background:${driver['team-color']}" onclick="moreInfo('${index}')">
        <div class="driver-card-inner">
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
       </div>
  </div>`;
      // }

    }).join('')

    container[0].innerHTML = drivers

  } catch (error) {
    console.error('Error fetching data:');
  }
}



function moreInfo(index) {
  const test = jsonContent[index]
  console.log(test)
  fetch(`http://ergast.com/api/f1/drivers/${test['last-name']}`)
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
          getResults(test['last-name']);

          const familyName = familyNameElement.textContent;
          console.log(data);
          console.log(familyName)

          document.getElementById('modal-container').style.display = 'block';
          document.getElementById('modal-container').innerHTML = `
          <div class="driver-card modal" id="${test['last-name']}" style="background:${test['team-color']}">
                <div class="img-container">
                <img src=${test.image} alt="${test.name}" class="driver-img" />
                <img src=${test['country-flag']} alt="flag" class="flag" />
                <img src=${test['number-logo']} alt="driver number" class="number" />
                <div class="details">
                 <p>${test.name}</p>
                 <p><span>Team</span> <span>${test.team}</span></p>
                 <p><span>Current rank</span> <span>${test.rank}</span></p>
                 <p><span>Points</span> <span>${test.points}</span></p>
                 </div>
                </div>
                
          </div>
          `
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