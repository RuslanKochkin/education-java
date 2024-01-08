import React, { useState, useEffect } from 'react';

const WeatherComponent = ({ location }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const weather = await getWeather(location);
                setWeatherData(weather);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (location) {
            fetchWeatherData();
        }
    }, [location]);

    const getWeather = async ({ latitude, longitude }) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_hours,wind_gusts_10m_max&timezone=Europe%2FLondon`
            );

            if (!response.ok) {
                throw new Error(`Weather API request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Weather Data:', data);

            return {
                location: `${latitude}, ${longitude}`,
                dailyForecasts: data.daily.time.map((date, index) => ({
                    date,
                    weatherCode: data.daily.weather_code[index],
                    maxTemperature: data.daily.temperature_2m_max[index],
                    minTemperature: data.daily.temperature_2m_min[index],
                    windGustsMax: data.daily.wind_gusts_10m_max[index],
                    precipitationHours: data.daily.precipitation_hours[index],
                })),
            };
        } catch (error) {
            console.error('Error while getting weather:', error);
            throw new Error('Error while getting weather');
        }
    };

    const getWeatherImage = (weatherCode) => {
        switch (weatherCode) {
            case 0:
            case 1:
                return require('../../asset/WeatherIcon/0,1.jpg');
            case 2:
                return require('../../asset/WeatherIcon/2.jpg');
            case 3:
                return require('../../asset/WeatherIcon/3.jpg');
            case 51: case 53: case 55: case 56: case 57: case 61: case 63:
            case 65: case 66: case 67: case 80: case 81: case 82:
                return require('../../asset/WeatherIcon/51-82.jpg');
            case 71: case 73: case 75:
            case 77: case 85: case 86:
                return require('../../asset/WeatherIcon/71-86.jpg');
            case 95: case 96: case 99:
                return require('../../asset/WeatherIcon/95-99.jpg');
            default:
                return require('../../asset/WeatherIcon/0,1.jpg');
        }
    };


    return (
        <div className="weather-content">
            <h4>WEATHER FOR<br/>
                THE NEXT 7 DAYS: </h4>
            {weatherData ? (
                <div >
                    {weatherData.dailyForecasts.map((forecast, index) => (
                        <div className="weather-items" key={index}>
                            <div className="weather-data">
                                <h3>{forecast.date}</h3>
                                <img src={getWeatherImage(forecast.weatherCode)} alt={`Weather`} />
                            </div>
                            <div className="weather-temp">
                                <p>(t: {forecast.minTemperature}°C</p>
                                <p>- {forecast.maxTemperature}°C </p>
                                <p>) (</p>
                                <p> w-max:{forecast.windGustsMax} km/h)</p>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default WeatherComponent;



