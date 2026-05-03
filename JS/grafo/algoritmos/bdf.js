import { dibujarGrafo } from '../canvas.js';
import { estadoCancelacion } from '../../main.js';
import { sleep } from '../../utilidades.js';

export async function bfs(canvas, grafo, inicioId) {
    // Usamos Set para búsquedas ultra rápidas
    const visitados = new Set();
    const cola = [inicioId];
    
    // Este array es solo para la representación visual de "nodos en espera"
    let nodosEnCola = [inicioId];

    while (cola.length > 0) {
        if (estadoCancelacion.abortar) return;

        const actual = cola.shift();
        
        // Si ya lo visitamos por otra rama, lo ignoramos
        if (visitados.has(actual)) continue;

        // Marcamos como visitado
        visitados.add(actual);
        
        // Actualizamos la lista visual de nodos en espera (quitamos el actual)
        nodosEnCola = nodosEnCola.filter(id => id !== actual);

        // Visualización: Nodo actual procesándose
        dibujarGrafo(canvas, grafo, { 
            visitados: Array.from(visitados), 
            enCola: nodosEnCola, 
            actual 
        });
        await sleep();

        for (const { nodo: vecino } of grafo.vecinos(actual)) {
            if (estadoCancelacion.abortar) return;

            if (!visitados.has(vecino) && !nodosEnCola.includes(vecino)) {
                cola.push(vecino);
                nodosEnCola.push(vecino);
                
                // Opcional: Redibujar aquí para mostrar cómo se "iluminan" los vecinos al encontrarlos
                dibujarGrafo(canvas, grafo, { 
                    visitados: Array.from(visitados), 
                    enCola: nodosEnCola, 
                    actual 
                });
                // Un pequeño delay aquí hace que la expansión se vea más orgánica
                await sleep(); 
            }
        }
    }

    // Estado final: todo el grafo procesado
    dibujarGrafo(canvas, grafo, { visitados: Array.from(visitados) });
}