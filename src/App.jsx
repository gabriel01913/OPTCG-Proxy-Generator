import { LogoArea, InputArea, PreviewArea, SettingsArea } from './components'

function App() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center font-inter">
        <div className='w-full h-auto flex items-center justify-center'>
          <LogoArea/>
        </div>
        <br />
        <div className="w-full h-auto flex flex-col items-start justify-center md:flex-row gap-2 p-4">
          <div className='h-auto w-full md:w-[18rem]'>
            <InputArea />
          </div>
          <div className='h-auto w-full aspect-[210/297] md:w-[40%] md:max-w-xl'>
            <PreviewArea />
          </div>
          <div className='h-auto w-full aspect-[349/242] md:w-[17rem]'>
            <SettingsArea />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
