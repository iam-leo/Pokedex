const contenedorCard = document.querySelector('#contenedor-cards');



export function crearCard(obj) {
    const {img, nro, nombre, tipo, debilidad, habilidad, evolucion} = obj
    
    //Crear card
    const divCard = document.createElement('div');
    divCard.classList.add('w-full', 'h-72', 'flex', 'flex-col', 'items-center', 'justify-end', 'relative', 'rounded-md');

    //Crear elemento img
    const imgCard = document.createElement('img');
    imgCard.src = img;
    imgCard.classList.add('w-28', 'h-28', 'absolute', 'top-0', 'z-10');

    //Crear div con la info
    const divInfo = document.createElement('div');
    divInfo.classList.add('w-full', 'h-3/4', 'flex', 'flex-col', 'items-center', 'justify-end', 'rounded-t-xl', 'rounded-b-md', 'bg-green-600', 'shadow-lg', 'shadow-green-800', 'overflow-hidden');

    //Crear div contenedor del numero y el nombre
    const divTitulo = document.createElement('div');
    divTitulo.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'mb-2');

    const pNumero = document.createElement('p');
    pNumero.classList.add('text-5xl', 'font-Archivo', 'font-black', 'opacity-40');
    pNumero.textContent = `#${nro}`;
    
    const tNombre = document.createElement('h3');
    tNombre.classList.add('text-white', 'font-Archivo', 'text-xl');
    tNombre.textContent = nombre;


    //Crear div grid caracteristicas del pokemon
    const divGrid = document.createElement('div');
    divGrid.classList.add('w-full', 'grid', 'grid-cols-2', 'text-white', 'pb-2');

    //Crear div col 1
    const divCol1 = document.createElement('div');
    divCol1.classList.add('bg-green-700', 'text-center', 'p-1');

    //Crear contenido divCol1
    const pTipo = document.createElement('p');
    pTipo.classList.add('text-center');
    pTipo.textContent = 'Tipo';

    const pDebilidad = document.createElement('p');
    pDebilidad.classList.add('text-center');
    pDebilidad.textContent = 'Debilidad';

    const pHabilidad = document.createElement('p');
    pHabilidad.classList.add('text-center');
    pHabilidad.textContent = 'Habilidad';

    const pEvolucion = document.createElement('p');
    pEvolucion.classList.add('text-center');
    pEvolucion.textContent = 'Evolución';

    //Agregar el contenido a divCol1
    divCol1.appendChild(pTipo);
    divCol1.appendChild(pDebilidad);
    divCol1.appendChild(pHabilidad);
    divCol1.appendChild(pEvolucion);

    //Crear divCol2
    const divCol2 = document.createElement('div');
    divCol2.classList.add('bg-green-800', 'text-center', 'font-bold', 'p-1');

    //Crear contenido divCol2
    const pTipoContenido = document.createElement('p');
    pTipoContenido.textContent = tipo;

    const pDebilidadContenido = document.createElement('p');
    pDebilidadContenido.textContent = debilidad;

    const pHabilidadContenido = document.createElement('p');
    pHabilidadContenido.textContent = habilidad;

    const pEvolucionContenido = document.createElement('p');
    pEvolucionContenido.textContent = evolucion;

    //Agregar el contenido a divCol2
    divCol2.appendChild(pTipoContenido);
    divCol2.appendChild(pDebilidadContenido);
    divCol2.appendChild(pHabilidadContenido);
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

}