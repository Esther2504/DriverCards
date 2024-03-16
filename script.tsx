async function getDrivers() {
    try {
        const response = await fetch('https://f1-api.vercel.app/api/drivers'); 
        const jsonContent = await response.json();
        console.log(jsonContent);
    
        return jsonContent; 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}