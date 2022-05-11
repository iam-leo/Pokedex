import { contenedorCard, crearCard } from "./cards.js";
import { spinner } from "./modal.js";

const form = document.querySelector('form');
const input = document.querySelector('#input-busqueda');
const btnBusqueda = document.querySelector('#btn-busqueda');
const btnCargarMas = document.querySelector('#cargar-mas');
const btnRegresar = document.querySelector('#regresar');

//API
const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/';

btnBusqueda.addEventListener('click', buscarPokemon);

async function buscarPokemon(e){
    e.preventDefault();

    //Validar el input
    if(input.value === ''){
        //Lanzar alerta
        mostrarAlerta('Debes ingresar el nombre o número de un pokémon');
    }else{
        //Aseguramos la limpieza del html previo
        limpiarHTML();

        //Ocultamos el boton de cargar más para evitar crear cards que no corresponden con la búsqueda
        btnCargarMas.classList.add('hidden');

        //Re-estilizamos el contenedor de cards para centrar la unica card renderizada
        contenedorCard.classList.remove('grid-cols-2', 'md:grid-cols-4', 'lg:grid-cols-6');
        contenedorCard.classList.add('place-items-center');

        //Mostramos un spinner de carga, mientras obtenemos resultados de la búsqueda
        spinner(contenedorCard);

        try {
            //Hacemos la petición a la API
            const res = await fetch(urlPokemon+input.value);
            resultado = await res.json();

            //Una vez obtenidos los resultados quitamos el spinner
            document.querySelector('.spinner').remove();

            //Creamos la card con el pokémon buscado
            crearCard(resultado);
            const cardPokemon = document.querySelector('.card-pokemon');

            //Redefinimos nuevo width para la card renderizada
            cardPokemon.classList.remove('w-full');
            cardPokemon.classList.add('w-1/2', 'lg:w-1/3');

            //Quitamos la clase hidden para mostrar el botón de regresar
            btnRegresar.classList.remove('hidden');
        } catch (error) {
            //En caso de obtener un error en la petición a la API, quitamos el spinner
            document.querySelector('.spinner').remove();

            //Lanzamos alerta
            mostrarAlerta('El nombre o número no corresponde a un pokémon');

            //Despues de 3.5 seg volvemos a mostrar el listado de pokemones
            setTimeout(() => {
                //Reseteamos la variable para mostrar el listado desde el principio
                inicio = 1;

                //Creamos las cards nuevamente
                mostrarPokemones();

                ////Reseteamos los estilos del contenedor de cards a valores iniciales
                contenedorCard.classList.add('grid-cols-2', 'md:grid-cols-4', 'lg:grid-cols-6');
                contenedorCard.classList.remove('place-items-center');

                //Ocultamos el botón de regresar y mostramos el botón de cargar más
                btnRegresar.classList.add('hidden');
                btnCargarMas.classList.remove('hidden');
            }, 3500);
        }
    }
}

function mostrarAlerta(mensaje){
    //Creamos elemento div y p
    const divAlerta = document.createElement('div');
    const p = document.createElement('p');

    //Le damos estilos al div
    divAlerta.classList.add('bg-red-600', 'p-3', 'mt-4', 'rounded-md')

    //Añadimos el mensaje y los estilos al elemento p
    p.textContent = mensaje;
    p.classList.add('text-white', 'font-2xl');

    //Agregamos los elementos al HTML
    divAlerta.appendChild(p);
    form.appendChild(divAlerta);

    //Despues de 3 seg quitamos la alerta del HTML
    setTimeout(() => {
            divAlerta.remove();
    }, 3000);
}

function limpiarHTML(){
    while(contenedorCard.firstChild){
        contenedorCard.removeChild(contenedorCard.firstChild)
    }
}

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