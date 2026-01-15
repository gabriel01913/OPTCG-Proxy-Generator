/**@type button */
//Change this for website
const ROOT = 'https://en.onepiece-cardgame.com/images/cardlist/card'

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

document.getElementById("chk_official").addEventListener("change", Preview);
const PROXY = "https://corsproxy.io/?url=";

const CARDLIST = []

async function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

async function Preview() {
    PREVIEWBUTTON.disabled = true;
    DOWNLOADBUTTON.disabled = true;
    // Apply Styles (Padding/Gaps)
    CONTAINER.style.paddingTop = document.getElementById("pad_top").value + "mm";
    CONTAINER.style.paddingBottom = document.getElementById("pad_bot").value + "mm";
    CONTAINER.style.paddingLeft = document.getElementById("pad_left").value + "mm";
    CONTAINER.style.paddingRight = document.getElementById("pad_right").value + "mm";
    CONTAINER.style.columnGap = document.getElementById("gap_x").value + "mm";
    CONTAINER.style.rowGap = document.getElementById("gap_y").value + "mm";

    const useOfficial = document.getElementById("chk_official").checked;
    CONTAINER.innerHTML = "";
    const lines = TEXTAREA.value.split(/\r?\n|\r|\n/g);
    
    if (!lines[0]) return;

    let countLine = 0;
    const extensions = [".png", ".jpg"]; // Systematic check for both formats

    for (const line of lines) {
        if (!line.includes('x')) continue;

        let [quantityStr, rest] = line.split('x');
        let quantity = parseInt(quantityStr.trim()) || 1;
        let [productCode, altNumber] = rest.includes('#') ? rest.split('#') : [rest, ""];
        
        productCode = productCode.trim();
        altNumber = altNumber ? altNumber.trim() : "";
        let [set] = productCode.split("-");
        let finalPath = "";

        // Helper to try .png then .jpg
        const findValidPath = async (basePath) => {
            for (let ext of extensions) {
                let testPath = basePath + ext;
                if (await imageExists(testPath)) return testPath;
            }
            return null;
        };

        if (useOfficial) {
            // --- OFFICIAL LOGIC ---
            let primaryBase = `https://en.onepiece-cardgame.com/images/cardlist/card/${productCode}${altNumber ? `_p${altNumber}` : ""}`;
            let result = await findValidPath(primaryBase);

            if (!result) {
                // Fallback: try _p1 for standard or _r1 for alts
                let fallbackBase = altNumber ? 
                    `https://en.onepiece-cardgame.com/images/cardlist/card/${productCode}_r${altNumber}` : 
                    `https://en.onepiece-cardgame.com/images/cardlist/card/${productCode}_p1`;
                result = await findValidPath(fallbackBase);
            }

            // If found, wrap it in the PROXY so the PDF download doesn't crash
            if (result) finalPath = PROXY + encodeURIComponent(result);

        } else {
            // --- LOCAL LOGIC ---
            let folder = altNumber ? "alt" : "default";
            let fileName = altNumber ? `${productCode}_p${altNumber}` : productCode;
            let localBase = `res/${folder}/${set}/${fileName}`;
            finalPath = await findValidPath(localBase);
        }

        if (finalPath) {
            for (let i = 0; i < quantity; i++) {
                if (countLine > 0 && countLine % 9 === 0) {
                    const lineBreak = document.createElement("hr");
                    lineBreak.style.width = "100%";
                    CONTAINER.appendChild(lineBreak);
                }

                const newImg = document.createElement("img");
                newImg.src = finalPath;
                newImg.className = "cardPreview";
                // CRITICAL: Must be set BEFORE .src if using proxy for canvas/PDF
                newImg.crossOrigin = "anonymous"; 
                
                CONTAINER.appendChild(newImg);
                countLine++;
            }
        }
    }
    DOWNLOADBUTTON.disabled = CONTAINER.innerHTML === "";
    PREVIEWBUTTON.disabled = false;
}

function getBase64Image(imgUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        // Allow cross-origin requests for the official site
        img.setAttribute('crossOrigin', 'anonymous'); 
        img.src = imgUrl;
        
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = (e) => reject(new Error(`Failed to load image: ${imgUrl}`));
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