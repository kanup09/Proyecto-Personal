import { dibujarBarras } from '../../array.js';
import { estadoCancelacion } from '../../main.js';
import { sleep, actualizarContadores } from '../../utilidades.js';

let comparaciones = 0;
let swaps = 0;

export async function quickSort(array) {
    comparaciones = 0;
    swaps = 0;
    await quickSortRecursivo(array, 0, array.length - 1);
    dibujarBarras(array, {});
}

async function quickSortRecursivo(array, inicio, fin) {
    if (inicio >= fin) return;
    if (estadoCancelacion.abortar) return;

    const indicePivote = await particionar(array, inicio, fin);
    await quickSortRecursivo(array, inicio, indicePivote - 1);
    await quickSortRecursivo(array, indicePivote + 1, fin);
}

async function particionar(array, inicio, fin) {
    const pivote = array[fin]; // Elegimos el último elemento como pivote
    let i = inicio - 1;

    for (let j = inicio; j < fin; j++) {
        if (estadoCancelacion.abortar) return i + 1;

        comparaciones++;
        actualizarContadores(comparaciones, swaps);
        // pivote muestra el elemento pivote, comparando muestra el que evaluamos
        dibujarBarras(array, { pivote: [fin], comparando: [j] });
        await sleep();

        if (array[j] < pivote) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            swaps++;
            actualizarContadores(comparaciones, swaps);
            dibujarBarras(array, { pivote: [fin], comparando: [i, j] });
            await sleep();
        }
    }

    // Ponemos el pivote en su lugar definitivo
    [array[i + 1], array[fin]] = [array[fin], array[i + 1]];
    swaps++;
    actualizarContadores(comparaciones, swaps);
    dibujarBarras(array, { pivote: [i + 1] });
    await sleep();

    return i + 1;
}