const formLoad = () => {
	const searchBtn = document.getElementById('submit');
	const searchForm = document.getElementsByTagName('form');
	const searchBox = document.getElementById('searchbox');

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

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', formLoad);
} else {
	formLoad();
}
performSearch = (e) => {
	event.preventDefault();
	let _rows = document.getElementsByTagName('th');
	let _rowsLength = _rows.length;
	let searchBox = document.getElementById('searchbox');
	let _rowArray = [];
	let noRecords = document.createElement('tr');
	let noRecordTd = document.createElement('td');
	let recCount = document.getElementById('recordcount');
	noRecords.appendChild(noRecordTd);
	noRecordTd.innerHTML = 'No records found.';
	noRecords.setAttribute('id', 'norecords');

	if (document.getElementById('norecords') != null) {
		document.getElementById('norecords').setAttribute('hidden', 'hidden');
	}

	for (i = 0; i < _rowsLength; i++) {
		_rows[i].parentElement.setAttribute('id', '_row_' + i);
		_rowArray.push([
			i,
			_rows[i].innerHTML.toLowerCase(),
			_rows[i].parentElement.children[1].innerHTML.toLowerCase(),
			_rows[i].parentElement.children[2].innerHTML.toLowerCase(),
			_rows[i].parentElement.children[3].innerHTML.toLowerCase(),
			_rows[i].parentElement.children[5].innerHTML.toLowerCase()
		]);
	}
	for (i = 0; i < 6; i++) {
		_rowArray.shift();
	}

	let searchTerm = searchBox.value.toLowerCase();
	let newArr = [];

	_rowArray.find(function(element, index) {
		//console.log(element);
		if (
			element[1].indexOf(searchTerm) >= 0 ||
			element[2].indexOf(searchTerm) >= 0 ||
			element[3].indexOf(searchTerm) >= 0 ||
			element[4].indexOf(searchTerm) >= 0 ||
			element[5].indexOf(searchTerm) >= 0
		) {
			newArr.push({ element });
		}
	});

	for (i = 6; i < _rowsLength; i++) {
		_rows[i].parentElement.setAttribute('hidden', 'hidden');
	}

	if (newArr.length == 0) {
		if (document.getElementById('norecords') != null) {
			document.getElementById('norecords').removeAttribute('hidden');
			document.getElementById('recordcount').setAttribute('hidden', 'hidden');
		} else {
			_rows[0].parentElement.parentElement.appendChild(noRecords);
		}
	}
	newArr.forEach(function(element) {
		let rownum = element.element[0];
		_rows[rownum].parentElement.removeAttribute('hidden');

		console.log(_rows[rownum].parentElement.children);
		recCount.innerHTML = 'Records: ' + newArr.length;
		recCount.removeAttribute('hidden');
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
					client_array[0].map((item) => {
						let row = document.createElement('tr');

						let col_customer_name = document.createElement('th');
						col_customer_name.setAttribute('scope', 'row');

						let col_customer_id = document.createElement('td');
						let col_sql_database = document.createElement('td');
						let col_sql_server = document.createElement('td');
						let col_url = document.createElement('td');
						let url_link = document.createElement('a');
						let col_version = document.createElement('td');

						col_customer_name.innerHTML = item.CustomerName;
						col_customer_id.innerHTML = item.customerid;
						col_sql_database.innerHTML = item.SqlDatabase;
						col_sql_server.innerHTML = item.SqlServer;
						(item.Url.indexOf('www') >= 0 || item.Url.indexOf('http') >= 0) &&
						item.SqlServer.toLowerCase().indexOf('inactive') == -1
							? url_link.setAttribute('href', `${item.Url}?domainid=-99&inline=top`)
							: item.SqlServer.toLowerCase().indexOf('selfhost') >= 0
								? ''
								: url_link.setAttribute('style', 'text-decoration:line-through; filter:blur(1px); color:red;');
						url_link.innerHTML = item.Url;
						col_version.innerHTML = item.DatabaseVersion;

						row.appendChild(col_customer_name);
						row.appendChild(col_customer_id);
						row.appendChild(col_sql_database);
						row.appendChild(col_sql_server);
						col_url.appendChild(url_link);
						row.appendChild(col_url);
						row.appendChild(col_version);

						table.appendChild(row);
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

includeHTML();
