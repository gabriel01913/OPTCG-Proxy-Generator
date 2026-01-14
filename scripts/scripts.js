/**@type button */
const PREVIEWBUTTON = document.getElementById("bt_preview")
PREVIEWBUTTON.addEventListener("click", Preview)

const DOWNLOADBUTTON = document.getElementById("bt_download")
DOWNLOADBUTTON.addEventListener("click", Download)

DOWNLOADBUTTON.disabled = true;

const TEXTAREA = document.getElementById("txarea_input")
const IMAGE = document.getElementById("img_preview")
const CONTAINER = document.getElementById("container_preview");

// Add this at the bottom of your scripts.js
const PADDING_INPUTS = ["pad_top", "pad_bot", "pad_left", "pad_right", "gap_x", "gap_y"];

PADDING_INPUTS.forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        // Only update if there is already content in the preview
        if (CONTAINER.innerHTML !== "") {
            Preview();
        }
    });
});

const CARDLIST = []

async function imageExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok; // Returns true if status is 200-299
    } catch (error) {
        console.debug(url)
        console.debug("dont find")
        return false; // Returns false if there's a network error or 404
    }
}

async function Preview() {
    // 1. Get the values from your new input fields
    const paddingTop = document.getElementById("pad_top").value + "mm";
    const paddingBottom = document.getElementById("pad_bot").value + "mm";
    const paddingLeft = document.getElementById("pad_left").value + "mm";
    const paddingRight = document.getElementById("pad_right").value + "mm";

    // 2. Apply them to the container's style
    CONTAINER.style.paddingTop = paddingTop;
    CONTAINER.style.paddingBottom = paddingBottom;
    CONTAINER.style.paddingLeft = paddingLeft;
    CONTAINER.style.paddingRight = paddingRight;

    CONTAINER.style.boxSizing = "border-box";

    // Get gap values
    const gapX = document.getElementById("gap_x").value + "mm";
    const gapY = document.getElementById("gap_y").value + "mm";

    // Apply gaps to the grid container
    CONTAINER.style.columnGap = gapX;
    CONTAINER.style.rowGap = gapY;

    CONTAINER.innerHTML = "";
    const content = TEXTAREA.value;
    const lines = content.split(/\r?\n|\r|\n/g);
    
    if (lines[0] === "") return;

    let countLine = 0;
    for (const line of lines) {
        if (!line.includes('x')) continue;

        // 1. Split quantity from the rest
        let [quantity, rest] = line.split('x');
        let productCode = "";
        let altNumber = "";
        let folder = "default";

        // 2. Check for optional Alternative Art (#)
        if (rest.includes('#')) {
            [productCode, altNumber] = rest.split('#');
            folder = "alt"; // Change folder to res/alt
        } else {
            productCode = rest;
        }

        let [set] = productCode.split("-");
        
        // 3. Construct Path
        // If alt: res/alt/OP01/OP01-001_1.png
        // If default: res/default/OP01/OP01-001.png
        let fileName = altNumber ? `${productCode.trim()}_${altNumber.trim()}` : productCode.trim();
        let path = `res/${folder}/${set}/${fileName}.png`;

        const exists = await imageExists(path);
        if (!exists) {
            console.error("File not found:", path);
            continue;
        }

        // 4. Create Elements
        for (let i = 0; i < parseInt(quantity); i++, countLine++) {
            if (countLine >= 9) {
                const lineBreak = document.createElement("hr");
                CONTAINER.appendChild(lineBreak);
                countLine = 0;
            }
            const newImg = document.createElement("img");
            newImg.src = path;
            newImg.className = "cardPreview";
            newImg.alt = productCode;
            CONTAINER.appendChild(newImg);
        }
    }
    DOWNLOADBUTTON.disabled = false;
}

function getBase64Image(img) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
    });
}

async function Download() {
    DOWNLOADBUTTON.disabled = true;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const images = document.querySelectorAll("#container_preview .cardPreview");
    
    // Grid settings
    const cardWidth = 63;  
    const cardHeight = 88; 
    const paddingTop = parseFloat(document.getElementById("pad_top").value) || 0;
    const paddingBottom = parseFloat(document.getElementById("pad_bot").value) || 0;
    const paddingLeft = parseFloat(document.getElementById("pad_left").value) || 0;
    const paddingRight = parseFloat(document.getElementById("pad_right").value) || 0;

    const gapX = parseFloat(document.getElementById("gap_x").value) || 0;
    const gapY = parseFloat(document.getElementById("gap_y").value) || 0;

    let x = paddingLeft; 
    let y = paddingTop;

    doc.setDrawColor(180); // Light gray so it's not too bold
    doc.setLineWidth(0.1);

    for (let i = 0; i < images.length; i++) {
        const imgData = await getBase64Image(images[i]);

        // Check if we need to wrap to the next line (Right Padding)
        if (x + cardWidth > (210 - paddingRight)) {
            x = paddingLeft;
            y += cardHeight + gapY;
        }

        // Check if we need a new page (Bottom Padding)
        if (y + cardHeight > (297 - paddingBottom)) {
            doc.addPage();
            x = paddingLeft;
            y = paddingTop;
        }

        // 1. Add the Card
        doc.addImage(imgData, 'PNG', x, y, cardWidth, cardHeight);

        // 2. Draw Cutting Guides (The "Connective" Lines)
        // Horizontal lines (Top and Bottom of this specific card)
        doc.line(x - 5, y, x + cardWidth + 5, y); 
        doc.line(x - 5, y + cardHeight, x + cardWidth + 5, y + cardHeight);

        // Vertical lines (Left and Right of this specific card)
        doc.line(x, y - 5, x, y + cardHeight + 5);
        doc.line(x + cardWidth, y - 5, x + cardWidth, y + cardHeight + 5);

        x += cardWidth + gapX;
    }

    doc.save("proxies_grid.pdf");
}