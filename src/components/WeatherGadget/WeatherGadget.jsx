import { useEffect, useState } from "react";
import {
  fetchCity,
  fetchLocation,
  fetchWeather,
} from "../../services/fetchWeather";
import styles from "./WeatherGadget.module.css";

const WeatherGadget = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState();
  const [condition, setCondition] = useState();
  const [temp, setTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [wind, setWind] = useState();
  const [humidity, setHumidity] = useState();
  const [icon, setIcon] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getIcons = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const wD = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let curr = new Date();
    let day = curr.getDate();
    let weekDay = curr.getDay();
    let month = curr.getMonth();
    let year = curr.getFullYear();
    return `${months[month]} ${day}, ${year} | (${wD[weekDay]})`;
  };

  const getTime = () => {
    let curr = new Date();
    let hours = curr.getHours();
    let minutes = curr.getMinutes();
    let seconds = curr.getSeconds();
    return `${hours} : ${minutes} : ${seconds}`;
  };

  const settingParameters = (details) => {
    setCondition(details.weather[0].main);
    setTemp(details.main.temp);
    setMinTemp(details.main.temp_min);
    setMaxTemp(details.main.temp_max);
    setWind(details.wind.speed);
    setHumidity(details.main.humidity);
    setIcon(getIcons(details.weather[0].icon));
    setDate(getDate());
    setInterval(() => {
      setTime(getTime());
    }, 1000);
    // console.log(details);
  };

  const errorHandler = () => {
    setCityName("City Not found");
    setCondition("N/A");
    setTemp("N/A");
    setMinTemp("N/A");
    setMaxTemp("N/A");
    setWind("N/A");
    setHumidity("N/A");
    setIcon("N/A");
  };

  const locationSuccess = (location) => {
    setIsLoading(true);
    // console.log("Success");
    fetchCity(location.coords.latitude, location.coords.longitude).then((c) => {
      setCityName(c[0].name);
      fetchWeather(location.coords.latitude, location.coords.longitude).then(
        (details) => {
          settingParameters(details);
          setIsLoading(false);
        }
      );
    });
    getForecast(location.coords.latitude, location.coords.longitude).then(
      (cast) => console.log(cast)
    );
  };

  const locationFailed = () => {
    setIsLoading(true);
    // console.log("Failed");
    fetchLocation().then((data) => {
      setCityName(data[0].name);
      fetchWeather(data[0].lat, data[0].lon).then((details) => {
        settingParameters(details);
        setIsLoading(false);
      });
    });
  };

  const getLocation = () => {
    // console.log(navigator.geolocation);
    // console.log(navigator.permissions);
    // console.log(navigator.permissions.query({ name: "geolocation" }));
    // navigator.permissions.query({ name: "geolocation" }).then((res) => {
    //   if (res.state === "granted") {
    //     console.log("gggg");
    //   } else if (res.state === "prompt") {
    //     console.log("pppp");
    //   } else if (res.state === "denied") {
    //     console.log("dddd");
    //   }
    //   console.log(res);
    // });
    ////////////////////////////////////////////////////////////
    // if (!navigator.geolocation) {
    //   fetchLocation().then((data) => {
    //     setCityName(data[0].name);
    //     fetchWeather(data[0].lat, data[0].lon).then((details) => {
    //       settingParameters(details);
    //     });
    //   });
    // } else {
    // setIsLoading(true);
    // navigator.geolocation.getCurrentPosition((location) => {
    //   fetchCity(location.coords.latitude, location.coords.longitude).then(
    //     (c) => {
    //       setCityName(c[0].name);
    //       fetchWeather(
    //         location.coords.latitude,
    //         location.coords.longitude
    //       ).then((details) => {
    //         settingParameters(details);
    //         setIsLoading(false);
    //       });
    //     }
    //   );
    // }),
    // () => {
    //   fetchLocation().then((data) => {
    //     setCityName(data[0].name);
    //     fetchWeather(data[0].lat, data[0].lon).then((details) => {
    //       settingParameters(details);
    //     });
    //   });
    // };
    // }
  };

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFailed);
    // getLocation();
    // setIsLoading(true);
    // fetchLocation().then((data) => {
    //   setCityName(data[0].name);
    //   fetchWeather(data[0].lat, data[0].lon).then((details) => {
    //     settingParameters(details);
    //     setIsLoading(false);
    //   });
    // });
  }, []);

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const clickhandler = () => {
    setIsLoading(true);
    fetchLocation(city)
      .then((data) => {
        setCityName(data[0].name);
        fetchWeather(data[0].lat, data[0].lon).then((details) => {
          settingParameters(details);
          setIsLoading(false);
        });
      })
      .catch(() => {
        errorHandler();
        setIsLoading(false);
      });
    setCity("");
  };

  const ipKeyHandler = (e) => {
    if (e.key === "Enter") {
      clickhandler();
    }
  };

  const bgImages = () => {
    const srcObj = {
      Clear: "/Sunny.jpg",
      Rain: "/Rain.jpg",
      Haze: "/Haze.jpg",
      Drizzle: "/Drizzle.jpg",
      Fog: "/Fog.jpg",
      Mist: "/Mist.jpg",
      Thunder: "/Thunder.jpg",
      Snow: "/Snow.jpg",
      Dust: "/Dust.jpg",
      Clouds: "/Cloud.jpg",
      Smoke: "/Smoke.jpg",
    };
    for (const key in srcObj) {
      if (key === condition) {
        return srcObj[key];
      }
    }
  };
  return (
    <>
      <div className={styles.bgImg}>
        <img src={bgImages()} alt="" />
      </div>
      <div className={styles.completebox}>
        <div className={styles.dnt}>
          <div className={styles.date}>{date}</div>
          <div className={styles.time}>{time}</div>
        </div>
        <div className={styles.topbox}>
          <input
            className={styles.searchbar}
            type="text"
            placeholder="Enter the name of your city..."
            value={city}
            onChange={changeHandler}
            onKeyUp={ipKeyHandler}
          />
          <button className={styles.btn} onClick={clickhandler}>
            Search
          </button>
        </div>
        {isLoading && <img src="/1488.gif" alt="" />}
        {!isLoading && (
          <div>
            <h3 className={styles.city}>{cityName}</h3>
            <h3 className={styles.temp}>{temp} °C</h3>
            <div className={styles.conditionbox}>
              <img src={icon} alt="image" className={styles.image} />
              <h3 className={styles.condition}>{condition}</h3>
            </div>
          </div>
        )}
        <div className={styles.miscdata}>
          {isLoading && (
            <p>
              Min. Temp :{" "}
              <img src="/1488.gif" alt="" width="30px" height="30px" /> °C
            </p>
          )}
          {!isLoading && <p>Min. Temp : {minTemp} °C</p>}
          {isLoading && (
            <p>
              Max. Temp :{" "}
              <img src="/1488.gif" alt="" width="30px" height="30px" /> °C
            </p>
          )}
          {!isLoading && <p>Max. Temp : {maxTemp} °C</p>}
          {isLoading && (
            <p>
              Wind : <img src="/1488.gif" alt="" width="30px" height="30px" />{" "}
              kmph
            </p>
          )}
          {!isLoading && <p>Wind : {wind} kmph</p>}
          {isLoading && (
            <p>
              Humidity Level :{" "}
              <img src="/1488.gif" alt="" width="30px" height="30px" /> %
            </p>
          )}
          {!isLoading && <p>Humidity Level : {humidity} %</p>}
        </div>
      </div>
    </>
  );
};
export default WeatherGadget;
