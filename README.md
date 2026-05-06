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

## ▶️ Cómo correrlo localmente

```bash
git clone https://github.com/kanup09/Proyecto-Personal.git
cd Proyecto-Personal
```

Abrí `index.html` con un servidor local. Si tenés VS Code, usá la extensión 
**Live Server** (click derecho → "Open with Live Server").

> ⚠️ No funciona abriendo el archivo directamente en el navegador porque 
> los módulos ES6 requieren un servidor HTTP.

## 📚 Lo que aprendí

- Animaciones con `async/await` y control del event loop en JavaScript
- Manipulación del DOM y Canvas API sin librerías externas
- Implementación de algoritmos clásicos desde cero
- Arquitectura modular con ES6 modules
- Cancelación de tareas asíncronas con flags de estado compartido

## 🗺️ Próximos pasos

- [ ] Soporte para grafos dirigidos
- [ ] Migración a TypeScript
- [ ] Más algoritmos: Heap Sort, A*
