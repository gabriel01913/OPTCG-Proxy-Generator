class GridContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                grid-column: var(--x, auto) / span var(--width, 10);
                grid-row: var(--y, auto) / span var(--height, 10);

                display: grid;
                grid-template-columns: repeat(100, 1fr);
                grid-template-rows: repeat(100, 1fr);
                
                /* This ensures a nested child with height 50 is half the width of its parent */
                aspect-ratio: 1 / 1; 
                
                background-color: var(--bg-color, aqua);
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }

            ::slotted(grid-container) {
                --x: auto;
                --y: auto;
            }
        </style>
        <slot></slot> 
        `;
    }
}
customElements.define('grid-container', GridContainer);