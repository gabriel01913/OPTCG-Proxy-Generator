import { Button, Inputs } from '.'
import lupaIcon from '../assets/lupa.png'
import downloadIcon from '../assets/download.png'

function click() {
  console.debug('click')
}

function SettingsArea() {
  return (
    <div className="md: flex h-auto w-[25%] w-full flex-col bg-yellow-400 md:flex-row">
      <div className="flex flex-col items-center gap-y-2">
        <strong>PDF Margins (mm)</strong>
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col">
            <label>Top:</label>
            <label>Bottom: </label>
            <label>Left: </label>
            <label>Right: </label>
          </div>
          <div className="flex flex-col">
            <Inputs type="number" defaultValue={10} />
            <Inputs type="number" defaultValue={10} />
            <Inputs type="number" defaultValue={10} />
            <Inputs type="number" defaultValue={10} />
          </div>
        </div>
        <Button text="Preview" icon={lupaIcon} onClick={click} />
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <strong>Card Gaps (mm)</strong>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <label>Gap X: </label>
            <label>Gap Y: </label>
          </div>
          <div className="flex flex-col">
            <Inputs type="number" defaultValue={0} />
            <Inputs type="number" defaultValue={0} />
          </div>
        </div>
        <Button text="Download" icon={downloadIcon} onClick={click} />
      </div>
    </div>
  )
}

export default SettingsArea
