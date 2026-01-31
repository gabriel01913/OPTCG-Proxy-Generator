import {jsPDF} from "jspdf"

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

export async function generatePDF(urlList, configs) {
    const doc = new jsPDF();
    
    // Grid settings
    const cardWidth = 63;  
    const cardHeight = 88; 
    const paddingTop = configs.top || 0;
    const paddingLeft = configs.left || 0;
    const paddingRight = configs.right || 0;
    const paddingBottom = configs.bottom || 0;

    const gapX = configs.gapX || 0;
    const gapY = configs.gapY || 0;

    let x = paddingLeft; 
    let y = paddingTop;

    doc.setDrawColor(180); // Light gray so it's not too bold
    doc.setLineWidth(0.1);

    for (let i = 0; i < urlList.length; i++) {
        const imgData = await getBase64Image(urlList[i]);

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