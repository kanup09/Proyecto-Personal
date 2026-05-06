# 🔢 Visualizador de Algoritmos

Aplicación web interactiva que anima en tiempo real algoritmos de ordenamiento 
y recorrido de grafos. Construida con JavaScript vanilla, HTML y CSS — sin frameworks.

## 🚀 Demo

[Ver demo en vivo](https://kanup09.github.io/Proyecto-Personal/)

## ✨ Funcionalidades

### Algoritmos de ordenamiento
- **Bubble Sort** — comparaciones e intercambios animados paso a paso
- **Selection Sort** — resalta el mínimo actual en cada pasada
- **Merge Sort** — visualiza la división y fusión de subarrays
- **Quick Sort** — resalta el pivote durante la partición

### Grafos
- **BFS** (Búsqueda en anchura) — explora nivel por nivel
- **DFS** (Búsqueda en profundidad) — explora rama por rama
- **Dijkstra** — encuentra el camino más corto con pesos en aristas

### Interacción
- Click en el canvas para crear nodos
- Arrastrar entre nodos para crear aristas con peso personalizado
- Control de velocidad de animación en tiempo real
- Contadores de comparaciones y swaps

## 🛠️ Tecnologías

- JavaScript ES6+ (módulos, async/await)
- HTML5 Canvas (grafos)
- CSS3
- Sin dependencias externas

## 📁 Estructura del proyecto
visualizador-algoritmos/
├── index.html
├── css/
│   └── styles.css
└── JS/
├── main.js
├── array.js
├── utilidades.js
├── algoritmos/
│   ├── bubbleSort.js
│   ├── selectionSort.js
│   ├── mergeSort.js
│   └── quickSort.js
└── grafo/
├── grafo.js
├── canvas.js
└── algoritmos/
├── bfs.js
├── dfs.js
└── dijkstra.js
