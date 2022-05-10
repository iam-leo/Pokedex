import { abrirModal } from "./modal.js";
export const contenedorCard = document.querySelector('#contenedor-cards');

const pokeReferencias = {
    grass: {
        card: 'bg-green-600',
        col1: 'bg-green-700',
        col2: 'bg-green-800',
        shadow: 'shadow-green-800',
        textColor: 'text-white',
        text: 'Planta'
    },
    fire:{
        card: 'bg-orange-500',
        col1: 'bg-orange-600',
        col2: 'bg-orange-700',
        shadow: 'shadow-orange-700',
        textColor: 'text-white',
        text: 'Fuego'
    },
    water: {
        card: 'bg-blue-500',
        col1: 'bg-blue-600',
        col2: 'bg-blue-700',
        shadow: 'shadow-blue-700',
        textColor: 'text-white',
        text: 'Agua'
    },
    bug: {
        card: 'bg-lime-500',
        col1: 'bg-lime-600',
        col2: 'bg-lime-700',
        shadow: 'shadow-lime-700',
        textColor: 'text-white',
        text: 'Bicho'
    },
    normal: {
        card: 'bg-amber-200',
        col1: 'bg-amber-300',
        col2: 'bg-amber-400',
        shadow: 'shadow-amber-400',
        textColor: 'text-black',
        text: 'Normal'
    },
    flying: {
        card: 'bg-amber-200',
        col1: 'bg-amber-300',
        col2: 'bg-amber-400',
        shadow: 'shadow-amber-400',
        textColor: 'text-black',
        text: 'Volador'
    },
    poison: {
        card: 'bg-purple-600',
        col1: 'bg-purple-700',
        col2: 'bg-purple-800',
        shadow: 'shadow-purple-800',
        textColor: 'text-white',
        text: 'Veneno'
    },
    electric: {
        card: 'bg-yellow-300',
        col1: 'bg-yellow-400',
        col2: 'bg-yellow-500',
        shadow: 'shadow-yellow-500',
        textColor: 'text-black',
        text:'Electrico'
    },
    ground: {
        card: 'bg-yellow-600',
        col1: 'bg-yellow-700',
        col2: 'bg-yellow-800',
        shadow: 'shadow-yellow-800',
        textColor: 'text-white',
        text: 'Tierra'
    },
    ice: {
        card: 'bg-sky-200',
        col1: 'bg-sky-300',
        col2: 'bg-sky-400',
        shadow: 'shadow-sky-400',
        textColor: 'text-black',
        text: 'Hielo'
    },
    fairy: {
        card: 'bg-rose-300',
        col1: 'bg-rose-400',
        col2: 'bg-rose-500',
        shadow: 'shadow-rose-500',
        textColor: 'text-white',
        text: 'Hada'
    },
    fighting: {
        card: 'bg-red-500',
        col1: 'bg-red-600',
        col2: 'bg-red-700',
        shadow: 'shadow-red-600',
        textColor: 'text-white',
        text: 'Lucha'
    },
    psychic: {
        card: 'bg-yellow-300',
        col1: 'bg-yellow-400',
        col2: 'bg-yellow-500',
        shadow: 'shadow-yellow-500',
        textColor: 'text-black',
        text: 'Psiquico'
    },
    rock: {
        card: 'bg-amber-700',
        col1: 'bg-amber-800',
        col2: 'bg-amber-900',
        shadow: 'shadow-amber-900',
        textColor: 'text-white',
        text: 'Roca'
    },
    ghost: {
        card: 'bg-violet-700',
        col1: 'bg-violet-800',
        col2: 'bg-violet-900',
        shadow: 'shadow-violet-900',
        textColor: 'text-white',
        text: 'Fantasma'
    },
    dragon: {
        card: 'bg-indigo-300',
        col1: 'bg-indigo-400',
        col2: 'bg-indigo-500',
        shadow: 'shadow-indigo-500',
        textColor: 'text-black',
        text: 'Dragon'
    },
    dark: {
        card: 'bg-indigo-300',
        col1: 'bg-indigo-400',
        col2: 'bg-indigo-500',
        shadow: 'shadow-indigo-500',
        textColor: 'text-black',
        text: 'Oscuro'
    },
    steel: {
        card: 'bg-zinc-200',
        col1: 'bg-zinc-300',
        col2: 'bg-zinc-400',
        shadow: 'shadow-zinc-400',
        textColor: 'text-black',
        text: 'Acero'
    },


}


