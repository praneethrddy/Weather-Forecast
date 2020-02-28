const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const reverseGeocode = require('./utils/reverse-geocode.js')
const currentLocation = require('./utils/current-location.js')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'index.html')

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    
    res.sendFile(viewsPath)
})

app.get('/currentlocation', (req, res) => {
   
    reverseGeocode(req.query.latitude, req.query.longitude, (error, {latitude, longitude, location}) => {
        if(error) {
            return res.send(__dirname, '404.html')
        }
       
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(__dirname, '404.html')
            }
            res.send({
                forecast: forecastData,
                lat : latitude,
                lon : longitude,
                location
            })
        })
    })
    
})

// app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address...'
        })
    }
    // console.log('weather route')
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({ error })
        }
        // console.log(latitude,longitude,location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                lat: latitude,
                lon: longitude
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Page not found'
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is up on port '+ port)
})
