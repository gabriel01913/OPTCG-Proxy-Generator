import { LogoArea, InputArea, PreviewArea, SettingsArea } from './components'

function App() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center font-inter">
        <LogoArea />
        <br />
        <div className="flex h-full w-full flex-col items-start justify-center md:flex-row gap-2 p-4">
          <div></div>
          <PreviewArea />
          <SettingsArea />
          {/*<InputArea />*/}
        </div>
      </div>
    </>
  )
}

export default App
