export async function mergeSort(array, sleep, dibujarBarras, control, inicio = 0, fin = array.length - 1) {
    if (inicio >= fin || control.abortar) return;

    const medio = Math.floor((inicio + fin) / 2);

    await mergeSort(array, sleep, dibujarBarras, control, inicio, medio);
    if (control.abortar) return;
    
    await mergeSort(array, sleep, dibujarBarras, control, medio + 1, fin);
    if (control.abortar) return;
    
    await merge(array, sleep, dibujarBarras, control, inicio, medio, fin);
}

async function merge(array, sleep, dibujarBarras, control, inicio, medio, fin) {
    let n1 = medio - inicio + 1;
    let n2 = fin - medio;

    // Llenado de arrays auxiliares
    let L = new Array(n1);
    let R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = array[inicio + i];
    for (let j = 0; j < n2; j++) R[j] = array[medio + 1 + j];

    let i = 0, j = 0, k = inicio;

    while (i < n1 && j < n2) {
        if (control.abortar) return;

        // Visualizar qué índices estamos evaluando
        dibujarBarras(array, { comparando: [inicio + i, medio + 1 + j] });
        await sleep();

        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        
        // Visualizar la sobreescritura en el array principal (usamos el color pivote temporalmente)
        dibujarBarras(array, { pivote: [k] });
        await sleep();
        k++;
    }

    // Copiar los elementos restantes (animando también este proceso)
    while (i < n1) {
        if (control.abortar) return;
        array[k] = L[i];
        dibujarBarras(array, { pivote: [k] });
        await sleep();
        i++;
        k++;
    }

    while (j < n2) {
        if (control.abortar) return;
        array[k] = R[j];
        dibujarBarras(array, { pivote: [k] });
        await sleep();
        j++;
        k++;
    }
}