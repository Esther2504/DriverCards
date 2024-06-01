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
            // const response = await fetch('https://f1-api.vercel.app/api/drivers');
            const response = yield fetch('https://ergast.com/api/f1/2024/driverStandings.json');
            jsonContent = yield response.json();
            const driverImages = {
                "max_verstappen": ["https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png"],
                // {
                //   "id": "max_verstappen",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "leclerc",
                //   "driver": "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/drivers/2023/chalec01.png.transform/2col/image.png",
                //   "flag": ""
                // },
                // {
                //   "id": "norris",
                //   "driver": "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/drivers/2023/lannor01.png.transform/2col/image.png",
                //   "flag": ""
                // },
                // {
                //   "id": "perez",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "sainz",
                //   "driver": "https://cdn.racingnews365.com/Riders/Sainz/_570x570_crop_center-center_none/f1_2024_cs_fer_lg.png?v=1708703934",
                //   "flag": ""
                // },
                // {
                //   "id": "piastri",
                //   "driver": "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/drivers/2023/oscpia01.png.transform/2col/image.png",
                //   "flag": ""
                // },
                // {
                //   "id": "hamilton",
                //   "driver": "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/drivers/2023/lewham01.png.transform/2col/image.png",
                //   "flag": ""
                // },
                // {
                //   "id": "russell",
                //   "driver": "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/drivers/2022/georus01.png.transform/2col/image.png",
                //   "flag": ""
                // },
                // {
                //   "id": "alonso",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "stroll",
                //   "driver": "https://cdn.racingnews365.com/Riders/Stroll/_570x570_crop_center-center_none/f1_2024_ls_ast_lg.png?v=1708704434",
                //   "flag": ""
                // },
                // {
                //   "id": "tsunoda",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "ricciardo",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "bearman",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "ocon",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "gasly",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "hulkenberg",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "kevin_magnussen",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "albon",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "sargeant",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png",
                //   "flag": ""
                // },
                // {
                //   "id": "zhou",
                //   "driver": "https://www.formula1.com/fom-website/2018-redesign-assets/Author/guazho-216.png",
                //   "flag": ""
                // },
                // {
                //   "id": "bottas",
                //   "driver": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png",
                //   "flag": ""
                // },
            };
            let driverStandings = jsonContent.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            console.log(jsonContent.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            // console.log()
            const drivers = driverStandings.sort().map((driver, index) => {
                // let driverid = driver['driverId'];
                return `<div class="driver-card" id="${driver['driverId']}" style="background:#333333" onclick="moreInfo('${index}')">
        <div class="driver-card-inner">
        <div class="img-container">
        <img src=${driverImages["max_verstappen"][0]} alt="${driver.Driver.familyName}" class="driver-img" />
        <img src=${driver['country-flag']} alt="flag" class="flag" />
        <img src=${driver['number-logo']} alt="driver number" class="number" />
        </div>
        <div class="details">
         <p>${driver.Driver.givenName} ${driver.Driver.familyName}</p>
         <p><span>Team</span> <span>${driver.Constructors[0].name}</span></p>
         <p><span>Current rank</span> <span>${driver.position}</span></p>
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
    fetch(`https://ergast.com/api/f1/drivers/${drivername}.json`)
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
    fetch(`https://ergast.com/api/f1/2024/drivers/${drivername}/results.json`)
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
    loading.style.display = 'none';
}
