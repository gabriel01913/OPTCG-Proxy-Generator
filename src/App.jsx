import { LogoArea, InputArea, PreviewArea, SettingsArea } from './components'
import {parserDeck} from './services/parserDeck'
import {useState} from 'react'

function App() {
  const [cards, setCards] = useState([]);
  const [deckList, setDeckList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onPreview = async() =>{
    console.log("deck list " + deckList)
    if(!deckList) return
    setIsLoading(true);
    try{
      let cardlist = await parserDeck(deckList)
      setCards(cardlist)
      console.debug(cards)
    }catch(error){
      console.log("Error: " + error)
    }finally{
      setIsLoading(false)
    }
  }

  const onInputChange = (text) => {
    setDeckList(text)
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center font-inter text-[1rem] md:text-[2rem] lg:text-[1rem]">
        <div className='w-full h-auto flex items-center justify-center'>
          <LogoArea/>
        </div>
        <br />
        <div className="w-full h-auto flex flex-col items-start justify-center lg:flex-row gap-2 p-4 lg:gap-8">
          <div className='h-auto w-full lg:w-[18rem]'>
            <InputArea onTextChange={onInputChange}/>
          </div>
          <div className='h-auto w-full aspect-[210/297] lg:w-[40%] lg:max-w-xl'>
            <PreviewArea cardlist={cards}/>
          </div>
          <div className='h-auto w-full aspect-[349/242] lg:w-[17rem]'>
            <SettingsArea onPreviewClick={onPreview} isLoading={isLoading}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
