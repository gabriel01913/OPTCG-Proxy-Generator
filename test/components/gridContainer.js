class GridContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                /* 1. Base Variables */
                --x: auto;
                --y: auto;
                --width: 5;
                --height: 5;
                --bg-color: aqua;

                /* 2. Positioning within the parent grid */
                /* We use the width variable directly against the parent's 64-column internal grid */
                grid-column: var(--x) / span var(--width);
                grid-row: var(--y) / span var(--height);

                /* 3. Setup this element's internal grid for ITS children */
                display: grid;
                grid-template-columns: repeat(100, 1fr);
                grid-template-rows: repeat(100, 1fr);
                
                /* This prevents children from stacking on top of each other */
                grid-auto-flow: row; 

                background-color: var(--bg-color);
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }

            /* This ensures any grid-container inside the slot respects the 64-unit system */
            ::slotted(grid-container) {
                display: grid;
            }
        </style>
        <slot></slot> 
        `;
    }
}
customElements.define('grid-container', GridContainer);