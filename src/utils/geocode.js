const request = require('request');


//From mapbox.com => Send location name and get the latitude and logitude (GE0C0DE REQUEST)
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWFkYXJzaGEiLCJhIjoiY2p3OTBmMTQ4MDJucjRhdGd2ZndqNnBpOCJ9.u1cz19Ug4fkze5cnQFi_Aw&limit=1' ; //encodeURIComponent helps to halde the special character in address

    request({url : url, json : true}, (error, response) => {

        if(error) { 
            callback('Unable to connect to weather service. Check internet service.', undefined)

        }   else if(response.body.features.length === 0) {
            callback('The given location is invalid. Try another search', undefined)

        }   else {
           
            callback(undefined, {
              location : response.body.features[0].place_name,
              latitude : response.body.features[0].center[1],
              longitude : response.body.features[0].center[0]
            } )
        }
    })
} 



module.exports = geoCode

