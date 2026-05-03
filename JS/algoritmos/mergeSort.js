import { dibujarBarras } from '../array.js';
import { estadoCancelacion } from '../main.js';
import { sleep, actualizarContadores } from '../utilidades.js';

let comparaciones = 0;
let swaps = 0;

export async function mergeSort(array) {
    comparaciones = 0;
    swaps = 0;
    await mergeSortRecursivo(array, 0, array.length - 1);
    dibujarBarras(array, {});
}

async function mergeSortRecursivo(array, inicio, fin) {
    if (inicio >= fin) return;
    if (estadoCancelacion.abortar) return;

    const medio = Math.floor((inicio + fin) / 2);

    await mergeSortRecursivo(array, inicio, medio);
    await mergeSortRecursivo(array, medio + 1, fin);
    await merge(array, inicio, medio, fin);
}

async function merge(array, inicio, medio, fin) {
    // Copiamos los dos subarrays
    const izq = array.slice(inicio, medio + 1);
    const der = array.slice(medio + 1, fin + 1);

    let i = 0, j = 0, k = inicio;

    while (i < izq.length && j < der.length) {
        if (estadoCancelacion.abortar) return;

        comparaciones++;
        actualizarContadores(comparaciones, swaps);
        dibujarBarras(array, { comparando: [k], pivote: [inicio, fin] });
        await sleep();

        if (izq[i] <= der[j]) {
            array[k] = izq[i];
            i++;
        } else {
            array[k] = der[j];
            j++;
            swaps++;
        }
        actualizarContadores(comparaciones, swaps);
        k++;
    }

    // Copiamos lo que sobró
    while (i < izq.length) {
        array[k] = izq[i];
        i++; k++;
    }
    while (j < der.length) {
        array[k] = der[j];
        j++; k++;
    }

    dibujarBarras(array, { pivote: [inicio, fin] });
    await sleep();
}