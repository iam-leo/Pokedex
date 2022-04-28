import { crearCard } from "./cards.js";

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/'

async function mostrarPokemones () {
    for(let i = 1; i<= 151; i++){
        const id = i
       await fetch(urlPokemon+id)
        .then( res => res.json())
        .then( resultado => {
            crearCard(resultado);
        })
        .catch(error => console.log(error))
    }
}

mostrarPokemones();