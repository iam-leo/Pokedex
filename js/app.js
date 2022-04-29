import { contenedorCard, crearCard } from "./cards.js";

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/'

const registros = 24;
let inicio = 1
let index, fin;
calcularInicioIteracion();
calcularFinIteracion();


async function mostrarPokemones () {
    for(let i = index+1 ; i<= fin; i++){
        const id = i;
        console.log('ID: '+id+' INICIO: '+inicio+' FIN: '+fin)
            await fetch(urlPokemon+id)
            .then( res => res.json())
            .then( resultado => {
                console.log(resultado);
                crearCard(resultado);
            })
            .catch(error => console.log(error))
    }
}

mostrarPokemones();

const btnCargarMas = document.querySelector('#cargar-mas');

btnCargarMas.addEventListener('click', () => {
    ++inicio;
    calcularInicioIteracion();
    calcularFinIteracion()
    console.log('INICIO: '+inicio+' FIN: '+fin);
    mostrarPokemones();
});

function calcularInicioIteracion() {
    index = (inicio - 1) * registros
}

function calcularFinIteracion() {
    fin = inicio * registros
}

//Cantidad total de pokemones 898