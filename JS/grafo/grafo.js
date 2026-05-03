export class Grafo {
    constructor() {
        this.nodos = []; // [{ id, x, y, label }]
        this.aristas = []; // [{ desde, hasta, peso }]
        this.contadorId = 0;
    }

    agregarNodo(x, y) {
        const nodo = { id: this.contadorId++, x, y, label: String(this.contadorId) };
        this.nodos.push(nodo);
        return nodo;
    }

    agregarArista(desdeId, hastaId, peso = 1) {
        // Evitar aristas duplicadas
        const existe = this.aristas.some(
            a => (a.desde === desdeId && a.hasta === hastaId) ||
                 (a.desde === hastaId && a.hasta === desdeId)
        );
        if (!existe) {
            this.aristas.push({ desde: desdeId, hasta: hastaId, peso });
        }
    }

    eliminarNodo(id) {
        this.nodos = this.nodos.filter(n => n.id !== id);
        this.aristas = this.aristas.filter(a => a.desde !== id && a.hasta !== id);
    }

    // Devuelve los vecinos de un nodo (útil para los algoritmos)
    vecinos(id) {
        return this.aristas
            .filter(a => a.desde === id || a.hasta === id)
            .map(a => ({
                nodo: a.desde === id ? a.hasta : a.desde,
                peso: a.peso
            }));
    }
}