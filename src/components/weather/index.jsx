
import React, { useState, useEffect } from 'react';
import Search from '/Users/manav/Library/CloudStorage/OneDrive-thapar.edu/Codes/weather/weather/src/components/search/index.jsx'; // Assuming 'search' is the folder name

export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(city) {
        setLoading(true);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96784137e9b200855c0f578733fc842e
            `);
            const data = await response.json();

            if (data.cod === 200) { // Check for successful response
                setWeatherData(data);
            } else {
                console.error("City not found or API error:", data);
            }
        } catch (e) {
            console.error('Error fetching weather data:', e);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-US'); 
    }

    useEffect(() => {
        fetchWeatherData('bangalore');
    }, []);

    return (
        <div>
            <Search search={search} setSearch={setSearch} onSearch={handleSearch} /> 
            {/* Pass onSearch prop for button or form submission */}

            {loading ? (
                <div className='loading'>Loading...</div>
            ) : weatherData ? ( 
                <div className='App'>
                    <div className="city-name">
                        <h2>{weatherData.name}, <span>{weatherData.sys.country}</span></h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className='temp'>{weatherData.main.temp}</div> 
                    <p className='description'>
                        {weatherData.weather[0].description} 
                    </p>

                    <div className='weather-info'>
                        <div className='column'>
                            <p className='wind'>{weatherData.wind.speed}</p>
                            <p>Wind speed</p>
                        </div>

                        <div className='humidity'>
                            <p className='humidity'>{weatherData.main.humidity}</p> {/* Corrected typo */}
                            <p>Humidity</p> {/* Fixed missing label */}
                        </div>
                    </div>
                </div>
            ) : (
                <div>City not found</div> //
            )}
        </div>
    );
}