const OFFICIAL_ROOT = 'https://en.onepiece-cardgame.com/images/cardlist/card/';
const PROXY = "https://corsproxy.io/?url=";

function getProxyUrl(originalUrl){
    return `https://images.weserv.nl/?url=${originalUrl.replace('https://', '')}`
}

// Função auxiliar para verificar se a imagem existe (sua lógica antiga)
async function imageExists(url) {
    const proxiedUrl = getProxyUrl(url);
    try {
        const response = await fetch(proxiedUrl, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

export async function parserDeck(textAreaValue) {
    const lines = textAreaValue.split(/\r?\n/);
    const cardList = [];
    const extensions = [".png", ".jpg"];

    for (const line of lines) {
        if (!line.includes('x')) continue;

        let [quantityStr, rest] = line.split('x');
        let quantity = parseInt(quantityStr.trim()) || 1;
        let [productCode, altNumber] = rest.includes('#') ? rest.split('#') : [rest, ""];
        
        productCode = productCode.trim();
        altNumber = altNumber ? altNumber.trim() : "";

        let foundUrl = "";
        let primaryBase = `${OFFICIAL_ROOT}${productCode}${altNumber ? `_p${altNumber}` : ""}`;
        for (let ext of extensions) {
            if (await imageExists(primaryBase + ext)) {
                foundUrl = getProxyUrl(primaryBase + ext);
                break;
            }
        }

        if (!foundUrl) {
            let fallback = altNumber ? `${OFFICIAL_ROOT}${productCode}_r${altNumber}.png` : `${OFFICIAL_ROOT}${productCode}_p1.png`;
            if (await imageExists(fallback)) foundUrl = getProxyUrl(fallback);
        }

        if (foundUrl) {
            for (let i = 0; i < quantity; i++) {
                console.log("Found url " + foundUrl)
                cardList.push(foundUrl);
            }
        }
    }
    console.log("card list")
    console.log(cardList)
    return cardList;
}