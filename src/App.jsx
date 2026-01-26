import { LogoArea, InputArea, PreviewArea, SettingsArea } from './components'

function App() {

  return (
    <>
    <div className='
        flex
        flex-col
        items-center
        justify-center
    
    '>
        <LogoArea/>
        <br/>
        <div className='
            flex
            flex-col
            md:flex-row
            justify-center
            w-full
            h-full
            bg-black
            '>
            <InputArea/>
            <PreviewArea/>
            <SettingsArea/>
        </div>
    </div>
    </>
  )
}

export default App
