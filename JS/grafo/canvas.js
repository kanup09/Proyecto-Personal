
// Variables de estado para la interacción
let nodoSeleccionado = null;
let modoArista = false;
let mousePos = { x: 0, y: 0 };

export function inicializarEventos(canvas, grafo) {
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const nodo = nodoEnPosicion(grafo, x, y);

        if (nodo) {
            // Si clickeamos un nodo, empezamos a crear una arista
            nodoSeleccionado = nodo;
            modoArista = true;
        } else {
            // Si clickeamos vacío, creamos un nuevo nodo
            grafo.agregarNodo(x, y);
            dibujarGrafo(canvas, grafo);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (modoArista) {
            const rect = canvas.getBoundingClientRect();
            mousePos.x = e.clientX - rect.left;
            mousePos.y = e.clientY - rect.top;
            
            // Redibujamos para mostrar la línea elástica
            dibujarGrafo(canvas, grafo);
            dibujarLineaTemporal(canvas, nodoSeleccionado, mousePos);
        }
    });

    window.addEventListener('mouseup', (e) => {
        if (modoArista) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const nodoDestino = nodoEnPosicion(grafo, x, y);

            // Si soltamos sobre otro nodo (y no es el mismo), creamos arista
            if (nodoDestino && nodoDestino.id !== nodoSeleccionado.id) {
                grafo.agregarArista(nodoSeleccionado.id, nodoDestino.id);
            }

            modoArista = false;
            nodoSeleccionado = null;
            dibujarGrafo(canvas, grafo);
        }
    });
}

function dibujarLineaTemporal(canvas, origen, destino) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(origen.x, origen.y);
    ctx.lineTo(destino.x, destino.y);
    ctx.strokeStyle = '#94a3b8';
    ctx.setLineDash([5, 5]); // Línea punteada
    ctx.stroke();
    ctx.setLineDash([]); // Reset
}

export function dibujarGrafo(canvas, grafo, estado = {}) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { visitados = [], enCola = [], actual = null, camino = [] } = estado;

    // 1. Dibujar aristas primero (quedan detrás de los nodos)
    for (const arista of grafo.aristas) {
        const desde = grafo.nodos.find(n => n.id === arista.desde);
        const hasta  = grafo.nodos.find(n => n.id === arista.hasta);
        if (!desde || !hasta) continue;

        const enCamino = camino.includes(arista.desde) && camino.includes(arista.hasta);

        ctx.beginPath();
        ctx.moveTo(desde.x, desde.y);
        ctx.lineTo(hasta.x, hasta.y);
        ctx.strokeStyle = enCamino ? '#f59e0b' : '#94a3b8';
        ctx.lineWidth = enCamino ? 3 : 1.5;
        ctx.stroke();

        // Dibujar peso en el medio de la arista
        const mx = (desde.x + hasta.x) / 2;
        const my = (desde.y + hasta.y) / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px monospace';
        ctx.fillText(arista.peso, mx, my);
    }

    // 2. Dibujar nodos encima
    for (const nodo of grafo.nodos) {
        ctx.beginPath();
        ctx.arc(nodo.x, nodo.y, 20, 0, Math.PI * 2);

        // Color según estado del algoritmo
        if (nodo.id === actual) {
            ctx.fillStyle = '#f59e0b';       // amarillo = procesando ahora
        } else if (visitados.includes(nodo.id)) {
            ctx.fillStyle = '#22c55e';       // verde = visitado
        } else if (enCola.includes(nodo.id)) {
            ctx.fillStyle = '#3b82f6';       // azul = en cola
        } else {
            ctx.fillStyle = '#1e293b';       // gris oscuro = sin visitar
        }

        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label del nodo
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nodo.label, nodo.x, nodo.y);
    }
}

// Detecta si un click cayó sobre algún nodo
export function nodoEnPosicion(grafo, x, y) {
    return grafo.nodos.find(n => {
        const dx = n.x - x;
        const dy = n.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 20;
    });
}