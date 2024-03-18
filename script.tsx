let jsonContent;

getDrivers();

let container = document.getElementsByClassName('card-container')

console.log(container)

async function getDrivers() {
    try {
        const response = await fetch('https://f1-api.vercel.app/api/drivers');
        jsonContent = await response.json();
        console.log(jsonContent);

        
        const drivers = jsonContent.map((driver, i) => {
            return `<div class="driver-card" style="background:${driver['team-color']}" key=${i}>
            <div>
            <img src=${driver.image} alt="${driver.name}" class="driver-img" />
            <img src=${driver['country-flag']} alt="flag" class="flag" />
            <img src=${driver['number-logo']} alt="driver number" class="number" />
            </div>
            <div class="details">
             <p>${driver.name}</p>
             <p>${driver.team}</p>
             <p>Current rank: ${driver.rank}</p>
             <p>Points: ${driver.points}</p>
           </div>
      </div>`;
        })
container[0].innerHTML = drivers

        return jsonContent;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

