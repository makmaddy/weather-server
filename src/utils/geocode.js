const request=require('request')
const chalk = require("chalk");

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFrbWFuaXNoIiwiYSI6ImNrbHJvZ2Y1ODA3eWIyd3AzeXczc2lqYngifQ.o3R4Vs6xw3HC7OBefB5NBw&limit=1'
        request({url:url,json:true},(error,{body})=>{
            if(error){
                callback('Unable to connect to location services',undefined)
            }else if(body.features.length==0){
                callback('Unable to Find Location...Search Again with deifferent search term')
    
            }else{
                callback(undefined,{
                    latitude:body.features[0].center[0],
                    longitude:body.features[0].center[1],
                    location:body.features[0].place_name
                })
            }
        })
    }


    module.exports=geocode