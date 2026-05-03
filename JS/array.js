
export function generarArrayAleatorio(cantidad, alturaMax) {
    const nuevoArray = [];
    for (let i = 0; i < cantidad; i++) {
        // Genera un número entre 1 y alturaMax
        const valor = Math.floor(Math.random() * alturaMax) + 1;
        nuevoArray.push(valor);
    }
    return nuevoArray;
}
/*export async function dibujarBarras(array,indicesResaltados = []){
    const contenedor = document.getElementById("contenedor-barras");
    contenedor.innerHTML = ""; // Esto Borra lo anterior

    array.forEach((valor, indice) => {
        const barra = document.createElement("div");
        barra.classList.add("barra");
        // Altura proporcional: si el valor es 50, la altura será 50px (o 50%)
        barra.style.height = `${valor}px`;
        
        if (indicesResaltados.includes(indice)) {
            barra.style.backgroundColor = "red";
        } else {
            barra.style.backgroundColor = "royalblue";
        }

        contenedor.appendChild(barra);
    })
}*/

export function dibujarBarras(array, indicesResaltados = []) {
    const contenedor = document.getElementById('contenedor-barras');
    const barrasExistentes = contenedor.children;

    // Si no hay barras creadas, las creamos por primera vez
    if (barrasExistentes.length === 0) {
        array.forEach(() => {
            const barra = document.createElement('div');
            barra.classList.add('barra');
            contenedor.appendChild(barra);
        });
    }

    // Ahora solo actualizamos las propiedades de las barras que ya están ahí
    array.forEach((valor, indice) => {
        const barra = barrasExistentes[indice];
        
        // Actualizamos altura
        barra.style.height = `${valor}px`; 

        // Actualizamos color según el resaltado
        if (indicesResaltados.includes(indice)) {
            barra.style.backgroundColor = "red"; 
        } else {
            barra.style.backgroundColor = "royalblue"; 
        }
    });
}

