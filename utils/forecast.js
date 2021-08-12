const request = require("postman-request");

const forecast=(lat,long,callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=736d9b15338a655e86f6074dd1d8928d&query='+long+','+lat;
	request({url: url, json: true},(error,response)=>{
		if(error){
			callback('Unable to connect to service!',undefined);
		} else if(response.body.error){
			callback('No such cordinate found!',undefined);
		} else{
			callback(undefined,{
				temperature: response.body.current.temperature,
				feelslike: response.body.current.feelslike
			});
		}
	})
}

module.exports=forecast;