const request = require('request')
require('dotenv').config()

const API_KEY = process.env.WEATHER_API_KEY
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + API_KEY + '/' + latitude + ',' + longitude + '?units=si'

    request( { url, json : true }, (error, response) => {
        //console.log(response)
        if(error) {
            callback('unable to connect to weather server!')
        }
        else if(response.body.error) {
            callback('unable to fetch weather information.')
        }
        else {
            callback(undefined,
                    [
                        response.body.daily.data[0].summary 
                        +' Minimum Temperature '+ response.body.daily.data[0].temperatureLow +
                        ' degrees Celsius. ' + 'Maximum Temperature ' + response.body.daily.data[0].temperatureHigh 
                        + ' degrees Celsius. There is a ' + response.body.daily.data[0].precipProbability + '% chances of rain',
                        response.body.daily.data[1].summary 
                        +' Minimum Temperature '+ response.body.daily.data[1].temperatureLow +
                        ' degrees Celsius. ' + 'Maximum Temperature ' + response.body.daily.data[1].temperatureHigh 
                        + ' degrees Celsius. There is a ' + response.body.daily.data[1].precipProbability + '% chances of rain',
                        response.body.daily.data[2].summary 
                        +' Minimum Temperature '+ response.body.daily.data[2].temperatureLow +
                        ' degrees Celsius. ' + 'Maximum Temperature ' + response.body.daily.data[2].temperatureHigh 
                        + ' degrees Celsius. There is a ' + response.body.daily.data[2].precipProbability + '% chances of rain',
                        response.body.daily.data[3].summary 
                        +' Minimum Temperature '+ response.body.daily.data[3].temperatureLow +
                        ' degrees Celsius. ' + 'Maximum Temperature ' + response.body.daily.data[3].temperatureHigh 
                        + ' degrees Celsius. There is a ' + response.body.daily.data[3].precipProbability + '% chances of rain',
                        response.body.daily.data[4].summary 
                        +' Minimum Temperature '+ response.body.daily.data[4].temperatureLow +
                        ' degrees Celsius. ' + 'Maximum Temperature ' + response.body.daily.data[4].temperatureHigh 
                        + ' degrees Celsius. There is a ' + response.body.daily.data[4].precipProbability + '% chances of rain',
                        response.body.daily.data[5].summary 
                        +' Minimum Temperature '+ response.body.daily.data[5].temperatureLow +
                        ' degrees Celsius. ' + 'Maximum Temperature ' + response.body.daily.data[5].temperatureHigh 
                        + ' degrees Celsius. There is a ' + response.body.daily.data[5].precipProbability + '% chances of rain',
                        response.body.daily.data[6].summary 
                        +' Minimum Temperature '+ response.body.daily.data[6].temperatureLow +
                        ' degrees Celsius. ' + 'Maximum Temperature ' + response.body.daily.data[6].temperatureHigh 
                        + ' degrees Celsius. There is a ' + response.body.daily.data[6].precipProbability + '% chances of rain'
                    ]
                )
            }
    })
}


module.exports = forecast