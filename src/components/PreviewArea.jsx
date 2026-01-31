import { Card } from '.'
import {Button} from '.'

function PreviewArea({cardlist = [], currentPage, totalPages, onNextPage, onPreviousPage}) {
  const startIndex = (currentPage - 1) * 9;

  const displayCards = Array.from({ length: 9 }, (_, index) => {
    // Retorna a carta da lista se existir, ou null para o slot vazio
    return cardlist[startIndex + index] || null;
  });

  const BUTTON_STYLE = "text-[0.8em]"

  return (
    <div className='flex flex-col gap-2'>
      <div className="grid grid-cols-3 p-2
      rounded-[12px] border-[5px] border-[#B56526D9] bg-[#767676C9]">
        {displayCards.map((card, index) => (
          <Card
            key={`empty-${index}`}
            imageUrl={card} // Passa a URL se houver, ou undefined
          />
        ))}
      </div>
      <div className='flex flex-row items-center justify-center buttonFont text-[1.5em] gap-4'>
        <Button className={BUTTON_STYLE} text={"<"} onClick={onPreviousPage}/>
        <p>{`Page ${currentPage} of ${totalPages}`}</p>
        <Button className={BUTTON_STYLE} text={">"} onClick={onNextPage}/>
      </div>
    </div>    
  )
}

export default PreviewArea
