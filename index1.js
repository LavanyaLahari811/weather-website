const API_KEY = `cc6843cf4fc35eee6908dda580b0ad61`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const advise = document.querySelector("#advise");

const getWeather = async (city) => {
  weather.innerHTML = `<h2> Loading... <h2>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
};

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `<h2> City Not Found <h2>`;
    return;
  } 
  else {
    if (parseInt(data.main.temp) < 25) {
      if (parseInt(data.wind.speed > 15)) {
        if (parseInt(data.main.humidity > 70)) {
          advise.innerHTML = `<h2><b><i>Weather is too cool,windy and likely to rain. Advised not to travel until its too important and do carry a raincoat,thermals <\i></b></h2>`;
        } else {
          advise.innerHTML = `<h2><b><i>Weather is too cool and windy. Advised to wear thermals and avoid going densely vegetated regions <\i></b></h2>`;
        }
      } else {
        if (parseInt(data.main.humidity > 70)) {
          advise.innerHTML = `<h2><b><i>Weather is too cool and likely to rain. Advised to carry umbrella,rain-coats and apply a moisturizer<\i></b></h2>`;
        } else {
          advise.innerHTML = `<h2><b><i>Weather is too cool . Wear clothes properly according to the coldness and enjoy the weather <\i></b></h2>`;
        }
      }
    } else if (25 < parseInt(data.main.temp) < 36.7) {
      if (parseInt(data.wind.speed > 15)) {
        if (parseInt(data.main.humidity > 70)) {
          advise.innerHTML = `<h2><b><i>Temperature is comfortable but weather is windy and likely to rain. Advised not to travel until windspeed decreases<\i></b></h2>`;
        } else {
          advise.innerHTML = `<h2><b><i>Temperature is comfortable but weather is windy . Advised not to travel until windspeed decreases <\i></b></h2>`;
        }
      } else {
        if (parseInt(data.main.humidity > 70)) {
          advise.innerHTML = `<h2><b><i>Temperature is too good to go outside but carry an umbrella to avoid unwanted breaks<\i></b></h2>`;
        } else {
          advise.innerHTML = `<h2><b><i>perfect time to experience ${search.value} <\i></b></h2>`;
        }
      }
    } else if (parseInt(data.main.temp) > 36.7) {
      if (parseInt(data.wind.speed > 15)) {
        if (parseInt(data.main.humidity > 70)) {
          advise.innerHTML = `<h2><b><i>Temperature is too high and  weather is windy. It is harmful to skin better carry sunscreen<\i></b></h2>`;
        } else {
          advise.innerHTML = `<h2><b><i>Temperature is too high and weather is windy. It is harmful to skin better carry sunscreen <\i></b></h2>`;
        }
      } else {
        if (parseInt(data.main.humidity > 70)) {
          advise.innerHTML = `<h2><b><i><\i>Weather is highly uncomfortable and sticky. Try to remain hydrated</b></h2>`;
        } else {
          advise.innerHTML = `<h2><b><i>perfect time to experience ${search.value}. Try to remain hydrated and carry umbrella,sunglasses <\i></b></h2>`;
        }
      }
    }
  }

  weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>welcome to...........${search.value}</h2>
            <h2>Temperature-${data.main.temp} ℃</h2>
            <h3> but feels like-${data.main.feels_like}&#176c</h3>
            <h3>humidity-${data.main.humidity}%</h3>
            <h3>maximum temperature of the day-${data.main.temp_max}℃</h3>
            <h3>wind speed-${data.wind.speed}Km/h</h3>
            
        </div>
    `;
  if (search.value != " ") {
    search.value = null;
  }
};

form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});
