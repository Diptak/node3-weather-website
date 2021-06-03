const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=6e421c576ff362ca0ca5d1f4408e9ec7&query=37.8267,-122.4233&units=f'
// request({url: url,json:true}, (error, response)=>{
//     if(error){
//         console.log('Sorry unable to reach the weather app')
//     }else if(response.body.error){
//         console.log('Unable to find location') 
//     }else{
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
//     // console.log(response.body.current)
//     console.log(response.body.current.weather_descriptions[0]+'. The temperature is '+response.body.current.temperature+' but it feels like '+ response.body.current.feelslike+' degrees out')
//     }
// })

const forecast = (lat,lon, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6e421c576ff362ca0ca5d1f4408e9ec7&query='+lon+','+lat
   // used object destructuring
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect please check', undefined)
        } else if (body.error) {
            callback('Please give proper coordinates', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'. The temperature is '+body.current.temperature+' but it feels like '+ body.current.feelslike+' farrenhite out'+ ' of '+body.location.region )    
        }
    })  
}

module.exports = forecast