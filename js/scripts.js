
const gallery = document.getElementById('gallery');

// fetch function
function getRandomPeople() {
    fetch('https://randomuser.me/api/?results=12')
        .then(res => res.json())
        .then(data => addUsers(data.results))
    }

function addUsers(data) {
    const randoms = data.map((info, index) => {
        listenForClick(info, data, index)

        // info input for card
        const html =  `<div class="card" id="${info.name.first}${info.name.last}">
                        <div class="card-img-container">
                            <img class="card-img" src="${info.picture.large}" alt="${info.name.first}${info.name.last}">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${info.name.first} ${info.name.last} </h3>
                            <p class="card-text">${info.email}</p>
                            <p id="cityState" class="card-text cap">${info.location.city}, ${info.location.state} </p>
                        </div>
                    </div>`
        return html;
    }).join('');
    gallery.innerHTML = randoms; 
}

function addModal(info, data, index) {
    const div = document.createElement('div')
    div.className = 'modal-container';

    // info input for modal
    const html = `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${info.picture.large}" alt="${info.name.first}${info.name.last}">
                    <h3 id="name" class="modal-name cap">${info.name.first} ${info.name.last}</h3>
                    <p class="modal-text">${info.email}</p>
                    <p class="modal-text cap">${info.location.city}</p>
                    <hr>
                    <p class="modal-text">${info.cell}</p>
                    <p class="modal-text">${info.location.street.number} ${info.location.street.name}</p>
                    <p class="modal-text">${info.location.city}, ${info.location.state} ${info.location.postcode}</p>
                    <p class="modal-text">Birthday: ${info.dob.date.substring(0,10)}</p>
                </div>`

    div.innerHTML = html;
    document.querySelector('body').appendChild(div);

    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', e => {
        div.remove();
    });    
}

function listenForClick(info, data, index) {
    setTimeout(e => {
        const person = document.getElementById(`${info.name.first}${info.name.last}`);
        person.addEventListener('click', e => addModal(info, data, index));
    },100)
}


// callbacks
getRandomPeople();
addModal();
listenForClick();
handleSearch();
