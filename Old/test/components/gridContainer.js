class GridContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
           :host {
                display: grid;
                grid-template-columns: repeat(100, 1fr);
                grid-template-rows: repeat(100, 1fr);
                grid-column: var(--x, auto) / span var(--width, 10);
                grid-row: var(--y, auto) / span var(--height, 10);
                background-color: var(--bg-color, aqua);
                width: 100%;
                height: 100%;
            }

            ::slotted(*){
                --x: auto;
                --y: auto;
                grid-column: var(--x, auto) / span var(--width, 100);
                grid-row: var(--y, auto) / span var(--height, 100);
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        </style>
        <slot></slot> 
        `;
    }
}
customElements.define('grid-container', GridContainer);