// // DELIVERABLES:

// //✅ Fetch data

// //✅ Add pups to dog bar in spans

// // Show more info about each pup
//     //✅ h2 with name
//     //✅ image
//     //✅ good dog! button that toggles if the dog is good or not
//         //✅ this is a patch to the database
//     //✅ filter good dogs with the button at the top of the page




const baseURL = "http://localhost:3000/pups"

const bar = document.querySelector('#dog-bar')
const details = document.querySelector('#dog-info')
const filterButton = document.querySelector('#good-dog-filter')
let dogsArr = [];

//Fetches

function getAllDogs() {
    return fetch(baseURL)
    .then(resp => resp.json())
    // .then(renderAllInBar)
}

function getOneDog(id) {
    return fetch(baseURL + `/${id}`)
    .then(resp => resp.json())
}

// function getGoodDogs() {

// }

//Rendering

function renderAllInBar(dogsArr, filter = false) {
    bar.innerHTML = '';
    if (filter) {
        dogsArr.filter(dogObj => dogObj.isGoodDog).forEach(addOneDogToBar)
    } else {
        dogsArr.forEach(addOneDogToBar)
    }   
}

function addOneDogToBar(dogObj) {
    const dogSpan = document.createElement('span');
    dogSpan.innerText = dogObj.name;
    dogSpan.dataset.id = dogObj.id;
    dogSpan.addEventListener('click', handleSpanClick);
    bar.append(dogSpan);
}

function showOneDog(dogObj) {
    // console.log(dogObj);
    details.innerHTML = '';
    const dogDiv = document.createElement('div');
    dogDiv.innerHTML = `
        <h2>${dogObj.name}</h2>
        <img src='${dogObj.image}'/>
    `;
    const pupBtn = document.createElement('button');
    pupBtn.textContent = dogObj.isGoodDog ? "Good Dog" : "Bad Dog";
    pupBtn.addEventListener('click', () => {
        dogObj.isGoodDog = !dogObj.isGoodDog,
        pupBtn.textContent = dogObj.isGoodDog ? "Good Dog" : "Bad Dog";
        updateDog(dogObj)
    })
    details.append(dogDiv, pupBtn);
}

function updateDog(dogObj) {
    fetch(baseURL + `/${dogObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({isGoodDog: dogObj.isGoodDog})
    })
    .then(resp => resp.json())
}

// Event handlers

function handleSpanClick(e) {
    const id = e.target.dataset.id
    getOneDog(id).then(showOneDog)
}

filterButton.addEventListener("click", toggleFilter)

function toggleFilter() {
    if(filterButton.innerText.includes("OFF")) {
        filterButton.innerText = "Filter good dogs: ON";
        getAllDogs().then(dogArr => renderAllInBar(dogArr, true))
        
    } else {
        filterButton.innerText = "Filter good dogs: OFF"
        getAllDogs().then(renderAllInBar)
    }
}



// filterButton.addEventListener('click', () => {
//     if (filterButton.textContent.includes("OFF")) {
//         filterButton.textContent = "Filter good dogs: ON"
//         renderAllInBar(dogsArr)
//     } else if (filterButton.textContent.includes("ON")) {
//         filterButton.textContent = "Filter good dogs: OFF"
//         const goodDogsOnly = dogsArr.filter(dog => dog.isGoodDog === true)
//         console.log(goodDogsOnly)
//         renderAllInBar(goodDogsOnly)
//     }
    
// })




//Initialize

getAllDogs().then(renderAllInBar)