export async function crearCard(obj) {
    const {abilities, base_experience, height, id, sprites: {other: { 'official-artwork': {front_default}}}, types:[{type: {name}}], weight} = obj
    
    const img = front_default;
    const nombre = obj.name
    const tipo = name;

    //Estilos para la card según el tipo de pokémon
    const colorCard = pokeReferencias[tipo].card
    const colorCol1 = pokeReferencias[tipo].col1
    const colorCol2 = pokeReferencias[tipo].col2
    const shadow = pokeReferencias[tipo].shadow
    const textColor = pokeReferencias[tipo].textColor
    const text = pokeReferencias[tipo].text

    //Crear card
    const divCard = document.createElement('div');
    divCard.classList.add('w-full', 'h-72', 'flex', 'flex-col', 'items-center', 'justify-end', 'relative', 'rounded-md');

    //Crear elemento img
    const imgCard = document.createElement('img');
    imgCard.src = img;
    imgCard.classList.add('w-28', 'h-28', 'absolute', 'top-0', 'z-10');
    imgCard.alt = nombre;

    //Crear div con la info
    const divInfo = document.createElement('div');
    divInfo.classList.add('w-full', 'h-3/4', 'flex', 'flex-col', 'items-center', 'justify-end', 'rounded-t-xl', 'rounded-b-md', `${colorCard}`, 'shadow-xl', `${shadow}`, 'overflow-hidden', 'cursor-pointer');

    //Crear div contenedor del numero y el nombre
    const divTitulo = document.createElement('div');
    divTitulo.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'mb-2');

    const pNumero = document.createElement('p');
    pNumero.classList.add('text-5xl', 'font-Archivo', 'font-black', 'opacity-40');
    pNumero.textContent = `#${id}`;

    const tNombre = document.createElement('h3');
    tNombre.classList.add(`${textColor}`, 'font-Archivo', 'text-lg', 'md:text-xl', 'font-bold', 'uppercase');
    tNombre.textContent = nombre;


    //Crear div grid caracteristicas del pokemon
    const divGrid = document.createElement('div');
    divGrid.classList.add('w-full', 'grid', 'grid-cols-2', `${textColor}`, 'pb-2');

    //Crear div col 1
    const divCol1 = document.createElement('div');
    divCol1.classList.add(`${colorCol1}`, 'text-center', 'p-1');

    //Crear contenido divCol1
    const pTipo = document.createElement('p');
    pTipo.classList.add('text-center');
    pTipo.textContent = 'Tipo';

    const pAltura = document.createElement('p');
    pAltura.classList.add('text-center');
    pAltura.textContent = 'Altura';

    const pPeso = document.createElement('p');
    pPeso.classList.add('text-center');
    pPeso.textContent = 'Peso';

    const pXP = document.createElement('p');
    pXP.classList.add('text-center');
    pXP.textContent = 'XP';

    //Agregar el contenido a divCol1
    divCol1.appendChild(pTipo);
    divCol1.appendChild(pAltura);
    divCol1.appendChild(pPeso);
    divCol1.appendChild(pXP);

    //Crear divCol2
    const divCol2 = document.createElement('div');
    divCol2.classList.add(`${colorCol2}`, `${textColor}`, 'text-center', 'font-bold', 'p-1');

    //Crear contenido divCol2
    const pTipoContenido = document.createElement('p');
    pTipoContenido.textContent = text;

    const pAlturaContenido = document.createElement('p');
    pAlturaContenido.textContent = height/10 + " Mts";

    const pPesoContenido = document.createElement('p');
    pPesoContenido.textContent = weight + " Kg";

    const pEvolucionContenido = document.createElement('p');
    pEvolucionContenido.textContent = base_experience;

    //Agregar el contenido a divCol2
    divCol2.appendChild(pTipoContenido);
    divCol2.appendChild(pAlturaContenido);
    divCol2.appendChild(pPesoContenido);
    divCol2.appendChild(pEvolucionContenido);

    //Agregar contenido al div grid
    divGrid.appendChild(divCol1);
    divGrid.appendChild(divCol2);

    //Agregar los parrafos al div contenedor del nombre y numero
    divTitulo.appendChild(pNumero)
    divTitulo.appendChild(tNombre)

    //Agregar el contenido al div info
    divInfo.appendChild(divTitulo);
    divInfo.appendChild(divGrid);

    //Agregar elementos a la card
    divCard.appendChild(imgCard);
    divCard.appendChild(divInfo);

    //Agregar card al html
    contenedorCard.appendChild(divCard);

    divCard.onclick = () =>{
        abrirModal(abilities, id, img, nombre)
    }

}