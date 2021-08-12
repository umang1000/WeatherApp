 const express=require("express")
 const path=require('path')
 const hbs=require('hbs')
 const geocode=require('./utils/geocode.js')
 const forecast=require('./utils/forecast.js')


 const app=express();

 app.set('view engine', 'hbs');

 const partialspath=path.join(__dirname,'/views/partials');

 hbs.registerPartials(partialspath);

 app.get('/', (req, res)=>{
 	res.render('index',{
 		title: "Weather App",
 		name: "Umang Tiwari"
 	});

 })

 app.get('/about', (req, res)=>{
 	res.render('about',{
 		title:"ABOUT",
 		name: "Umang Tiwari"
 	});
 })

 app.get('/help', (req, res)=>{
 	res.render('help',{
 		title:"HELP",
 		name: "Umang Tiwari"
 	});
 })

app.get('/weather', (req, res)=>{
	if(!req.query.address)
		return res.send({error: "no address provided!"})
	geocode(req.query.address, (err,{latitude, longitude, location}={})=>{
		if(!err)
			forecast(latitude, longitude, (error, {temperature, feelslike})=>{
				if(!error)
					return res.send({latitude, longitude, location, temperature, feelslike})
				return res.send(error)
			})
		else{
			return res.send(err)
		}
	})
})
     

 app.get('*',(req, res)=>{
 	res.render('404',{
 		title:"ERROR",
 		name: "Umang Tiwari"
 	});
 })

 app.listen(3000, ()=>{
     console.log("yoo my server has started!");
});

