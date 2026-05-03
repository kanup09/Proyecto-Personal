import { dibujarBarras } from '/JS/array.js';
import { estadoCancelacion } from '/JS/Main.js';

const ms = document.getElementById('velocidad').value;
await sleep(ms);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function selectionSort(array) {
    let n= array.length;
    
    for(let i=0; i<n-1; i++){
        let min = i;
        
        for(let j=i+1; j<n; j++){
            if (estadoCancelacion.abortar) {
                return; // Detiene el algoritmo por completo
            }
            dibujarBarras(array, [i, j, min]);
            await sleep(ms);
            
            if(array[j] < array[min]){
                min = j;
            }
        }
        if(min !== i){
            [array[i], array[min]] = [array[min], array[i]];
            dibujarBarras(array, [i, min]);
            await sleep(ms);
        }
    }
    dibujarBarras(array, []);

}