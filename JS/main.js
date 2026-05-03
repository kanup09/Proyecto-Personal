import { dibujarBarras, generarArrayAleatorio } from "./array.js";
export let estadoCancelacion = { abortar : false};
let datosActuales = [];

const btnGenerar = document.getElementById("btn-generar");
const contenedor = document.getElementById('contenedor-barras');

btnGenerar.addEventListener("click", () => {
    estadoCancelacion.abortar = true;
    contenedor.innerHTML = "";
    datosActuales = generarArrayAleatorio(20, 300);
    dibujarBarras(datosActuales);
    setControlesEstado(false); // Desbloqueamos todo
});

// Función para habilitar/deshabilitar todos los controles a la vez
function setControlesEstado(estado) {
    btnBubble.disabled = estado;
    btnSelection.disabled = estado;
    
}

import { bubbleSort } from './algoritmos/bubbleSort.js';

const btnBubble = document.getElementById('btn-bubble');

btnBubble.addEventListener('click', async() => {
    try {
        setControlesEstado(true); // Bloqueamos todo al empezar
        estadoCancelacion.abortar = false;
        await selectionSort(datosActuales);
        
    } catch (error) {
        console.error("Error en la ejecución:", error);
    } finally {
        // El bloque FINALLY se ejecuta SIEMPRE:
        // Si el algoritmo termina, si lo abortas o si falla.
        setControlesEstado(false); 
    }
});


import { selectionSort } from './algoritmos/selectionSort.js';

const btnSelection = document.getElementById('btn-seleccion');

btnSelection.addEventListener('click', async() => {
    try {
        setControlesEstado(true); // Bloqueamos todo al empezar
        estadoCancelacion.abortar = false; 
        
        await selectionSort(datosActuales);
        
    } catch (error) {
        console.error("Error en la ejecución:", error);
    } finally {
        // El bloque FINALLY se ejecuta SIEMPRE:
        // Si el algoritmo termina, si lo abortas o si falla.
        setControlesEstado(false); 
    }
});
