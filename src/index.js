// // DELIVERABLES:

// //✅ Fetch data

// //✅ Add pups to dog bar in spans

// // Show more info about each pup
//     //✅ h2 with name
//     //✅ image
//     // good dog! button that toggles if the dog is good or not
//         // this is a patch to the database
//     // filter good dogs with the button at the top of the page



// document.addEventListener('DOMContentLoaded', () => {
//     const baseURL = "http://localhost:3000/pups";
//     const filterButton = document.getElementById('good-dog-filter');
    

//     // console.log("dogSpan", dogSpan)

//     const fetchDogs = () => {
//         fetch(baseURL)
//         .then(resp => resp.json())
//         .then(dogs => dogs.forEach(dog => renderDog(dog))) //end of second then
//     } //end of fetch dogs



// function renderDog(dog) {
//     // console.log(dog)
//     const dogBar = document.querySelectorAll("#dog-bar")[0]
//     const dogSpan = document.createElement('span');
//     dogSpan.className = "dog-span";
//     dogSpan.addEventListener('click', renderDogSummary)
//     const dogName = document.createElement('span');
//     dogName.innerText = dog.name;
//     dogName.src = dog.image;
//     dogSpan.append(dogName);
//     dogBar.append(dogSpan)
// } //end of renderDog

//     fetchDogs()


// }); // end of domcontentloaded


// function renderDogSummary (e) {
//     const dogDetailName = document.createElement('h2')

//     const dogDetailElement = document.createElement('div')
//     dogDetailElement.innerHTML = `
//         <h2>${e.target.innerText}</h2>
//         <img src=${e.target.src}/>

//     `



//     dogDetailName.innerText = e.target.innerText
//     const dogDetailImage = document.createElement('img')
//     dogDetailImage.src = e.target.src





//     const dogSummaryContainer = document.getElementById('dog-info')


//     dogSummaryContainer.innerHTML = ''
//     dogSummaryContainer.append(dogDetailName, dogDetailImage)
// }


// // function renderDogSummary (e) {
// //     const dogDetailName = document.createElement('h2')
// //     dogDetailName.innerText = e.target.innerText
// //     const dogDetailImage = document.createElement('img')
// //     dogDetailImage.src = e.target.src
// //     // console.log("dog detail image", dogDetailImage)
// //     // console.log("dogdetailname", dogDetailName)
// //     const goodToggleButton = document.createElement('button')
    
// //     const dogSummaryContainer = document.getElementById('dog-info')
// //     dogSummaryContainer.innerHTML = ''
// //     dogSummaryContainer.append(dogDetailName, dogDetailImage)
// // }

// HERE STARTS THE VIDEO CODE

const baseURL = "http://localhost:3000/pups"

const bar = document.querySelector('#dog-bar')
const details = document.querySelector('#dog-info')
const filterButton = document.querySelector('#good-dog-filter')


//Fetches

function getAllDogs() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(renderAllInBar)
}

function getOneDog(id) {
    return fetch(baseURL + `/${id}`)
    .then(resp => resp.json())
}


//Rendering

function renderAllInBar(dogsArr) {
    bar.innerHTML = '';
    dogsArr.forEach(addOneDogToBar)
}

function addOneDogToBar(dogObj) {
    const dogSpan = document.createElement('span');
    dogSpan.innerText = dogObj.name;
    dogSpan.dataset.id = dogObj.id;
    dogSpan.addEventListener('click', handleSpanClick);
    bar.append(dogSpan);
}

function showOneDog(dogObj) {
    console.log(dogObj);
    details.innerHTML = '';
    const dogDiv = document.createElement('div');
    dogDiv.innerHTML = `
        <h2>${dogObj.name}</h2>
        <img src='${dogObj.image}'/>
    `
    details.append(dogDiv)
}


// Event handlers

function handleSpanClick(e) {
    const id = e.target.dataset.id
    getOneDog(id).then(showOneDog)
}



//Initialize

getAllDogs()

