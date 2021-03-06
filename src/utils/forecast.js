const request=require('request')
const chalk = require("chalk");

const forecast=(query,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=10a141f7c68c127e0cbd5dcec13cc21e&query='+encodeURIComponent(query)+'&units=m'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find the Location',undefined)
        }else{
            callback(undefined,{
                weatherDescription:body.current.weather_descriptions[0],
                Temperature:body.current.temperature,
                feelsLike:body.current.feelslike
            })
        }
    })
}




module.exports=forecast