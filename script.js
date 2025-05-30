const apiKey = "0cca6b799522fca8232c4a4cf75fd0c0"; 

const form = document.getElementById("weatherForm");
const input = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

form.addEventListener("submit", function (e) {
  e.preventDefault(); 
  const city = input.value.trim(); 
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const { name, sys, main, weather, wind } = data;
      const iconCode = weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      result.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}" />
        <p><strong>🌡️ Temperature:</strong> ${main.temp}°C</p>
        <p><strong>🌤️ Condition:</strong> ${weather[0].description}</p>
        <p><strong>💧 Humidity:</strong> ${main.humidity}%</p>
        <p><strong>💨 Wind Speed:</strong> ${wind.speed} m/s</p>
      `;
    })
    .catch((error) => {
      result.innerHTML = `<p>⚠️ ${error.message}. Please try again.</p>`;
    });
});
