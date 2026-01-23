import './components/index.js'

let GRID_DIVISION = 100;

class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b; 
    }

    getRBG() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}

function generateRandomColor(){
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return new Color(r,g,b);
}

function generateRandomElements(count){
    let iterations = 0;
    while(iterations < count){
        let div = document.createElement("div");
        div.style.backgroundColor = generateRandomColor().getRBG();
        div.style.width = "100%";
        div.style.height = "100%";
        document.body.appendChild(div);
        iterations++;
    }
}

//generateRandomElements(GRID_DIVISION * GRID_DIVISION);

let showGrid = false;

function toggleGridView() {
    showGrid = !showGrid;

    const existingLines = document.querySelectorAll('.guide-line');
    existingLines.forEach(line => line.remove());

    if (!showGrid) return;

    for (let i = 1; i < GRID_DIVISION; i++) {
        // Each line is placed at exactly 'i' viewport width units
        const position = i; 

        createLine('v', position);
        createLine('h', position);
    }
}

function createLine(type, position) {
    const line = document.createElement('div');
    line.className = `guide-line guide-${type}`;
    
    if (type === 'v') {
        // Vertical lines move across the width in 1vw increments
        line.style.left = `${position}vw`;
    } else {
        // Horizontal lines move down in 1vw increments (matching the square cells)
        line.style.top = `${position}vw`;
    }
    
    document.body.appendChild(line);
}

function updateGridDivision() {
    // Check if screen is mobile (less than 768px wide)
    if (window.innerWidth < 768) {
        GRID_DIVISION = 50;
    } else {
        GRID_DIVISION = 100;
    }

    document.documentElement.style.setProperty('--grid-div', GRID_DIVISION);

    // If grid is currently visible, refresh the lines too
    if (showGrid) {
        toggleGridView();
        toggleGridView(); // Toggle off and on to redraw
    }
}

// Shortcut Listener
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'g') toggleGridView();
});
// Listen for window resize to change division
window.addEventListener('resize', updateGridDivision);
// Run once on load
updateGridDivision();