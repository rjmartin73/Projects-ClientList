//const { write, writeFile } = require("fs");

//const { response } = require("express");

const formLoad = () => {
	const searchBtn = document.getElementById('submit');
	const searchForm = document.getElementsByTagName('form');
	const searchBox = document.getElementById('searchbox');
	const listUpdatedDate = '6/16/2021';
	const today = new Date();
	const weekday = today.getDay();

	let dataStr = '';
	let colorArr = [
		{ color: 'dark' },
		{ color: 'primary' },
		{ color: 'secondary' },
		{ color: 'information' },
		{ color: 'warning' },
		{ color: 'success' },
		{ color: 'danger' }
	];

	const todaysColor = colorArr[weekday].color;


	const uri = 'https://ipapi.co/json/'

	// new Request(uri)
	// new Request(uri, options)
	// options -  - method, headers, body, mode
	// methods: GET, POST, PUT, DELETE,  OPTIONS

	// new Headers()
	// headers.append(name, value)
	// Content-Type, Content-Length, Accept, Accept-Language,
	// X-Request-With, User-Agent


var myObj;

let h = new Headers();
	h.append('Accept', 'application/json')

	let req = new Request(uri, {
		method: 'GET',
		headers: h,
		mode: 'cors'
	});

 function getData() {
		fetch(req)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Bad Request');
			}
		})
		.then((jsonData) => {
			console.log(jsonData)
			jsonData => myObj = jsonData;
		})
		.catch((err) => {
			console.error(`ERROR: ${err.message}`)
		})
	}

	//let myObj =  getData();

	console.log(myObj);

	document.querySelector('#date-updated').innerHTML =
		'Client list as of <strong>' + listUpdatedDate.toString() + '</strong>';

	searchBtn.addEventListener('click', (event) => {
		event.preventDefault();
		performSearch(event);
	});

	// changes this to a input fired event
	searchBox.addEventListener('input', function (event) {
		searchBox.onchange = performSearch(event);
	});

	searchBox.addEventListener('keydown', (event) => {
		//event.preventDefault();
		if (event.keyCode === 13) {
			performSearch(event);
		}
	});

	searchForm.onsubmit = (event) => {
		event.preventDefault();
		performSearch(event);
	};
};

performSearch = (event, select, term) => {
	//event.preventDefault();
	let records = document.getElementsByTagName('th');
	let recordCount = records.length;
	let searchBox = document.getElementById('searchbox');
	let recordArray = [];
	let noRecordsElement = document.createElement('tr');
	let noRecordsElement_Child = document.createElement('td');
	let recordCountElement = document.getElementById('recordcount');
	noRecordsElement.appendChild(noRecordsElement_Child);
	noRecordsElement_Child.innerHTML = 'No records found.';
	noRecordsElement.setAttribute('id', 'norecords');

	if (document.getElementById('norecords') != null) {
		document.getElementById('norecords').setAttribute('hidden', 'hidden');
	}
	let idVal;

	for (i = 0; i < recordCount; i++) {
		idVal = records[i].parentElement.getAttribute('key');
		records[i].parentElement.setAttribute('id', '_row_' + idVal);
		recordArray.push([
			i,
			records[i].innerHTML.toLowerCase(),
			records[i].parentElement.children[1].innerHTML.toLowerCase(),
			records[i].parentElement.children[2].innerHTML.toLowerCase(),
			records[i].parentElement.children[3].innerHTML.toLowerCase(),
			records[i].parentElement.children[5].innerHTML.toLowerCase()
		]);
	}
	for (i = 0; i < 6; i++) {
		recordArray.shift();
	}

	// console.log(select);
	// console.log(term);
	let searchTerm;

	if (select == '' || select == undefined) {
		searchTerm = searchBox.value.toLowerCase();
	} else {
		searchTerm = term.toLowerCase();
		console.log('search term: ' + searchTerm);
	}

	let filteredRecordArray = [];

	recordArray.find(function (record, index) {
		//console.log(element);
		if (
			record[1].indexOf(searchTerm) >= 0 ||
			record[2].indexOf(searchTerm) >= 0 ||
			record[3].indexOf(searchTerm) >= 0 ||
			record[4].indexOf(searchTerm) >= 0 ||
			record[5].indexOf(searchTerm) >= 0
		) {
			filteredRecordArray.push({ record });
		}
	});

	for (i = 6; i < recordCount; i++) {
		records[i].parentElement.setAttribute('hidden', 'hidden');
	}

	if (filteredRecordArray.length == 0) {
		if (document.getElementById('norecords') != null) {
			document.getElementById('norecords').removeAttribute('hidden');
			document.getElementById('recordcount').setAttribute('hidden', 'hidden');
		} else {
			records[0].parentElement.parentElement.appendChild(noRecordsElement);
		}
	}
	filteredRecordArray.forEach(function (element) {
		let rownum = element.record[0];
		records[rownum].parentElement.removeAttribute('hidden');

		//console.log(records[rownum].parentElement.children);
		recordCountElement.innerHTML = 'Built and maintained by Ryan Martin<br/>Records: ' + filteredRecordArray.length;
		recordCountElement.removeAttribute('hidden');
	});

	if (event.which === 13 || event.characterCode === 13 || event.key === 'Enter') {
		event.preventDefault();
		return false;
	}
};

