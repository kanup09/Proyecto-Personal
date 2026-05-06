import { dibujarBarras, generarArrayAleatorio } from "./array.js";
import { resetContadores } from './utilidades.js';
// Algoritmos
import { bubbleSort } from './algoritmos/bubbleSort.js';
import { mergeSort } from './algoritmos/mergeSort.js';
import { quickSort } from './algoritmos/quickSort.js';
import { selectionSort } from './algoritmos/selectionSort.js';
// Grafos
import { dfs } from "./grafo/algoritmos/dfs.js";
import { bfs } from "./grafo/algoritmos/bdf.js";
import { Grafo} from "./grafo/grafo.js";
import { dibujarGrafo, inicializarEventos } from "./grafo/canvas.js";
import { dijkstra } from "./grafo/algoritmos/dijkstra.js";

export let estadoCancelacion = { abortar: false };
let datosActuales = [];

// Botones algoritmos
const btnGenerar    = document.getElementById("btn-generar");
const btnBubble     = document.getElementById('btn-bubble');
const btnSelection  = document.getElementById('btn-seleccion');
const btnMerge      = document.getElementById('btn-merge');
const btnQuick      = document.getElementById('btn-quick');
const contenedor    = document.getElementById('contenedor-barras');

// Grafos
const canvasGrafo = document.getElementById('canvas-grafo');
const btnBfs = document.getElementById('btn-bfs');
const btnDfs = document.getElementById('btn-dfs');
const btnLimpiarGrafo = document.getElementById('btn-limpiar-grafo');
const btnDijkstra = document.getElementById('btn-dijkstra');
// Estado global del grafo
const miGrafo = new Grafo();

// Activamos la interacción (clicks y drag)
if (canvasGrafo) {
    inicializarEventos(canvasGrafo, miGrafo);
}

btnBfs?.addEventListener('click', () => ejecutarAlgoritmoGrafo(bfs));
btnDfs?.addEventListener('click', () => ejecutarAlgoritmoGrafo(dfs));
btnDijkstra?.addEventListener('click', () => ejecutarAlgoritmoGrafo(dijkstra));

btnLimpiarGrafo?.addEventListener('click', () => {
    estadoCancelacion.abortar = true; // Detenemos cualquier algoritmo en curso
    miGrafo.nodos = [];
    miGrafo.aristas = [];
    miGrafo.contadorId = 0;
    dibujarGrafo(canvasGrafo, miGrafo);
});

// Función auxiliar para bloquear botones durante la animación
function toggleBotonesGrafo(bloquear) {
    [btnBfs, btnDfs, btnDijkstra, btnLimpiarGrafo].forEach(btn => {
        if (btn) btn.disabled = bloquear;
    });
}

// Eventos

btnGenerar.addEventListener("click", () => {
    estadoCancelacion.abortar = true;
    contenedor.innerHTML = "";
    datosActuales = generarArrayAleatorio(20);
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

async function ejecutarAlgoritmoGrafo(algoritmoFn) {
    if (miGrafo.nodos.length === 0) {
        alert("Primero crea algunos nodos haciendo click en el canvas.");
        return;
    }

    // Reset de estado y preparación
    estadoCancelacion.abortar = false;
    toggleBotonesGrafo(true); // Función para deshabilitar UI

    try {
        // Por defecto empezamos desde el primer nodo creado
        const inicioId = miGrafo.nodos[0].id; 
        await algoritmoFn(canvasGrafo, miGrafo, inicioId);
    } catch (error) {
        console.error("Error en el algoritmo de grafo:", error);
    } finally {
        toggleBotonesGrafo(false);
    }
}


function setControlesEstado(estado) {
    btnBubble.disabled    = estado;
    btnSelection.disabled = estado;
    btnMerge.disabled     = estado;
    btnQuick.disabled     = estado;
}