import { dibujarBarras } from "/JS/array.js";
import { estadoCancelacion } from "/JS/Main.js";

const ms = document.getElementById('velocidad').value;
await sleep(ms);
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      
      if (estadoCancelacion.abortar) {
        return; // Detiene el algoritmo por completo
      }
      // Dibujamos resaltando los dos que estamos comparando
      dibujarBarras(array, [j, j + 1]); 
      await sleep(ms);

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