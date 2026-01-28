import { LogoArea, InputArea, PreviewArea, SettingsArea } from './components'

function App() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <LogoArea />
        <br />
        <div className="flex h-full w-full flex-col items-start justify-center md:flex-row">
          <InputArea />
          <PreviewArea />
          <SettingsArea />
        </div>
      </div>
    </>
  )
}

export default App
