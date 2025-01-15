import axios from 'axios'

const weather_api = import.meta.env.VITE_WEATHER_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const baseWeatherUrl = `http://api.weatherstack.com/current?access_key=${weather_api}&query=`
console.log(baseWeatherUrl)

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`) 
    return request.then(res => res.data)
}

const getWeather = (country) => {
    const request = axios.get(`${baseWeatherUrl}/${country}`)
    console.log(request)
    return request.then(res => res.data)
}

export default { getAll, getWeather }