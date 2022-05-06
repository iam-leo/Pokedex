const modal = document.querySelector('#modal');
const cardModal = document.querySelector('#card-modal');
const nombrePokemon = document.querySelector('#nombre');
const num = document.querySelector('#num');
export const btnCerrar = document.querySelector('#btn-cerrar');
const imgPokemonHtml = document.querySelector('#img-pokemon');
const regionHtml = document.querySelector('#region');
const habitatHtml = document.querySelector('#habitat')
const habilidadHtml = document.querySelector('#habilidad');
const movimientosHtml = document.querySelector('#movimientos');
const pokebola = document.querySelector('#pokebola')
const pokemon = document.querySelector('#img-pokemon')

btnCerrar.addEventListener('click', () => {
    modal.classList.add('hidden')
});

export async function abrirModal(id, img, nombre){
    pokebola.classList.add('hidden');
    pokemon.classList.add('hidden');
    limpiarHtml();
    modal.classList.remove('hidden');
    spinner();

    const region = await obtenerRegion(id);
    const habitat = await obtenerHabitat(nombre);

    document.querySelector('.spinner').remove();
    pokebola.classList.remove('hidden');
    pokemon.classList.remove('hidden');

    habitatHtml.textContent = `Habitat: ${habitat}`
    regionHtml.textContent = `Región: ${region.name}`
    imgPokemonHtml.src = img;
    nombrePokemon.textContent = `#${id} ${nombre}`;
    
}

async function obtenerRegion(id){
    const url = 'https://pokeapi.co/api/v2/region/'
    let nroRegion;

    if(id <= 151){
        nroRegion = 1
    } else if( id>151 && id<=251){
        nroRegion = 2
    } else if(id>251 && id<=386){
        nroRegion = 3
    } else if(id>386 && id<=493){
        nroRegion = 4
    } else if(id>493 && id<=649){
        nroRegion = 5
    } else if(id>649 && id<=721){
        nroRegion = 6
    } else if(id>721 && id<=786){
        nroRegion = 7
    } else if(id>786){
        nroRegion = 8
    }

    const jsonData = await fetch(url+nroRegion)
    const regionData = await jsonData.json()
    return regionData

}

function spinner(){
    const spinner = document.createElement('div');
    spinner.classList.add('spinner')
    spinner.innerHTML = `
    <div class="dot1"></div>
    <div class="dot2"></div>
    `
    cardModal.appendChild(spinner);
}

function limpiarHtml() {
    nombrePokemon.textContent = ''
    regionHtml.textContent = '';
    habitatHtml.textContent = '';
    habilidadHtml.textContent = '';
    movimientosHtml.textContent = '';
    imgPokemonHtml.src = '';
}

async function obtenerHabitat(nombrePokemon){
    const url = 'https://pokeapi.co/api/v2/pokemon-habitat/'
    let habitatPokemon;

    for(let i=1; i<=9; i++){
        const res = await fetch(url+i);
        const habitats = await res.json();
        
        habitats.pokemon_species.forEach(pokemon => {
            console.log(pokemon);
            if(pokemon.name === nombrePokemon){
                const habitat = habitats.names[1].name;
                console.log(habitat);
                habitatPokemon = habitat;
                return;
            }
        });
        
        if(habitatPokemon !== '' && habitatPokemon !== undefined){
            return habitatPokemon
        }

    }
}