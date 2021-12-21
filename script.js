const Amadeus = require("amadeus");
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3500;
const fs = require("fs");

const amadeus = new Amadeus({
	clientId: process.env.API_KEY,
	clientSecret: process.env.API_SECRET
});

var server = app.listen(PORT, function () {
	console.log(`Server running on Port ${PORT}`);
});

app.get('/', function (req, res){
	res.send('Server is working');
});

app.get('/search', async(req, res) => {
	try {
		let alphabet = 'abcdefghijklmnopqrstuvwxyz';
		let final = []
		for (var i = 0; i < 26; i++){
			const { query } = req;
			const { data } = await amadeus.referenceData.locations.get({
			keyword: alphabet[i],
			subType: Amadeus.location.airport,
			countryCode: 'US',
			view: 'LIGHT',
			});
			for (var j = 0; j < data.length; j++){
				var temp = []
				temp.push(data[j].address.cityName);
				temp.push(data[j].name);
				temp.push(data[j].iataCode);
				console.log(temp);
				final.push(temp)
			}
		}
		res.json(final);
		fs.writeFileSync('./output.json', JSON.stringify(final), 'utf-8');
	} catch (err) {
		console.error(err.res);
		res.json([]);
	}
});