function includeHTML() {
	let z, i, elmnt, file, xhttp;
	let client_array = new Array();
	const container = document.querySelector('.container');

	//Build the table and header row
	const table = document.createElement('table');
	const header_row = document.createElement('thead');
	const customer_name_header = document.createElement('th');
	const customerid_header = document.createElement('th');
	const sql_server_header = document.createElement('th');
	const sql_database_header = document.createElement('th');
	const url_header = document.createElement('th');
	const version_header = document.createElement('th');
	const tbody = document.createElement('tbody');
	let clientCount;

	const today = new Date();
	const weekday = today.getDay();

	const rand = getRandomInt(0, 8);

	let dataStr = '';
	let colorArr = [
		{ color: 'dark' },
		{ color: 'primary' },
		{ color: 'secondary' },
		{ color: 'warning' },
		{ color: 'info' },
		{ color: 'success' },
		{ color: 'danger' },
		{ color: 'light' }
	];

	const todaysColor = colorArr[rand].color;

	document.querySelector('#alertBar').setAttribute('class', `alert alert-${todaysColor} alert-dismissible fade show`);
	switch (rand) {
		case 3:
			document.querySelector('#navBar').setAttribute('class', `navbar navbar-light  bg-${todaysColor}`);
			document.querySelector('#submit').setAttribute('class', `btn btn-outline-dark my-2 my-sm-0`);
			document.querySelector('#recordcount').setAttribute('class', `my-2 my-sm-0 text-dark`);
			break;
		case 7:
			document.querySelector('#navBar').setAttribute('class', `navbar navbar-light  bg-${todaysColor}`);
			document.querySelector('#submit').setAttribute('class', `btn btn-outline-dark my-2 my-sm-0`);
			document.querySelector('#recordcount').setAttribute('class', `my-2 my-sm-0 text-dark`);
			break;
		default:
			document.querySelector('#navBar').setAttribute('class', `navbar  navbar-dark bg-${todaysColor}`);
			break;
	}
	document.querySelector('#navBar').setAttribute('class', `navbar  navbar-dark bg-${todaysColor}`);

	table.setAttribute('class', `table  table-hover`);
	customer_name_header.setAttribute('scope', 'col');
	customerid_header.setAttribute('scope', 'col');
	sql_database_header.setAttribute('scope', 'col');
	sql_server_header.setAttribute('scope', 'col');
	url_header.setAttribute('scope', 'col');
	version_header.setAttribute('scope', 'col');

	header_row.setAttribute('class', `alert alert-${todaysColor}`);

	customer_name_header.innerHTML = 'Customer Name';
	customerid_header.innerHTML = 'Customer Id';
	sql_database_header.innerHTML = 'SQL Database';
	sql_server_header.innerHTML = 'SQL Server';
	url_header.innerHTML = 'URL';
	version_header.innerHTML = 'ClientTrack&reg; Version';

	header_row.appendChild(customer_name_header);
	header_row.appendChild(customerid_header);
	header_row.appendChild(sql_database_header);
	header_row.appendChild(sql_server_header);
	header_row.appendChild(url_header);
	header_row.appendChild(version_header);

	table.appendChild(header_row);

	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName('*');

	/*
	Create a SQL connection
	*/

	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute('w3-include-html');
		if (file) {
			/* Make an HTTP request using the attribute value as the file name: */
			const xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) client_array.push(JSON.parse(this.response));

					if (this.status == 404) {
						elmnt.innerHTML = 'Page not found.';
					}

					/* Remove the attribute, and call this function once more: */
					//elmnt.removeAttribute("w3-include-html");
					//includeHTML();
				}

				if (client_array[0]) {
					client_array[0].map((item, index) => {
						let row = document.createElement('tr');
						row.setAttribute('key', item.row_num);
						row.setAttribute('id', '_row_' + item.row_num);

						let col_customer_name = document.createElement('th');
						col_customer_name.setAttribute('scope', 'row');

						let col_customer_id = document.createElement('td');
						let col_sql_database = document.createElement('td');
						let col_sql_server = document.createElement('td');
						let col_url = document.createElement('td');
						let url_link = document.createElement('a');
						let col_version = document.createElement('td');
						col_version.setAttribute('style', 'padding-left:25px !important;');
						//let link_button = document.createElement('button');

						col_customer_name.innerHTML = item.row_num + '. ' + item.CustomerName;
						col_customer_id.innerHTML = item.customerid;
						col_sql_database.innerHTML = item.SqlDatabase;
						col_sql_server.innerHTML = item.SqlServer;

						(item.Url.indexOf('www') >= 0 || item.Url.indexOf('http') >= 0) &&
							item.SqlServer.toLowerCase().indexOf('inactive') == -1
							? url_link.setAttribute(
								'href',
								item.Url.indexOf('?') >= 0
									? item.Url
									: `${item.Url}?domainid=-99&inline=top&username=`
							) +
							url_link.setAttribute(
								'class',
								`btn btn-outline-${rand == 7 ? 'dark' : todaysColor} btn-sm btn-block`
							) +
							url_link.setAttribute('type', 'button') +
							url_link.setAttribute('target', '_blank')
							: item.SqlServer.toLowerCase().indexOf('selfhost') >= 0
								? ''
								: url_link.setAttribute('style', 'color:red;');
						// url_link.innerHTML = item.Url;
						url_link.innerHTML =
							item.SqlServer.toLowerCase().indexOf('inactive') == -1 &&
								item.SqlServer.toLowerCase().indexOf('selfhost') == -1
								? item.CustomerName.trim()
								: item.SqlServer.toLowerCase().indexOf('selfhost') == -1 ? 'Inactive' : 'Selfhost';

						col_version.innerHTML = item.DatabaseVersion;

						row.appendChild(col_customer_name);
						row.appendChild(col_customer_id);
						row.appendChild(col_sql_database);
						row.appendChild(col_sql_server);
						col_url.appendChild(url_link);
						row.appendChild(col_url);
						row.appendChild(col_version);

						tbody.appendChild(row);
						clientCount = item.row_num;
						getInitialCount(clientCount);
						return;
					});
				}
			};
			table.appendChild(tbody);
			container.appendChild(table);
			xhttp.open('GET', file, true);
			xhttp.send();
			/* Exit the function: */
			return;
		}
	}
}

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', formLoad);
} else {
	formLoad();
}
const getInitialCount = (count) => {
	/// add total record count

	let recordCountElement = document.getElementById('recordcount');
	recordCountElement.innerHTML = 'Built and maintained by Ryan Martin<br/>Records: ' + count;
	return;
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

includeHTML();
