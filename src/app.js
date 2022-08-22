const express = require('express');
const hbs = require('hbs');
const path= require("path")
const weatherdata = require("../utils/weatherData")
const app= express();
const publicStaticDirPath = path.join (__dirname,"../public") 
const partialsPath= path.join(__dirname,"../templates/partials")
const viewsPath= path.join(__dirname, "../templates/views")
const port = process.env.PORT/* this will give a port when its hosted*/|| 3000;

app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)
app.use(express.static(publicStaticDirPath))
app.get("", (req,res)=>{
   // res.send("Hii this is a weather app");
   res.render('index',{
       title: 'Weather App'
   })
})
app.get("/weather", (req,res)=>{
   // res.send("This is weather end point")
   const address = req.query.address
   if(!address)
   {
       res.send({
           error: "You must enter address in search text box."
       })
   }
   weatherdata(address, (error,{temperature,description,cityname}/*this step is done to manage invalid input to get error msg */={})=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }   
        console.log(temperature,description,cityname);
        res.send({
            temperature,description,cityname
        })
        
    //console.log(result)
   })
})
app.get("*", (req,res)=>{
    //res.send( "This page is not fond.")
    res.render("404",{
        title: "Page not Found!"
    })
})
app.listen(port,  ()=>{
    console.log("Server is running on the port : ", port);
})