export const fetchLocation = (city = "Delhi") => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=4413aab0913e55db292b677f70a7b522`
  ).then((res) => res.json());
};

export const fetchWeather = (lati, long) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=4413aab0913e55db292b677f70a7b522`
  ).then((res) => res.json());
};

export const fetchCity = (lati, long) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lati}&lon=${long}&appid=4413aab0913e55db292b677f70a7b522`
  ).then((res) => res.json());
};
