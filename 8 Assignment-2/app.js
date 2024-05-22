const errorMessage = document.getElementById('error-message');
const showMore = document.getElementById('show-more');


// Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
toggleSpinner('block');

// <!-- Fetch Players API -->
fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=')
    .then(res => res.json())
    .then(data => {
        // <!-- Spinner Start -->
        toggleSpinner('none');
        displayResult(data.player)
    })
    .catch(err => console.log(err));

// Search button
const searchPlayer = () => {
    const searchField = document.getElementById('search-field');
    // Spinner
    toggleSpinner('block');
    const searchFieldText = searchField.value;
    searchField.value = '';

    if (searchFieldText) {
        errorMessage.style.display = 'none';
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchFieldText}`)
            .then(res => res.json())
            .then(data => {
                displayResult(data.player || []);
            })
            .catch(err => console.log(err))
            .finally(() => toggleSpinner('none'))
    }
    else {
        errorMessage.style.display = 'block';
        toggleSpinner('none');
    }
}

// <!-- Display result -->
const displayResult = (players) => {
    const playerParentDiv = document.getElementById('players');
    playerParentDiv.textContent = '';

    // Show more btn
    if (players.length > 18) showMore.style.display = 'block'
    else showMore.style.display = 'none'

    if (players.length === 0) {
        console.log(players.length);
        errorMessage.style.display = 'block';
        toggleSpinner('none');
    }

    players.slice(0, 18).forEach(player => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card shadow border-info h-100 ">
                <img src="${player.strThumb || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}" class="card-img-top" alt="${player.strPlayer}">
                <div class="card-body p-4 position-relative">
                    <h5 class="position-absolute top-0 start-50 translate-middle card-title bg-white px-3 py-1 d-block rounded-5 border border-info shadow-sm"
                        style="width: max-content;">${player.strPlayer}</h5>
                    <div class="d-flex justify-content-center align-items-center column-gap-3 py-2">
                        <a href="https://${player.strFacebook}" target="_blank"><i class="fa-brands fa-facebook fs-4 text-dark"></i></a>
                        <a href="https://${player.strInstagram}" target="_blank"><i class="fa-brands fa-instagram fs-4 text-dark"></i></a>
                        <a href="https://${player.strTwitter}" target="_blank"><i class="fa-brands fa-square-twitter fs-4 text-dark"></i></a>
                    </div>
                    <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center"
                        style="font-size: 14px;">
                        <strong>Date of birth</strong>
                        <span>${player.dateBorn}</span>
                    </p>
                    <p class="card-text m-0 pb-2 d-flex justify-content-between align-items-center"
                        style="font-size: 14px;">
                        <strong>Nationality</strong>
                        <span>${player.strNationality}</span>
                    </p>
                    <p class="card-text m-0 pb-2 d-flex justify-content-between align-items-center"
                        style="font-size: 14px;">
                        <strong>Team</strong>
                        <span>${player.strTeam}</span>
                    </p>
                    <p class="card-text m-0 pb-2 d-flex justify-content-between align-items-center"
                        style="font-size: 14px;">
                        <strong>Position</strong>
                        <span>${player.strPosition}</span>
                    </p>
                    <button onclick='addToCard(${JSON.stringify(player)})' class="btn btn-info w-100 mt-3 fw-medium">
                        Add to Card
                    </button>
                    <button type='button' onclick="playerDetails('${player.idPlayer}')" class="btn btn-outline-info w-100 mt-3 fw-medium" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        More Details
                    </button>
                </div>
            </div>
        `;
        playerParentDiv.appendChild(div);
    });

}


// <!-- Add to Card -->
const addToCard = (player) => {
    console.log(player);
    const totalPlayer = document.getElementsByClassName('total-players');

    if (Number(totalPlayer[0].innerText) < 11) {
        for (let i = 0; i < totalPlayer.length; i++) {
            totalPlayer[i].innerText = Number(totalPlayer[i].innerText) + 1;
        }
        const cardList = document.getElementsByClassName('card-list');
        for (let i = 0; i < cardList.length; i++) {
            const li = document.createElement('li');
            li.classList.add('d-flex', 'align-items-center', 'gap-3', 'mb-2');
            li.innerHTML = `
                <img src="${player.strThumb || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}" alt="" width="40" height="40" class="rounded-5">
                <p class="mb-0">
                    <strong class="d-block">${player.strPlayer}</strong>
                    <span class="d-block" style="font-size: 14px;">${player.strNationality}</span>
                </p>
            `;
            cardList[i].appendChild(li);
        }
    }
    else alert("Maximum 11 items you can add")
}


// <!-- Player Details -->
const playerDetails = (playerId) => {
    console.log(playerId);
    // <!-- Fetch Players API -->
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.players[0]);
            const player = data.players[0];
            const playerDetails = document.getElementById('player-detail');
            playerDetails.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="ModalLabel">Player details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <div style="width: max-content; height: max-content;"
                                class="border border-2 border-info rounded-circle p-1 shadow mx-auto">
                                <img src="${player.strThumb || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}"
                                    alt="" width="100" height="100" class="rounded-circle">
                            </div>
                            <h4 class="py-3">${player.strPlayer || 'N/A'}</h4>
                        </div>
                        <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center" style="font-size: 14px;">
                            <strong>Date of birth</strong><span>${player.dateBorn || 'N/A'}</span>
                        </p>
                        <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center" style="font-size: 14px;">
                            <strong>Address</strong><span>${player.strBirthLocation || 'N/A'}</span>
                        </p>
                        <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center" style="font-size: 14px;">
                            <strong>Gender</strong><span>${player.strGender || 'N/A'}</span>
                        </p>
                        <div class="card-text m-0 py-2 d-flex justify-content-between align-items-center gap-sm-5 gap-2" style="font-size: 14px;">
                            <p class="w-100 d-flex justify-content-between align-items-center m-0">
                                <strong class="">Height</strong><span>${player.strHeight || 'N/A'}</span>
                            </p>
                            <p class="w-100 d-flex justify-content-between align-items-center m-0">
                                <strong class="">Weight</strong><span>${player.strWeight || 'N/A'}</span>
                            </p>
                        </div>
                        <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center" style="font-size: 14px;">
                            <strong>Nationality</strong><span>${player.strNationality || 'N/A'}</span>
                        </p>
                        <hr>
                        <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center" style="font-size: 14px;">
                            <strong>Team</strong><span>${player.strTeam || 'N/A'}</span>
                        </p>
                        <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center" style="font-size: 14px;">
                            <strong>Position</strong><span>${player.strPosition || 'N/A'}</span>
                        </p>
                        <p class="card-text m-0 py-2 d-flex justify-content-between align-items-center" style="font-size: 14px;">
                            <strong>Sports</strong><span>${player.strSport || 'N/A'}</span>
                        </p>
                        <div>
                            <p class="card-text m-0 py-2" style="font-size: 14px;"><strong>Description:</strong></p>
                            <p class="card-text m-0 pb-2" style="font-size: 14px;">${player.strDescriptionEN || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <div class="d-flex justify-content-center align-items-center column-gap-3 py-2">
                            <a href="https://${player.strFacebook}" target="_blank"><i
                                    class="fa-brands fa-facebook fs-4 text-dark"></i></a>
                            <a href="https://${player.strInstagram}" target="_blank"><i
                                    class="fa-brands fa-instagram fs-4 text-dark"></i></a>
                            <a href="https://${player.strTwitter}" target="_blank"><i
                                    class="fa-brands fa-square-twitter fs-4 text-dark"></i></a>
                        </div>
                    </div>
                </div>
            `
        })
        .catch(err => console.log(err));
}

