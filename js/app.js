import { crearCard } from "./cards.js";

//API
const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/';

//Variables necesarias para realizar calculos de la iteración
const registros = 24;
let resultado;
let inicio = 1;
let index, fin;
calcularInicioIteracion();
calcularFinIteracion();

//MOSTRAMOS ALGUNOS POKEMONES AL CARGAR LA PÁGINA
async function mostrarPokemones () {
    for(let i = index+1 ; i<= fin; i++){
        const id = i;
           const res = await fetch(urlPokemon+id)
           resultado = await res.json()
           crearCard(resultado);
    }
}

mostrarPokemones();

//AGREGAMOS FUNCIONALIDAD PARA CARGAR MAS POKÉMONES
//Escuchamos cuando el usuario le da click al botón 'Cargar más'
const btnCargarMas = document.querySelector('#cargar-mas');

btnCargarMas.addEventListener('click', () => {
    ++inicio;
    calcularInicioIteracion();
    calcularFinIteracion();
    mostrarPokemones();
});

//Cálculo para obtener desde donde itera la lista de pokemones
function calcularInicioIteracion() {
    index = (inicio - 1) * registros
}

//Cálculo para obtener hasta donde itera la lista de pokemones
function calcularFinIteracion() {
    fin = inicio * registros
}