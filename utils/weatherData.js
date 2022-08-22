const request = require("request");
 const constants = require("../config")
 const weatherdata= (address,callback)=>{
     const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherMap.SECRET_KEY 
     console.log(url);
     request({url,json:true}, (error,{body})=>{
         console.log(body);
         if(error)
         {
             callback("can't fetch data from open weather api",undefined)
         }
         else if(!body.main || !body.main.temp || !body.weather || !body.name)
         {
              callback("unable to find required data, try another loaction", undefined);   
         }
         else
         {
             callback(undefined, 
                {
                    temperature: body.main.temp,
                    description: body.weather[0].description,
                    cityname: body.name
                })
         }

     })
     //callback(true);

 }
module.exports= weatherdata;