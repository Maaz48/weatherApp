import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import clouds from '../images/cloudy.png'
import atmosphere from '../images/atmosphere.png'
import clear from '../images/clear.png'
import drizzle from '../images/drizzle.png'
import rain from '../images/rain.png'
import snow from '../images/snow.png'
import thunderStorm from '../images/thunderStorm.png'
import clearnight from '../images/clearnight.png'
import { Spinner } from 'react-bootstrap'

function Carda() {
    
    const [loading, setloading] = useState(false)
    const [state, setstate] = useState(0)
    let loadEvent = setTimeout(() => {
        setstate(state + 1)
        console.log("STATTE CHAL RHA HA", state);
    })

    if (state == 1) {
        clearInterval(loadEvent)
    }

    useEffect(() => {

        return async () => {

            // console.log("use Effect chal gya ha");
            console.log("useEffect tu chal rha ha upper");
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, geterror);

                } else {
                    // x.innerHTML = "Geolocation is not supported by this browser.";
                    console.log("browser not supported");
                }
            }

            await getLocation()
            function showPosition(position) {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                console.log("latitude", latitude);
                console.log("longitude", longitude);
                let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=99cfaa14a2134486a0b2cdf09191ed9d`
                axios.get(url).then((res) => {
                    console.log("location ka response ha", res.data);
                    let apiData = res.data.results[0].components.state;
                    axios(`https://api.openweathermap.org/data/2.5/weather?q=${apiData}&units=metric&appid=e7395e784bc211d751b222a03c47aaaf`)
                        .then((res) => {
                            // console.log(res.data);
                            console.log("use effect chal gya");
                            loadsetWeather(res.data.weather)
                            loadsetsys(res.data.sys)
                            loadsetcity(res.data)
                            loadsettemp(res.data.main)
                            loadsetspeed(res.data.wind)
                            setloading(true)
                        }).catch((e) => {
                            alert("error")
                        })

                })
            }
            function geterror(error) {
                axios(`https://api.openweathermap.org/data/2.5/weather?q=karachi&units=metric&appid=e7395e784bc211d751b222a03c47aaaf`)
                    .then((res) => {
                        // console.log(res.data);
                        console.log("use effect chal gya");
                        loadsetWeather(res.data.weather)
                        loadsetsys(res.data.sys)
                        loadsetcity(res.data)
                        loadsettemp(res.data.main)
                        loadsetspeed(res.data.wind)
                        setloading(true)
                    }).catch((e) => {
                        alert("error")
                    })
            }
            // console.log("useEffect tu chal rha ha upper");

            // console.log("useEffect tu chal rha ha upper");
        }

    }, [state])


    /////////////////// get data from location api //////////////////////
    const [loadWeather, loadsetWeather] = useState([])
    const [loadsys, loadsetsys] = useState([])
    const [loadcityName, loadsetcity] = useState([])
    const [loadtemp, loadsettemp] = useState([])
    const [loadspeed, loadsetspeed] = useState([])

    var loadweatherDescription = loadWeather.map((data) => {
        let loadapidata = data.main
        console.log("chal gya ha", loadapidata);
        return loadapidata
    })





    ////////////////////// DAY AND NIGHT CONDITION /////////////////
    let waqt = new Date()
    let hours = waqt.getHours()
    console.log("ghanta btao", hours);
    // let amOrPm = hours < 13 ? "AM" : "PM"
    // console.log("AM HA YA PM HA JALDI BTA", amOrPm);

    var loadweatherDescriptionicon = loadWeather.map((data) => {
        let apidata = data.id
        let apidataicon = data.icon
        if (apidata > 199 && apidata < 233) {
            return thunderStorm
        }
        else if (apidata > 299 && apidata < 322) {
            return drizzle
        }
        else if (apidata > 499 && apidata < 532) {
            return rain
        }
        else if (apidata > 599 && apidata < 623) {
            return snow
        }
        else if (apidata > 700 && apidata < 782) {
            return atmosphere
        }
        else if (apidata == 800) {
            let url = `http://openweathermap.org/img/wn/${apidataicon}@2x.png`
            return url
        }

        else if (apidata > 800 && apidata < 805) {
            return clouds
        } else {
            console.log("icon nahi aa rha tu koi baat nahi kch or kaam kar la...");
        }
    })
    // var loadurl = `http://openweathermap.org/img/wn/${loadweatherDescriptionicon}@2x.png`







    // console.log("ghanta bta bhai ",AMOrPM);


    ////////////////// input field data from weather api ///////////////////
    const [city, setCity] = useState("");

    //////////////////// print data from weatehr api ///////////////////
    const [weather, setweather] = useState([])
    const [sys, setsys] = useState([])
    const [cityName, setcity] = useState([])
    const [temp, settemp] = useState([])
    const [speed, setspeed] = useState([])

    const inputvalue = (event) => {
        setCity(event.target.value);
    };


    const getInputData = () => {
        console.log(city);
        if (city !== "") {
            // callWheatherAPI(city);
            axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e7395e784bc211d751b222a03c47aaaf`)
                .then((res) => {
                    console.log(res.data);
                    settemp(res.data.main)
                    setcity(res.data)
                    setspeed(res.data.wind)
                    setsys(res.data.sys)
                    setweather(res.data.weather)
                }).catch((e) => {
                    alert("PLEASE ENTER CORRECT CITY NAME")
                });
        }
    };


    ////// weather description //////
    var weatherDescription = weather.map((data) => {
        let apidata = data.main
        return apidata
    })

    //////// weather icon /////////
    var weatherDescriptionicon = weather.map((data) => {
        let apidata = data.id
        let apidataicon = data.icon
        if (apidata > 199 && apidata < 233) {
            return thunderStorm
        }
        else if (apidata > 299 && apidata < 322) {
            return drizzle
        }
        else if (apidata > 499 && apidata < 532) {
            return rain
        }
        else if (apidata > 599 && apidata < 623) {
            return snow
        }
        else if (apidata > 700 && apidata < 782) {
            return atmosphere
        }
        else if (apidata == 800) {
            let url = `http://openweathermap.org/img/wn/${apidataicon}@2x.png`
            return url
        }
        else if (apidata > 800 && apidata < 805) {
            return clouds
        } else {
            console.log("icon nahi aa rha tu koi baat nahi kch or kaam kar la...");
        }

    })






    // var url = `http://openweathermap.org/img/wn/${weatherDescriptionicon}@2x.png`

    return (

        <div>
            <div className="mainContainer">
                {/* <div className="loader"> */}

                {/* {loading ? console.log("loader chal rha ha") : <Spinner className="loadera" animation="grow" variant="info" />} */}
                {/* </div> */}
                {/* /////////////// new UI /////////////////////// */}



                <div className="mainCard">
                    <div className="searchDiv">
                        <input onChange={inputvalue} type="text" placeholder="Enter Your City Name" />
                        <button className="button" onClick={getInputData}> Search</button>
                    </div>
                    {loading ? <>
                        <div className="mainWeatherContent">
                            <div className="title">
                                <h5><i className="fas fa-map-marker-alt"></i> <span>{cityName.length == "" ? loadcityName.name : cityName.name}</span><span>{sys.length == "" ? loadsys.country : sys.country}</span></h5>
                            </div>
                            <div className="img">
                                <img src={weather.length == "" ? loadweatherDescriptionicon : weatherDescriptionicon} alt="" />
                                <p className="weatherConditio">{city.length == "" ? loadweatherDescription : weatherDescription}</p>
                            </div>

                            <div className="temprature">
                                <h2 className="tempratureNumber">{temp.length == "" ? Math.round(loadtemp.temp) : Math.round(temp.temp)} <span> <sup className="supValue">°C</sup> </span></h2>
                                <div className="windHumidity">
                                    <p className="wind"><i className="fas fa-wind"></i> {speed.length == "" ? Math.round((loadspeed.speed) * 3.6) : Math.round((speed.speed) * 3.6)} km/h</p>
                                    <p className="humidity"><i className="fas fa-tint"></i> {temp.length == "" ? loadtemp.humidity : temp.humidity} %</p>
                                </div>
                            </div>
                            <div className="nextDaysWeather">

                            </div>

                        </div></>
                        : <Spinner className="loadera" animation="grow" variant="info" />}
                </div>

            </div>


            {/* /////////////// end new UI /////////////////////// */}


        </div>
    )
}

export default Carda;
