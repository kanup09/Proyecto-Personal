import { dibujarBarras } from "./JS/array.js";


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      
      // Dibujamos resaltando los dos que estamos comparando
      dibujarBarras(array, [j, j + 1]); 
      await sleep(100);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        
        // Redibujamos después del cambio
        dibujarBarras(array, [j, j + 1]);
        await sleep(100);
      }
    }
  }
  // Al terminar, dibujamos sin resaltados
  dibujarBarras(array, []);
}