import { dibujarGrafo } from '../canvas.js';
import { estadoCancelacion } from '../../main.js';
import { sleep } from '../../utilidades.js';

export async function dijkstra(canvas, grafo, inicioId) {
    // Inicializamos todas las distancias en infinito
    const distancias = {};
    const previos = {};      // para reconstruir el camino
    const visitados = new Set();
    const pendientes = new Set();

    for (const nodo of grafo.nodos) {
        distancias[nodo.id] = Infinity;
        previos[nodo.id] = null;
    }
    distancias[inicioId] = 0;
    pendientes.add(inicioId);

    while (pendientes.size > 0) {
        if (estadoCancelacion.abortar) return;

        // Elegimos el nodo pendiente con menor distancia conocida
        const actual = obtenerMinimo(pendientes, distancias);
        pendientes.delete(actual);

        if (distancias[actual] === Infinity) break; // nodos inaccesibles

        visitados.add(actual);

        dibujarGrafo(canvas, grafo, {
            visitados: Array.from(visitados),
            enCola: Array.from(pendientes),
            actual,
            distancias   // lo pasamos para mostrarlo en el canvas
        });
        await sleep();

        // Revisamos cada vecino
        for (const { nodo: vecinoId, peso } of grafo.vecinos(actual)) {
            if (visitados.has(vecinoId)) continue;

            const nuevaDistancia = distancias[actual] + peso;

            if (nuevaDistancia < distancias[vecinoId]) {
                distancias[vecinoId] = nuevaDistancia;
                previos[vecinoId] = actual;
                pendientes.add(vecinoId);

                dibujarGrafo(canvas, grafo, {
                    visitados: Array.from(visitados),
                    enCola: Array.from(pendientes),
                    actual,
                    distancias
                });
                await sleep();
            }
        }
    }

    // Al terminar, resaltamos el camino más corto al último nodo visitado
    const camino = reconstruirCamino(previos, inicioId, grafo.nodos[grafo.nodos.length - 1].id);
    dibujarGrafo(canvas, grafo, { visitados: Array.from(visitados), camino, distancias });
}

// Devuelve el id del nodo pendiente con menor distancia
function obtenerMinimo(pendientes, distancias) {
    let minId = null;
    let minDist = Infinity;

    for (const id of pendientes) {
        if (distancias[id] < minDist) {
            minDist = distancias[id];
            minId = id;
        }
    }
    return minId;
}

// Reconstruye el camino desde el fin hasta el inicio siguiendo previos
function reconstruirCamino(previos, inicioId, finId) {
    const camino = [];
    let actual = finId;

    while (actual !== null) {
        camino.unshift(actual);
        actual = previos[actual];
    }

    // Si el camino no llega al inicio, el nodo es inaccesible
    return camino[0] === inicioId ? camino : [];
}