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
    console.debug(configs)
    const doc = new jsPDF();
    
    const cardWidth = 63;  
    const cardHeight = 88; 
    const pageWidth = 210;
    const pageHeight = 297;

    const top = parseFloat(configs.top) || 0;
    const bottom = parseFloat(configs.bottom) || 0;
    const left = parseFloat(configs.left) || 0; 
    const right = parseFloat(configs.right) || 0;
    const gapX = parseFloat(configs.gapX) || 0;
    const gapY = parseFloat(configs.gapY) || 0;

    let x = left; 
    let y = top;

    for (let i = 0; i < urlList.length; i++) {
        const imgData = await getBase64Image(urlList[i]);

        // 1. VERIFICAÇÃO DE QUEBRA DE LINHA (Horizontal)
        // Se a carta atual + largura não couber na linha considerando o padding da direita
        if (x + cardWidth > (pageWidth - right)) {
            x = left; // Volta para o início da linha
            y += cardHeight + gapY; // Pula para a próxima linha
        }

        // 2. VERIFICAÇÃO DE QUEBRA DE PÁGINA (Vertical)
        // Se a nova linha ultrapassar o limite do padding inferior
        if (y + cardHeight > (pageHeight - bottom)) {
            doc.addPage();
            x = left;
            y = top;
        }

        // 3. DESENHA A CARTA
        doc.addImage(imgData, 'PNG', x, y, cardWidth, cardHeight);

        // 4. DESENHA GUIAS DE CORTE
        doc.setDrawColor(180);
        doc.setLineWidth(0.1);
        doc.line(x - 2, y, x + cardWidth + 2, y); // Horizontal Topo
        doc.line(x - 2, y + cardHeight, x + cardWidth + 2, y + cardHeight); // Horizontal Base
        doc.line(x, y - 2, x, y + cardHeight + 2); // Vertical Esquerda
        doc.line(x + cardWidth, y - 2, x + cardWidth, y + cardHeight + 2); // Vertical Direita

        // 5. PREPARA A PRÓXIMA POSIÇÃO
        x += cardWidth + gapX;
    }

    doc.save("proxies_grid.pdf");
}