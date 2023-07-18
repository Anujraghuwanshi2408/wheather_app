const apiKey = "f72e8e8c2282be441339d51687885099";
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const wheather = document.querySelector(".wheather");
let newData = [];
 
async function cheakWheather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    newData = data;
    console.log(newData);
    if (newData.cod == 404) {
      alert("Please enter a valid city");
    }
    updateWeatherElement(); // Call the updateWeatherElement function
  } catch (error) {
    console.error(error);
  }
}
 
function updateWeatherElement() {
  wheather.innerHTML = `
    <img src="images/${newData.weather[0].main.toLowerCase()}.png" class="wheather-icon">
    <h1 class="temp">${Math.round(newData.main.temp)}°C</h1>
    <h2 class="city">${newData.name}</h2>
    <div class="details">
        <div class="col">
            <img src="images/humidity.png" alt="">
            <div>
                <p class="humidity">${newData.main.humidity}%</p>
                <p>Humidity</p>
            </div>
        </div>
        <div class="col">
            <img src="images/wind.png" alt="">
            <div>
                <p class="wind">${newData.wind.speed} Km/h</p>
                <p>Wind Speed</p>
            </div>
        </div>
    </div>
  `;
}
 
searchBtn.addEventListener("click", () => {
  if (searchInput.value == "") {
    alert("Please enter city name");
  } else {
    cheakWheather(searchInput.value.trim());
  }
});
 