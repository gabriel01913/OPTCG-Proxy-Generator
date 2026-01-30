import { Card } from '.'

function PreviewArea({cardlist = []}) {
  // Criamos um array de 9 posições
  const displayCards = Array.from({ length: 9 }, (_, index) => {
    // Retorna a carta da lista se existir, ou null para o slot vazio
    return cardlist[index] || null;
  });

  console.log(displayCards)

  return (
    <div className="grid grid-cols-3 p-2
    rounded-[12px] border-[5px] border-[#B56526D9] bg-[#767676C9]">
      {displayCards.map((card, index) => (
        <Card
          key={`empty-${index}`}
          imageUrl={card} // Passa a URL se houver, ou undefined
        />
      ))}
    </div>
  )
}

export default PreviewArea
