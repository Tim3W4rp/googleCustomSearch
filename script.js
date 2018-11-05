const key = 'AIzaSyCRajoOl2QY5guIlKBggIOCTOhGUagSTPo';
const cx = '008423077959082289852:1vtwjajtvtg';

window.onload = function() {
	var btn = document.getElementById('searchButton');
	var input = document.getElementById('query');
	var logo = document.getElementById('googleLogo');

	input.addEventListener('keyup', function (event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			btn.click();
		}
	});

	btn.addEventListener('click', function () {
		clear();
    	doRequest(generateSrc(), function (data) {appendResults(data); });
    	doRequest(generateSrc(true), function(data) {appendResults(data, true); });
    });

    logo.addEventListener('click', function() { window.location.href = "index.html"});

};

function generateSrc(isImageSearch = false) {
	var query = document.getElementById('query').value;
	return 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + cx + '&q=' + query + (isImageSearch ? '&searchType=image' : '');
};

function doRequest(src, onDataLoaded) {
	var request = new XMLHttpRequest();
	request.open('GET', src);
	request.responseType = 'text';

	request.ontimeout = function () {
		console.error('Timeout!');
	};

	request.onerror = function () {
		alert('There has been an error: ' + request.status);
	};

	request.onload = function () {
		if (request.readyState === request.DONE && request.status === 200) {
			onDataLoaded(JSON.parse(request.response));
		}
	};

	request.send();
};

function clear() {
	document.getElementById('rows').innerHTML = "";
	document.getElementById('images').innerHTML = "";
};

function appendWebResult(item) {
	var resultDiv = document.createElement('div');
	resultDiv.className = 'webResult';
	resultDiv.innerHTML += '<b>' + item.title + '</b>' + '<br>' + '<a href="' + item.formattedUrl + '" target="_blank" >' + item.formattedUrl + '</a>' + '<br>' + '<i>' + item.snippet + '</i>';
	document.querySelector("div#webResults > div.rows").appendChild(resultDiv);
};

function appendImageResult(item) {
	var resultImage = document.createElement('img');
	resultImage.src = item.link;
	resultImage.href = item.link;
	resultImage.className = 'imageResult';
	document.querySelector("div#imageResults > div.images").appendChild(resultImage);
};

function appendResults(response, isImageSearch = false) {
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		(isImageSearch ? appendImageResult(item) : appendWebResult(item));
	}
};

