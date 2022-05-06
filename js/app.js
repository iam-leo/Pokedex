import { contenedorCard, crearCard } from "./cards.js";
import { btnCerrar } from "./modal.js";

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/'

const registros = 24;
let resultado;
let inicio = 1
let index, fin;
calcularInicioIteracion();
calcularFinIteracion();


async function mostrarPokemones () {
    for(let i = index+1 ; i<= fin; i++){
        const id = i;
           const res = await fetch(urlPokemon+id)
           resultado = await res.json()
           crearCard(resultado);
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