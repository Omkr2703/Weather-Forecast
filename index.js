

async function getWeather() {
      let city = document.getElementById("city").value.trim();
      let tempDiv = document.getElementById("temp");
      let cityNameDiv = document.getElementById("cityName");
      let humidityDiv = document.getElementById("humidity");
      let windDiv = document.getElementById("wind");
      let cropList = document.getElementById("cropList");

      if(city === ""){
        cityNameDiv.innerHTML = "⚠️ Enter a city";
        return;
      }

      try {
        // Step 1: Get latitude and longitude of city
        let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        let geoRes = await fetch(geoUrl);
        let geoData = await geoRes.json();

        if(!geoData.results || geoData.results.length === 0){
          cityNameDiv.innerHTML = "❌ City not found";
          return;
        }

        let lat = geoData.results[0].latitude;
        let lon = geoData.results[0].longitude;

        // Step 2: Get weather data
        let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
        let weatherRes = await fetch(weatherUrl);
        let weatherData = await weatherRes.json();

        let temp = weatherData.current.temperature_2m;
        let humidity = weatherData.current.relative_humidity_2m;
        let wind = weatherData.current.wind_speed_10m;

        // Step 3: Update UI
        tempDiv.innerHTML = `${temp}°C`;
        cityNameDiv.innerHTML = city;
        humidityDiv.innerHTML = `${humidity}%`;
        windDiv.innerHTML = `${wind} km/h`;
       


      } catch (error) {
        cityNameDiv.innerHTML = "⚠️ Error fetching data";
      }
    }