import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

//Business Logic

function getGifs(keyWord) {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?q=${keyWord}&api_key=${process.env.API_KEY}`;

    request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
            printElements(response);
        } else {
            printError();
        }
    });

    request.open("GET", url, true);
    request.send();
}

// UI Logic

/*.datafunction printElements(apiResponse, keyWord) {
    let gifs = 
    document.querySelector('#gif-container').innerHTML = `here are your ${keyWord} GIFs: ${JSON.stringify(apiResponse
        )
    }`;
}*/

function printElements(apiResponse) {
    const response = apiResponse.data;
    const container = document.querySelector('#image-container');
    container.innerHTML = '';
    response.forEach(item => {
        const img = document.createElement('img');
        img.src = item.url;
        container.appendChild(img);
    });
}

function printError(keyWord) {
    document.querySelector('#image-container').innerText = `There was an error accessing the weather data for ${keyWord}`;
}

function formSubmit(event) {
    event.preventDefault();
    const keyWord = document.querySelector('#search-input').value;
    document.querySelector('#search-input').value = null;
    getGifs(keyWord);
}

window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", formSubmit);
});