import { dibujarBarras, generarArrayAleatorio } from "./array.js";

let datosActuales = [];

const btnGenerar = document.getElementById("btn-generar");

btnGenerar.addEventListener("click", () => {
    datosActuales = generarArrayAleatorio(20, 300);

    dibujarBarras(datosActuales);

});