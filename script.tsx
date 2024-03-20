let jsonContent;

getDrivers();

let container = document.getElementsByClassName('card-container')

console.log(container)

async function getDrivers() {
    try {
        const response = await fetch('https://f1-api.vercel.app/api/drivers');
        jsonContent = await response.json();
        console.log(jsonContent);

        
        const drivers = jsonContent.map((driver) => {
            return `<div class="driver-card" style="background:${driver['team-color']}">
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
        }).join('')
container[0].innerHTML = drivers

        return jsonContent;
    } catch (error) {
        console.error('Error fetching data:');
    }
}

