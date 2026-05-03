
export function generarArrayAleatorio(cantidad, alturaMax) {
    const nuevoArray = [];
    for (let i = 0; i < cantidad; i++) {
        // Genera un número entre 1 y alturaMax
        const valor = Math.floor(Math.random() * alturaMax) + 1;
        nuevoArray.push(valor);
    }
    return nuevoArray;
}

export function dibujarBarras(array, opciones = {}) {
    const contenedor = document.getElementById('contenedor-barras');
    const barrasDOM = contenedor.children; // Usamos los elementos existentes para evitar parpadeo
    
    // Desestructuración con valores por defecto
    const { comparando = [], pivote = [], minimo = [] } = opciones;

    array.forEach((valor, index) => {
        const barra = barrasDOM[index];
        
        // 1. Actualizamos la altura
        barra.style.height = `${valor}px`; 
        
        // 2. Limpiamos todas las clases de estado previas, manteniendo la base
        barra.className = 'barra'; 

        // 3. Asignamos la nueva clase de color según el estado actual
        // El orden del if/else define la prioridad visual si un índice coincide en varios arrays
        if (pivote.includes(index)) {
            barra.classList.add('pivote');
        } else if (minimo.includes(index)) {
            barra.classList.add('minimo');
        } else if (comparando.includes(index)) {
            barra.classList.add('comparando');
        }
    });
}

