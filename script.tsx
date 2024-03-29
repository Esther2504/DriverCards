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
let drivername;
  if (test['last-name'] == 'Verstappen') {
    drivername = 'max_verstappen'
  } else if (test['last-name'] == 'Magnussen') {
    drivername = 'kevin_magnussen'
  } else {
    drivername = test['last-name']
  }

  fetch(`http://ergast.com/api/f1/drivers/${drivername}.json`)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log(response.status);

          return;
        }
        response.text().then(function (data) {
          console.log(data)
          // const xmlString = data
          // const parser = new DOMParser();
          // const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
          // const nationality = xmlDoc.getElementsByTagName('Nationality')[0].textContent;
          console.log(JSON.parse(data).MRData.DriverTable.Drivers[0]);

          const driverData = JSON.parse(data).MRData.DriverTable.Drivers[0]
          getResults(drivername, driverData, test);

          // const familyName = familyNameElement.textContent;


         
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error', err);
    });
}

function getResults(driver, driverData, test) {
  console.log(driver)

  fetch(`http://ergast.com/api/f1/2024/drivers/${driver}/results.json`)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log(response.status);

          return;
        }
        response.text().then(function (data) {
          

          console.log(JSON.parse(data));
          const results2024 = JSON.parse(data).MRData.RaceTable.Races

          console.log(results2024)
          console.log(results2024.map((race) => {
            return race.round
          }))

          document.getElementById('modal-container').style.display = 'block';
          document.getElementById('modal-container').innerHTML = `
          <div class="driver-card modal" id="${test['last-name']}" style="background:${test['team-color']}">
          <div class="top-container">
          <div class="img-container">
                <img src=${test.image} alt="${test.name}" class="driver-img" />
                <img src=${test['country-flag']} alt="flag" class="flag" />
                <img src=${test['number-logo']} alt="driver number" class="number" />
                </div>
                <div class="details">
                 <p>${test.name}</p>
                 <p><span>Birthdate</span>${driverData.dateOfBirth}</p>
                 <p><span>Nationality</span>${driverData.nationality}</p>
                 <p><span>Number</span>${driverData.permanentNumber}</p>
                 <p><span>Team</span> <span>${test.team}</span></p>
                 <p><span>Current rank</span> <span>${test.rank}</span></p>
                 <p><span>Points</span> <span>${test.points}</span></p>
                 </div>
                </div>
                <div class="bottom-container">
                <div class="results">
                <p>2024 Results</p>
                ${results2024.map((race) => {
                  return `<p><span>${race.raceName}</span><span>${race.Results[0].positionText}</span></p>`
                }).join('')}
                </div>
                <p>Constructors</p>
                <p>Amount of wins</p>
                 <p>Race finishes</p>
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

function closeModal() {
  document.getElementById('modal-container').style.display = 'none';
}