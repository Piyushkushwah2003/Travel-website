const inputBox=document.querySelector('.input-box');
const searchBtn=document.getElementById('searchBtn');
const weather_img=document.getElementById('weather-img');
const temperature=document.getElementById('temperature');
const description=document.getElementById('description');
const Humidity=document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found=document.querySelector('.location-not-found');
const weather_body=document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key="42f6ac8d813651b6276b168de129a4bf";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data=await fetch(`${url}`).then(response => response.json());
 
    
if(weather_data.cod===`404`){
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
}
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    Humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="cloud.png";
            break;
            case 'Clear':
                weather_img.src="clear.png";
                break;
                case 'Rain':
            weather_img.src="rain.png";
            break;
            case 'Snow':
            weather_img.src="snow.png";
            break;
            case 'Mist':
            weather_img.src="mist.png";
            break;    

    }
    console.log(weather_data);
}
// Function to show the loader
function showLoader() {
    document.querySelector('.loader').style.display = 'block';
}

// Function to hide the loader
function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
}

// Example function to simulate loading
function simulateLoading() {
    location_not_found.style.display = "none";
    weather_body.style.display = "none";
    showLoader(); // Show loader

    // Simulate loading process (e.g., fetching data)
    setTimeout(() => {
        // Simulate completion of loading after 2 seconds
        hideLoader(); // Hide loader after loading is done
    }, 1000); // Adjust time as needed
}

searchBtn.addEventListener('click', ()=>{
    simulateLoading();
    checkWeather(inputBox.value);
});