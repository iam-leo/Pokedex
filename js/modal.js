//SELECTORES
const modal = document.querySelector('#modal');
const cardModal = document.querySelector('#card-modal');
const nombrePokemon = document.querySelector('#nombre');
const btnCerrar = document.querySelector('#btn-cerrar');
const imgPokemonHtml = document.querySelector('#img-pokemon');
const regionHtml = document.querySelector('#region');
const habitatHtml = document.querySelector('#habitat')
const habilidadHtml = document.querySelector('#habilidad');
const movimientosHtml = document.querySelector('#movimientos');
const pokebola = document.querySelector('#pokebola')
const pokemon = document.querySelector('#img-pokemon')

//CERRAR VENTANA MODAL
btnCerrar.addEventListener('click', () => {
    modal.classList.add('hidden')
});

//ABRIR VENTANA MODAL
export async function abrirModal(abilities, id, img, movimientosURL, nombre){
    //Ocultar momentaneamente las img del html
    pokebola.classList.add('hidden');
    pokemon.classList.add('hidden');

    //Limpiar el contenido de la ventana modal
    limpiarHtml();

    //Mostramos la ventana en pantalla
    modal.classList.remove('hidden');

    //Cargamos spinner mientras obtenemos los resultados correspondientes
    spinner(cardModal);

    //Resultados
    const habilidades = await obtenerHabilidades(abilities);
    const region = await obtenerRegion(id);
    const movimientos = await obtenerMovimientos(movimientosURL);
    const habitat = await obtenerHabitat(nombre);

    //DESPUES DE OBTENER LOS RESULTADOS
    //Quitamos el spinner
    document.querySelector('.spinner').remove();

    //Quitamos la clase hidden de la img de la pokebola y pokémon
    pokebola.classList.remove('hidden');
    pokemon.classList.remove('hidden');

    //Pintamos en el html el contenido con los resultados obtenidos
    nombrePokemon.textContent = `#${id} ${nombre}`;
    habitatHtml.textContent = `Habitat: ${habitat}`
    regionHtml.textContent = `Región: ${region.name}`

    //Pintamos la/s habilidad/es en caso de que un pokémon tenga mas de una habilidad
    if(habilidades[1] !== undefined){
        habilidadHtml.innerHTML = `Habilidad: <span style="margin-left: 4px">•${habilidades[0][0]}</span> <br> <span style="margin-left: 80px"> •${habilidades[1][0]} </span>`;
    }else if(habilidades[0] !== undefined){
        habilidadHtml.innerHTML = `Habilidad: <span style="margin-left: 4px">•${habilidades[0][0]}</span>`;
    }else{
        habilidadHtml.innerHTML = `Habilidad: <span style="margin-left: 4px">•${habilidades[0]}</span>`;
    }

    movimientosHtml.textContent = `Movimientos: ${movimientos[0]}`

    //Agregamos la ruta de la img del pokemon a mostrar
    imgPokemonHtml.src = img;
}

//OBTENER REGION DEL POKÉMON
async function obtenerRegion(id){
    const url = 'https://pokeapi.co/api/v2/region/'
    let nroRegion;

    //Según el nro del pokémon asignamos el numero correspondiente a la región
    if(id <= 151){
        nroRegion = 1;
    } else if( id>151 && id<=251){
        nroRegion = 2;
    } else if(id>251 && id<=386){
        nroRegion = 3;
    } else if(id>386 && id<=493){
        nroRegion = 4;
    } else if(id>493 && id<=649){
        nroRegion = 5;
    } else if(id>649 && id<=721){
        nroRegion = 6;
    } else if(id>721 && id<=786){
        nroRegion = 7;
    } else if(id>786){
        nroRegion = 8;
    }

    //Consultamos la api y traemos la región correspondiente
    const jsonData = await fetch(url+nroRegion);
    const regionData = await jsonData.json();
    return regionData;

}

//SPINNER
export function spinner(elemento){
    const spinner = document.createElement('div');
    spinner.classList.add('spinner')
    spinner.innerHTML = `
        <div class="dot1"></div>
        <div class="dot2"></div>
    `;
    
    elemento.appendChild(spinner);
}

//RESETEAR CONTENIDO DE LA VENTANA MODAL
function limpiarHtml() {
    nombrePokemon.textContent = '';
    regionHtml.textContent = '';
    habitatHtml.textContent = '';
    habilidadHtml.textContent = '';
    movimientosHtml.textContent = '';
    imgPokemonHtml.src = '';
}

//OBTENER HABITAT DEL POKÉMON
async function obtenerHabitat(nombrePokemon){
    const url = 'https://pokeapi.co/api/v2/pokemon-habitat/'
    let habitatPokemon;

    //Recorremos todos los habitats hasta matchear con el nombre del pokémon
    for(let i=1; i<=9; i++){
        const res = await fetch(url+i);
        const habitats = await res.json();

        habitats.pokemon_species.forEach(pokemon => {
            if(pokemon.name === nombrePokemon){
                const habitat = habitats.names[1].name;
                habitatPokemon = habitat;
                return;
            }
        });

        if(habitatPokemon !== '' && habitatPokemon !== undefined){
            return habitatPokemon
        }
    }
}

//OBTENER LA URL DE LAS HABILIDADES DEL POKÉMON
async function obtenerHabilidades(abilities) {
    let habilidades = []
    abilities.forEach(async ability =>{
        habilidades.push( await obtenerHabilidad(ability.ability.url));
    });

    //Devolvemos todas las habilidades
    return habilidades;
}

//OBTENER TODAS LAS HABILIDADES DEL POKÉMON
async function obtenerHabilidad(url){
    const respuesta = await fetch(url);
    const habilidades = await respuesta.json();
    
    let habilidadesPokemon = []

    //Recorremos todas las habilidades y matcheamos por lenguaje 'es' (español)
    for(let i=0; i<habilidades.flavor_text_entries.length; i++){
        if(habilidades.flavor_text_entries[i].language.name === 'es'){
            habilidadesPokemon.push(habilidades.flavor_text_entries[i].flavor_text);
        }
    }

    //Eliminamos resultados duplicados
    habilidadesPokemon = habilidadesPokemon.filter( (hab, i) => habilidadesPokemon.indexOf(hab) === i);

    //Devolvemos todas las habilidades obtenidas
    return habilidadesPokemon;
}

//OBTENEMOS LOS MOVIMIENTOS DEL POKÉMON
async function obtenerMovimientos(url){
    const respuesta = await fetch(url)
    const movimientos = await respuesta.json();
    let movimientosPokemon = []

    //Recorremos todos los movimientos y matcheamos por lenguaje 'es' (español)
    for(let i=0; i<movimientos.flavor_text_entries.length; i++){
        if(movimientos.flavor_text_entries[i].language.name === 'es'){
            movimientosPokemon.push(movimientos.flavor_text_entries[i].flavor_text);
        }
    }

    //Eliminamos resultados duplicados
    movimientosPokemon = movimientosPokemon.filter( (mov, i) => movimientosPokemon.indexOf(mov) === i);

    //Devolvemos todos los movimientos del pokémon
    return movimientosPokemon;
}