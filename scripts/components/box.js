export class CustomBox extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        const text = this.getAttribute('text') || "Unkown";
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    /* Define the default values here */
                    --bg-color: #f9f9f9;
                    --box-width: 150px;
                    --border-color: black;
                }

                .wrapper {
                    background-color: var(--bg-color);
                    width: var(--box-width);
                    border: 2px solid var(--border-color);                    
                    border-radius: 10px;
                    padding: 10px;
                }
            </style>
            <div class="wrapper">
                <h3>${text}</h3>
            </div>
        `;
    }
}

customElements.define('custom-box', CustomBox);