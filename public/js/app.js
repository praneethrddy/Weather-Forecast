// prakash
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const message4 = document.querySelector('#message-4')
const message5 = document.querySelector('#message-5')
const message6 = document.querySelector('#message-6')
const message7 = document.querySelector('#message-7')
const message8 = document.querySelector('#message-8')
const getLocation = document.getElementById('getlocation');

message1.textContent = ''

var mapid;

 weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading....'
    message2.textContent = 'Loading....'
    message3.textContent = 'Loading....'
    message4.textContent = 'Loading....'
    message5.textContent = 'Loading....'
    message6.textContent = 'Loading....'
    message7.textContent = 'Loading....'
    message8.textContent = 'Loading....'
    const location = search.value
    fetch('/weather?address=' + location ).then((response) => {
        // console.log(response.json)
     response.json().then((data) => {
         if(data.error){
             messageOne.textContent = data.error
         }
         else {
            document.querySelector('#mapid').remove();
            document.querySelector('.map-container').innerHTML="<div id='mapid'></div>";
            message1.textContent = data.location
            message2.textContent = data.forecast[0]
            message3.textContent = data.forecast[1]
            message4.textContent = data.forecast[2]
            message5.textContent = data.forecast[3]
            message6.textContent = data.forecast[4]
            message7.textContent = data.forecast[5]
            message8.textContent = data.forecast[6]
            var lat = data.lat;
            var lon = data.lon;
            console.log(lat, lon)
            mapid = L.map('mapid').setView([lat, lon], 15);
            const marker = L.marker([lat,lon]).addTo(mapid);
            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(mapid);
            marker.setLatLng([lat,lon])
            // marker.clearLayers();
         }
         search.value = ''
     })
    })
 })

getLocation.addEventListener('click', (evt) => {
    message1.textContent = 'Loading....'
    message2.textContent = 'Loading....'
    message3.textContent = 'Loading....'
    message4.textContent = 'Loading....'
    message5.textContent = 'Loading....'
    message6.textContent = 'Loading....'
    message7.textContent = 'Loading....'
    message8.textContent = 'Loading....'
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            fetch('/currentlocation?latitude=' +latitude + '&longitude=' + longitude ).then((response) => {
                response.json().then((data) => {
                    if(data.error){
                        messageOne.textContent = data.error
                    }
                    else {
                        document.querySelector('#mapid').remove();
                        document.querySelector('.map-container').innerHTML="<div id='mapid'></div>";
                        message1.textContent = data.location
                        message2.textContent = data.forecast[0]
                        message3.textContent = data.forecast[1]
                        message4.textContent = data.forecast[2]
                        message5.textContent = data.forecast[3]
                        message6.textContent = data.forecast[4]
                        message7.textContent = data.forecast[5]
                        message8.textContent = data.forecast[6]
                        var lat = data.lat;
                        var lon = data.lon;
                        
                        mapid = L.map('mapid').setView([lat, lon], 15);
                        const marker = L.marker([lat,lon]).addTo(mapid);
                        const attribution =
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
                        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                        const tiles = L.tileLayer(tileUrl, { attribution });
                        tiles.addTo(mapid);
                        marker = L.setLatLng([lat, lon]);
                        //marker.clearLayers();
                    }
                })
            }).catch((error) => {
                console.log(error)
            })
        },(error) => {
            console.log(error.code);
        });
    }
    else {
        console.log("Not Supported");
    }
})

