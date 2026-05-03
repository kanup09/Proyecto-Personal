import { dibujarBarras, generarArrayAleatorio } from "./array.js";
import { bubbleSort } from './algoritmos/bubbleSort.js';
import { selectionSort } from './algoritmos/selectionSort.js';
import { mergeSort } from './algoritmos/mergeSort.js';
import { quickSort } from './algoritmos/quickSort.js';
import { resetContadores } from './utilidades.js';

export let estadoCancelacion = { abortar: false };
let datosActuales = [];

const btnGenerar    = document.getElementById("btn-generar");
const btnBubble     = document.getElementById('btn-bubble');
const btnSelection  = document.getElementById('btn-seleccion');
const btnMerge      = document.getElementById('btn-merge');
const btnQuick      = document.getElementById('btn-quick');
const contenedor    = document.getElementById('contenedor-barras');

btnGenerar.addEventListener("click", () => {
    estadoCancelacion.abortar = true;
    contenedor.innerHTML = "";
    datosActuales = generarArrayAleatorio(20, 300);
    dibujarBarras(datosActuales, {});
    resetContadores();
    setControlesEstado(false);
});

btnBubble.addEventListener('click', async () => {
    await correrAlgoritmo(() => bubbleSort(datosActuales));
});

btnSelection.addEventListener('click', async () => {
    await correrAlgoritmo(() => selectionSort(datosActuales));
});

btnMerge.addEventListener('click', async () => {
    await correrAlgoritmo(() => mergeSort(datosActuales));
});

btnQuick.addEventListener('click', async () => {
    await correrAlgoritmo(() => quickSort(datosActuales));
});

// Centraliza la lógica repetida de todos los botones
async function correrAlgoritmo(fn) {
    try {
        setControlesEstado(true);
        estadoCancelacion.abortar = false;
        resetContadores();
        await fn();
    } catch (error) {
        console.error("Error en la ejecución:", error);
    } finally {
        setControlesEstado(false);
    }
}

function setControlesEstado(estado) {
    btnBubble.disabled    = estado;
    btnSelection.disabled = estado;
    btnMerge.disabled     = estado;
    btnQuick.disabled     = estado;
}