const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ3VyamVldGRoaWxsb24zMyIsImEiOiJjbDVma214a2sxYzR0M2lvMmw0bmo1OTlnIn0.knhZOP0zELycHWvBJ4cIxA&limit=1"
    request({ url: geocodeURL, json: true }, (error, {body}) => {
        if (error) {
            callback("unable to connect to mapboxgeocodeURL", undefined);
        }

        else if (body.features.length === 0) {
            callback("unable to find location. Try Another Search", undefined);
        }

        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
};

module.exports = geocode ;



// Geocoding
// adress => lat/long -> weather

// const mapBoxurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ3VyamVldGRoaWxsb24zMyIsImEiOiJjbDVma214a2sxYzR0M2lvMmw0bmo1OTlnIn0.knhZOP0zELycHWvBJ4cIxA";
// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/chandigarh.json?access_token=pk.eyJ1IjoiZ3VyamVldGRoaWxsb24zMyIsImEiOiJjbDVma214a2sxYzR0M2lvMmw0bmo1OTlnIn0.knhZOP0zELycHWvBJ4cIxA&limit=1"
// request({url: geocodeURL,json: true},(error, response) =>{
//     if(error) {
//         console.log("unable to connect to mapboxgeocodeURL");
//     }
//     else if(response.body.features.length === 0){
//         console.log("unable to find location . please provide another address");
//     }
//     else{
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//     console.log(latitude,longitude);
//     };
// });