export function generarArrayAleatorio(cantidad) {
    const contenedor = document.getElementById('contenedor-barras');
    const nuevoArray = [];
    
    // 1. Limpiar el contenedor por completo para el nuevo set
    contenedor.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
        // 2. Generar el dato numérico
        const valor = Math.floor(Math.random() * 400) + 20;
        nuevoArray.push(valor);

        // 3. CREAR EL ELEMENTO EN EL DOM
        const barra = document.createElement('div');
        barra.classList.add('barra');
        
        // Agregamos la barra al contenedor
        contenedor.appendChild(barra);
    }

    // 4. Ahora que los DIVs existen, los "pintamos"
    dibujarBarras(nuevoArray);
    
    return nuevoArray;
}
export function dibujarBarras(array, opciones = {}) {
    const contenedor = document.getElementById('contenedor-barras');
    const barrasDOM = contenedor.children; // Usamos los elementos existentes para evitar parpadeo
    
    // Desestructuración con valores por defecto
    const { comparando = [], pivote = [], minimo = [] } = opciones;

    array.forEach((valor, index) => {
        const barra = barrasDOM[index];
        if (!barra) return;
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

