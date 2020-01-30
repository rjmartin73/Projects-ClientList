const fs = require('fs');
const json_data = require('../assets/data.json');

fs.readFile(json_data, 'utf8', function(err, data) {
	try {
		data = JSON.parse(data);
		for (let i in data) {
			console.log('Customer: ', data[i].CustomerName);
		}
	} catch (e) {
		console.log(e);
	}
});

// fetch('./data.json')
//     .then((response) => {
//         return JSON.parse(response);
//     })
// .then((myJson) =>{
//     console.log(myJson.stringify);
// })
