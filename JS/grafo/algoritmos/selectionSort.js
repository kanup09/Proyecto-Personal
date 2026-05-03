import { dibujarBarras } from '../../array.js';
import { estadoCancelacion } from '../../main.js';
import { sleep, actualizarContadores } from '../../utilidades.js';

export async function selectionSort(array) {
    let comparaciones = 0;
    let swaps = 0;
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let min = i;

        for (let j = i + 1; j < n; j++) {
            if (estadoCancelacion.abortar) return;

            comparaciones++;
            actualizarContadores(comparaciones, swaps);
            dibujarBarras(array, { comparando: [j], pivote: [min], ordenado: [i] });
            await sleep();

            if (array[j] < array[min]) {
                min = j;
            }
        }

        if (min !== i) {
            [array[i], array[min]] = [array[min], array[i]];
            swaps++;
            actualizarContadores(comparaciones, swaps);
            dibujarBarras(array, { comparando: [i, min] });
            await sleep();
        }
    }
    dibujarBarras(array, {});
}