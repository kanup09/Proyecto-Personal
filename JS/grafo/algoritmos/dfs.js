import { dibujarGrafo } from '../canvas.js';
import { estadoCancelacion } from '../../main.js';
import { sleep } from '../../utilidades.js';

export async function dfs(canvas, grafo, inicioId) {
    // Usamos Set para que la búsqueda sea O(1)
    const visitados = new Set();
    const pila = [inicioId];
    
    // Mantenemos este array para la visualización (nodos en azul)
    let nodosEnPila = [inicioId];

    while (pila.length > 0) {
        if (estadoCancelacion.abortar) return;

        // --- LA DIFERENCIA CLAVE ---
        // .pop() saca el ÚLTIMO elemento agregado (LIFO)
        const actual = pila.pop();

        if (visitados.has(actual)) continue;

        visitados.add(actual);
        nodosEnPila = nodosEnPila.filter(id => id !== actual);

        // Visualización del nodo que estamos procesando ahora
        dibujarGrafo(canvas, grafo, { 
            visitados: Array.from(visitados), 
            enCola: nodosEnPila, 
            actual 
        });
        await sleep();

        // Obtenemos los vecinos y los invertimos
        // Se invierten para que al salir de la pila se exploren en el orden "normal"
        const vecinos = grafo.vecinos(actual).reverse();

        for (const { nodo: vecino } of vecinos) {
            if (estadoCancelacion.abortar) return;

            if (!visitados.has(vecino)) {
                pila.push(vecino);
                nodosEnPila.push(vecino);

                // Actualizamos visualmente la pila
                dibujarGrafo(canvas, grafo, { 
                    visitados: Array.from(visitados), 
                    enCola: nodosEnPila, 
                    actual 
                });
                await sleep();
            }
        }
    }

    // Limpieza final del estado visual
    dibujarGrafo(canvas, grafo, { visitados: Array.from(visitados) });
}