export async function quickSort(array, sleep, dibujarBarras, control, inicio = 0, fin = array.length - 1) {
    // Caso base y condición de aborto
    if (inicio >= fin || control.abortar) return;

    let indicePivote = await particion(array, sleep, dibujarBarras, control, inicio, fin);
    
    if (control.abortar) return; // Chequeo antes de la rama izquierda
    await quickSort(array, sleep, dibujarBarras, control, inicio, indicePivote - 1);
    
    if (control.abortar) return; // Chequeo antes de la rama derecha
    await quickSort(array, sleep, dibujarBarras, control, indicePivote + 1, fin);
}

async function particion(array, sleep, dibujarBarras, control, inicio, fin) {
    let valorPivote = array[fin];
    let i = inicio - 1;

    for (let j = inicio; j < fin; j++) {
        if (control.abortar) return;

        // Visualizar: 'j' se está comparando con el pivote en 'fin'
        dibujarBarras(array, { comparando: [j], pivote: [fin] });
        await sleep();

        if (array[j] < valorPivote) {
            i++;
            // Intercambio
            [array[i], array[j]] = [array[j], array[i]];
            // Visualizar el intercambio
            dibujarBarras(array, { comparando: [i, j], pivote: [fin] });
            await sleep();
        }
    }
    
    // Colocar el pivote en su posición final
    [array[i + 1], array[fin]] = [array[fin], array[i + 1]];
    
    // Resaltar el pivote ya posicionado
    dibujarBarras(array, { comparando: [i + 1, fin], pivote: [i + 1] });
    await sleep();
    
    return i + 1;
}