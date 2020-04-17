const formLoad = () => {
	const searchBtn = document.getElementById('submit');
	const searchForm = document.getElementsByTagName('form');
	const searchBox = document.getElementById('searchbox');
	const listUpdatedDate = '4/17/2020';

	document.querySelector('#date-updated').innerHTML = "Client list as of <strong>" + listUpdatedDate.toString() + "</strong>" 

	searchBtn.addEventListener('click', (event) => {
		event.preventDefault();
		performSearch(event);
	});

	// changes this to a input fired event
	searchBox.addEventListener('input', function(event) {
		searchBox.onchange = performSearch(event);
	});

	searchBox.addEventListener('keydown', (event) => {
		if (event.keyCode === 13) {
			performSearch(event);
		}
	});

	searchForm.onsubmit = (event) => {
		event.preventDefault();
		performSearch(event);
	};
};

performSearch = (e) => {
	event.preventDefault();
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

	let searchTerm = searchBox.value.toLowerCase();
	let filteredRecordArray = [];

	recordArray.find(function(record, index) {
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
	filteredRecordArray.forEach(function(element) {
		let rownum = element.record[0];
		records[rownum].parentElement.removeAttribute('hidden');

		console.log(records[rownum].parentElement.children);
		recordCountElement.innerHTML = 'Records: ' + filteredRecordArray.length;
		recordCountElement.removeAttribute('hidden');
	});

	if (e.which == 13 || e.characterCode == 13 || e.key === 'Enter') {
		e.preventDefault();
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
	let clientCount;

	customer_name_header.setAttribute('scope', 'col');
	customerid_header.setAttribute('scope', 'col');
	sql_database_header.setAttribute('scope', 'col');
	sql_server_header.setAttribute('scope', 'col');
	url_header.setAttribute('scope', 'col');
	version_header.setAttribute('scope', 'col');

	header_row.setAttribute('class', 'alert alert-secondary');

	customer_name_header.innerHTML = 'CustomerName';
	customerid_header.innerHTML = 'CustomerId';
	sql_database_header.innerHTML = 'SQLDatabase';
	sql_server_header.innerHTML = 'SQLServer';
	url_header.innerHTML = 'URL';
	version_header.innerHTML = 'CTVersion';

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

			xhttp.onreadystatechange = function() {
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
						let link_button = document.createElement('button');

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
								url_link.setAttribute('class', 'btn btn-outline-dark btn-sm btn-block') +
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

						table.appendChild(row);
						clientCount = item.row_num;
						getInitialCount(clientCount);
						return;
					});
				}
			};

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
	recordCountElement.innerHTML = 'Records: ' + count;
	return;
};
includeHTML();
