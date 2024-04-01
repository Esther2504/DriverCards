"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let jsonContent = [];
let container = document.querySelector('.card-container');
let modalcontainer = document.querySelector('.modal-container');
let loading = document.querySelector('.loading');
getDrivers();
function getDrivers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://f1-api.vercel.app/api/drivers');
            jsonContent = yield response.json();
            const drivers = jsonContent.sort().map((driver, index) => {
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
            }).join('');
            container.innerHTML = drivers;
        }
        catch (error) {
            console.error('Error fetching data:');
        }
    });
}
let driverData;
let results;
let wins;
let constructors;
function moreInfo(index) {
    loading.style.display = 'block';
    modalcontainer.innerHTML = '';
    modalcontainer.style.display = 'block';
    const driver = jsonContent[index];
    let drivername;
    if (driver['last-name'] == 'Verstappen') {
        drivername = 'max_verstappen';
    }
    else if (driver['last-name'] == 'Magnussen') {
        drivername = 'kevin_magnussen';
    }
    else {
        drivername = driver['last-name'];
    }
    fetch(`http://ergast.com/api/f1/drivers/${drivername}.json`)
        .then(function (response) {
        if (response.status !== 200) {
            console.log(response.status);
            return;
        }
        response.text().then(function (data) {
            driverData = JSON.parse(data).MRData.DriverTable.Drivers[0];
            return fetch(`https://ergast.com/api/f1/drivers/${drivername}/constructors.json`);
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            constructors = data.MRData.ConstructorTable.Constructors;
            return fetch(`https://ergast.com/api/f1/drivers/${drivername}/results/1.json`);
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            wins = data.MRData.total;
            return fetch(`https://ergast.com/api/f1/drivers/${drivername}/results.json?limit=400`);
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            let allResults = data.MRData.RaceTable.Races;
            getResults(drivername, driverData, driver, wins, constructors, allResults);
        });
    })
        .catch(function (err) {
        console.log('Fetch Error', err);
    });
}
function getResults(drivername, driverData, driver, wins, constructors, allResults) {
    fetch(`http://ergast.com/api/f1/2024/drivers/${drivername}/results.json`)
        .then(function (response) {
        if (response.status !== 200) {
            console.log(response.status);
            return;
        }
        response.text().then(function (data) {
            const results2024 = JSON.parse(data).MRData.RaceTable.Races;
            let racesFinished = 0;
            let totalResults = 0;
            let totalStarts = 0;
            let allRacesFinished = 0;
            let allTotalStarts = 0;
            let allTotalResults = 0;
            for (let i = 0; i < results2024.length; i++) {
                if (!isNaN(results2024[i].Results[0].positionText)) {
                    totalResults = totalResults + Number(results2024[i].Results[0].positionText);
                    racesFinished++;
                }
                totalStarts = totalStarts + Number(results2024[i].Results[0].grid);
            }
            for (let i = 0; i < allResults.length; i++) {
                if (!isNaN(allResults[i].Results[0].positionText)) {
                    allTotalResults = allTotalResults + Number(allResults[i].Results[0].positionText);
                    allRacesFinished++;
                }
                allTotalStarts = allTotalStarts + Number(allResults[i].Results[0].grid);
            }
            let averageFinish = totalResults / racesFinished;
            let averageStart = totalStarts / results2024.length;
            let allAverageFinish = allTotalResults / allRacesFinished;
            let allAverageStart = allTotalStarts / allResults.length;
            loading.style.display = 'none';
            modalcontainer.style.display = 'block';
            modalcontainer.innerHTML = `
          <div class="driver-card modal" id="${driver['last-name']}" style="background:${driver['team-color']}">
          <div class="top-container">
          <div class="img-container">
                <img src=${driver.image} alt="${driver.name}" class="driver-img" />
                <img src=${driver['country-flag']} alt="flag" class="flag" />
                <img src=${driver['number-logo']} alt="driver number" class="number" />
                </div>
                <div class="details">
                 <p>${driver.name}</p>
                 <p><span>Birthdate</span>${driverData.dateOfBirth}</p>
                 <p><span>Nationality</span>${driverData.nationality}</p>
                 <p><span>Number</span>${driverData.permanentNumber}</p>
                 <p><span>Team</span> <span>${driver.team}</span></p>
                 <p><span>Current rank</span> <span>${driver.rank}</span></p>
                 <p><span>Points</span> <span>${driver.points}</span></p>
                 </div>
                </div>
                <div class="bottom-container">
                <div class="results">
                <p>2024 Results</p>
                ${results2024.map((race) => {
                return `<p><span>${race.raceName}</span><span>${race.Results[0].positionText}</span></p>`;
            }).join('')}
                </div>
                <div class='right-container'>
                <div class="constructors">
                <p>Teams</p>
                ${constructors.map((constructor) => {
                return `<p>${constructor.name}</p>`;
            }).join('')}
                </div>
                <div class="career-details">
                <p><span>Career wins</span><span>${wins}</span></p>
                <p><span>Average starting position</span><span>${allAverageStart.toFixed(2)}</span></p>
                 <p><span>Average finishing position</span><span>${allAverageFinish.toFixed(2)}</span></p>
                 <p><span>Average 2024 starting position</span><span>${averageStart.toFixed(2)}</span></p>
                 <p><span>Average 2024 finishing position</span><span>${averageFinish.toFixed(2)}</span></p>
                 </div>
                 </div>
                </div>
          </div>
          `;
        });
    })
        .catch(function (err) {
        console.log('Fetch Error', err);
    });
}
function closeModal() {
    modalcontainer.style.display = 'none';
}
