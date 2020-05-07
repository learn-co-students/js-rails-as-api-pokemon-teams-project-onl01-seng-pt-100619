const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(e){
   allTrainers()
//    pokemonRealease() no need to have another function to add event listeners
})

// function pokemonRealease(){
//     let buttons = document.querySelectorAll(".release")
//     buttons.forEach(function(releaseButton) {
//         releaseButton.addEventListener('click', function(event){
//             console.log("hello")
//         })
//     })
// }
//  add event listener at time of creation of buttons instead of selecting them all over again


let configObj = {
    headers: {
        'Content-type': 'application/json'
    }

}

let deleteObj = {
    method: 'DELETE', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    // body: JSON.stringify(someData) // We send data in JSON format
   }



function allTrainers(){
    return fetch(TRAINERS_URL, configObj)
        .then(response => response.json())
        .then(function(json){
            renderTrainers(json);
        })
        .catch(errors => console.log(errors))
};
// start by displaying the trainers in cards
let main = document.querySelector("main")
function renderTrainers(json){
    let trainers = json.data //abstract pokemon data
    // console.log(trainers);

    for(trainer in trainers){ // create elements and access json object through attributes
        let card = document.createElement("div")
        card.className = "card"
        let p = document.createElement("p")
        p.innerText = trainers[trainer]['attributes']['name']
        card.appendChild(p)
        main.appendChild(card)
        // console.log(trainers[trainer]);
        // I can access the ids of the pokemons from here
        let ul = document.createElement('ul')
        let pokemonsOwned = trainers[trainer]['attributes']['pokemons']
        let addPokemon = document.createElement('button')
        addPokemon.innerText = "Add Pokemon"
        card.appendChild(addPokemon)
        addPokemon.addEventListener('click', function(event){
            // create a new pokemon and add it to owner
            
            let trainerId =  {trainer_id: trainers[trainer]['id']}
            let postObj = {
                method: 'POST', // Method itself
                headers: {
                 'Content-type': 'application/json; charset=UTF-8', // Indicates the content 
                 "Accept": "application/json"

                },
                body: JSON.stringify(trainerId) // We send data in JSON format
            }
            return fetch(POKEMONS_URL, postObj)
                .then(response => response.json())
                .then(function(json) {
                    let newLi = document.createElement('li')
            
                    newLi.innerText = `${json.nickname}, ${json.species}`
                    let button = document.createElement('button')
                    button.className = "release" //add button to each pokemon
                    button.innerText = "Release"
                    newLi.appendChild(button)
                    button.addEventListener('click', event => {
                        event.target.parentNode.parentNode.removeChild(newLi)
                        return fetch(`${POKEMONS_URL}/${id}`, deleteObj)
                            .catch(errors => console.log(errors))
                    });
                    ul.appendChild(newLi)

                })
                .catch(errors => console.log(errors))
        })
            // loop over pokemons of each owner
            for (pokemon in pokemonsOwned){
                let li = document.createElement('li')
                li.innerText = `${pokemonsOwned[pokemon]['nickname']} , ${pokemonsOwned[pokemon]['species']}` 
                let button = document.createElement('button')
                button.className = "release" //add button to each pokemon
                button.innerText = "Release"
                let id = pokemonsOwned[pokemon]['id']
                button.addEventListener('click', event => {
                    event.target.parentNode.parentNode.removeChild(li)
                    return fetch(`${POKEMONS_URL}/${id}`, deleteObj)
                        .catch(errors => console.log(errors))
                });
                
                li.appendChild(button)
                ul.appendChild(li)
                card.appendChild(ul)
            
            }

    }
};

// function renderPokemons(json){
//     let pokemons = json.included
//     let trainers = json.data
//     // console.log(pokemons)

//     // how do i associate the trainer with the pokemon?
//     // if statement for id
//     // for(trainer in trainers)
//         for(pokemon in pokemons){
//             if (pokemons[pokemon]){
//                 // console.log(`${pokemons[pokemon]['attributes']['nickname']} , ${pokemons[pokemon]['attributes']['species']}`)
//             }

//         }


// }

