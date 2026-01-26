import './components/index.js'
const DESKTOPBASE_X = 100;
const DESTOPBASE_Y = 50;

const MOBILEBASE_X = 50;
const MOBILEBASE_Y = 50;

let GRID_X = DESKTOPBASE_X;
let GRID_Y = DESTOPBASE_Y;

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
let gridLabel = null;

function toggleGridView() {
    showGrid = !showGrid;
    
    // Manage the Label element
    if (!gridLabel) {
        gridLabel = document.createElement('div');
        gridLabel.className = 'grid-label';
        document.body.appendChild(gridLabel);
    }

    const existingLines = document.querySelectorAll('.guide-line');
    existingLines.forEach(line => line.remove());

    if (!showGrid) {
        gridLabel.style.display = 'none';
        document.removeEventListener('mousemove', updateGridLabel);
        return;
    }

    gridLabel.style.display = 'block';
    document.addEventListener('mousemove', updateGridLabel);

    // ... existing line creation logic ...
    const rootStyle = getComputedStyle(document.documentElement);
    const colCount = parseInt(rootStyle.getPropertyValue('--col-count')) || 100;
    const rowCount = parseInt(rootStyle.getPropertyValue('--row-count')) || 100;

    for (let i = 1; i < colCount; i++) createLine('v', i);
    for (let i = 1; i < rowCount; i++) createLine('h', i);
}

function createLine(type, position) {
    const line = document.createElement('div');
    line.className = `guide-line guide-${type}`;
    
    // Both use 'vw' to ensure the guides form perfect squares
    if (type === 'v') {
        line.style.left = `${position}vw`;
    } else {
        line.style.top = `${position}vw`;
    }
    
    document.body.appendChild(line);
}

function updateGridLabel(e) {
    const vwUnit = window.innerWidth / 100;
    
    // Use e.pageX and e.pageY to account for scrolling
    // This ensures the top-left of the actual document is always 0,0
    const x = Math.floor(e.pageX / vwUnit);
    const y = Math.floor(e.pageY / vwUnit);

    gridLabel.textContent = `X: ${x}, Y: ${y}`;

    // --- SMART POSITIONING LOGIC ---
    const labelRect = gridLabel.getBoundingClientRect();
    const padding = 15; 
    
    // For the VISUAL position of the label, we still use clientX/Y 
    // because the label itself is 'position: fixed'
    let posX = e.clientX + padding;
    let posY = e.clientY + padding;

    // Check Right Edge Collision
    if (posX + labelRect.width > window.innerWidth) {
        posX = e.clientX - labelRect.width - padding;
    }

    // Check Bottom Edge Collision
    if (posY + labelRect.height > window.innerHeight) {
        posY = e.clientY - labelRect.height - padding;
    }

    gridLabel.style.left = `${posX}px`;
    gridLabel.style.top = `${posY}px`;
}

function updateGridDivision() {
    // Check if screen is mobile (less than 768px wide)
    if (window.innerWidth < 768) {
        GRID_X = MOBILEBASE_X;
    } else {
        GRID_X = DESKTOPBASE_X;
    }

    document.documentElement.style.setProperty('--col-count', GRID_X);
    document.documentElement.style.setProperty('--row-count', GRID_Y);

    // If grid is currently visible, refresh the lines too
    if (showGrid) {
        toggleGridView();
        toggleGridView(); // Toggle off and on to redraw
    }
}

// Run once on load
updateGridDivision();
// Listen for window resize to change division
window.addEventListener('resize', updateGridDivision);
// Shortcut Listener
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'g') toggleGridView();
});