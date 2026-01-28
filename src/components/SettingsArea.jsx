import { Button, Inputs } from '.'
import lupaIcon from '../assets/lupa.png'
import downloadIcon from '../assets/download.png'

function click() {
  console.debug('click')
}

const SETTINGS_COLUM = "flex h-fit w-full flex-col items-center gap-y-2"
const SETTIGS_SPACE = "flex flex-col gap-y-3"

function SettingsArea() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 bg-[#FFFAFA80] border-2 border-[#767676] md:w-[25%] rounded-lg shadow-lg shadow-[#000000a8]">
      <div className="flex flex-col gap-y-2 md:flex-row">
        <div className={`${SETTINGS_COLUM}`}>
          <strong>PDF Margins (mm)</strong>
          <div className="flex flex-row gap-x-4">
            <div className={`${SETTIGS_SPACE}`}>
              <label className='uppercase font-bold'>Top:</label>
              <label className='uppercase font-bold'>Bottom: </label>
              <label className='uppercase font-bold'>Left: </label>
              <label className='uppercase font-bold'>Right: </label>
            </div>
            <div className={`${SETTIGS_SPACE}`}>
              <Inputs type="number" defaultValue={10} />
              <Inputs type="number" defaultValue={10} />
              <Inputs type="number" defaultValue={10} />
              <Inputs type="number" defaultValue={10} />
            </div>
          </div>
        </div>
        <div className={`${SETTINGS_COLUM}`}>
          <strong>Card Gaps (mm)</strong>
          <div className="grid grid-cols-2">
            <div className="grid grid-rows-2 gap-2">
              <label className='uppercase font-bold'>Gap X: </label>
              <label className='uppercase font-bold'>Gap Y: </label>
            </div>
            <div className="grid grid-rows-2 gap-2">
              <Inputs type="number" defaultValue={0} />
              <Inputs type="number" defaultValue={0} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-rows-2 gap-2 mt-auto md:grid-rows-none md:grid-cols-2">
        <Button text="Preview" icon={lupaIcon} onClick={click} />
        <Button text="Download" icon={downloadIcon} onClick={click} />
      </div>
    </div>
  )
}

export default SettingsArea
