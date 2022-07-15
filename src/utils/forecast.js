const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=12f3a26e03a99006d7fe1b83a43657eb&query=" + longitude + "," + latitude + "&units=m";
    request({ url: weatherURL, json: true }, (error, {body}) => {
        if (error) {
            callback("unable to get weatherstack Api", undefined);
        }
        else if (body.error) {
            callback("unable to find location please provide another location", undefined);
        }
        else {
            callback( undefined , body.current.weather_descriptions[0] +" . and the temperature is " + body.current.temperature + "°" + " . and feels like " + body.current.feelslike + "°" + " . The humidity is " + body.current.humidity + "% ." );
                // {
            //     data :{
            //         location: body.location,
            //          weather: body.current,
            // }}
            // );
}
      })
};

module.exports = forecast;


// const url = "http://api.weatherstack.com/current?access_key=12f3a26e03a99006d7fe1b83a43657eb&query=37.8267,-122.4233&units=f";

// request({url: url,json: true},(error, response) =>{
//     if(error){
//         console.log("unable to connect to weatherstack api");
//     }
//     else if(response.body.error){
//            console.log("unable to find location");
//     }
//     else{
//    console.log(response.body.current);
//     }
// });