export function sleep() {
    const ms = document.getElementById('velocidad').value;
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function actualizarContadores(comparaciones, swaps) {
    document.getElementById('comparaciones').textContent = `Comparaciones: ${comparaciones}`;
    document.getElementById('swaps').textContent = `Swaps: ${swaps}`;
}

export function resetContadores() {
    actualizarContadores(0, 0);
}