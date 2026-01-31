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

        // Lista de tentativas de sufixos em ordem de prioridade
        // 1. O número específico após o # (ex: _p1)
        // 2. Tentar como 'Parallel' se houver altNumber (_p)
        // 3. Tentar como 'Rare' se houver altNumber (_r)
        // 4. A versão normal (sem sufixo)
        const suffixAttempts = [];
        if (altNumber) {
            suffixAttempts.push(`_p${altNumber}`);
            suffixAttempts.push(`_r${altNumber}`);
        }
        suffixAttempts.push(""); // Versão normal sem sufixo

        // Loop de busca
        searchLoop: 
        for (let suffix of suffixAttempts) {
            let currentBase = `${OFFICIAL_ROOT}${productCode}${suffix}`;
            
            for (let ext of extensions) {
                const fullUrl = currentBase + ext;
                if (await imageExists(fullUrl)) {
                    foundUrl = getProxyUrl(fullUrl);
                    break searchLoop; // Encontrou? Para todos os loops desta linha
                }
            }
        }

        // Se encontrou a URL, adiciona a quantidade ao cardList
        if (foundUrl) {
            for (let i = 0; i < quantity; i++) {
                cardList.push(foundUrl);
            }
        }
    }
    return cardList;
}