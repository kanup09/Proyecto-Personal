import { dibujarBarras } from '../array.js';
import { estadoCancelacion } from '../main.js';
import { sleep, actualizarContadores } from '../utilidades.js';

export async function bubbleSort(array) {
    let comparaciones = 0;
    let swaps = 0;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (estadoCancelacion.abortar) return;

            comparaciones++;
            actualizarContadores(comparaciones, swaps);
            dibujarBarras(array, { comparando: [j, j + 1] });
            await sleep();

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
                actualizarContadores(comparaciones, swaps);
                dibujarBarras(array, { comparando: [j, j + 1] });
                await sleep();
            }
        }
    }
    dibujarBarras(array, {});
}