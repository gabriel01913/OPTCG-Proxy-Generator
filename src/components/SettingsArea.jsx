import { Button, Inputs } from '.'
import lupaIcon from '../assets/lupa.png'
import downloadIcon from '../assets/download.png'

function click() {
  console.debug('click')
}

const SETTINGS_COLUM = "flex h-fit w-full flex-col items-center gap-y-2"
const SETTIGS_SPACE = "flex flex-col gap-y-3"
const INPUT_STYLE = "w-[10em] h-auto md:w-[4em]"
const BUTTON_STYLE = "w-full h-auto"

function SettingsArea() {
  return (
    <div className="flex h-auto w-full flex-col justify-between 
    gap-4 bg-[#FFFAFA80] border-2 border-[#767676] rounded-lg shadow-lg shadow-[#000000a8] p-4 text-[1.5rem]
    md:text-[0.8em]">
      <div className="flex flex-col gap-y-2 md:flex-row">
        <div className={`${SETTINGS_COLUM}`}>
          <label className='font-bold'>PDF Margins (mm)</label>
          <div className="flex flex-row gap-x-4">
            <div className={`${SETTIGS_SPACE}`}>
              <label className='uppercase font-bold'>Top:</label>
              <label className='uppercase font-bold'>Bottom: </label>
              <label className='uppercase font-bold'>Left: </label>
              <label className='uppercase font-bold'>Right: </label>
            </div>
            <div className={`${SETTIGS_SPACE}`}>
              <Inputs type="number" defaultValue={10} className={INPUT_STYLE}/>
              <Inputs type="number" defaultValue={10} className={INPUT_STYLE}/>
              <Inputs type="number" defaultValue={10} className={INPUT_STYLE}/>
              <Inputs type="number" defaultValue={10} className={INPUT_STYLE}/>
            </div>
          </div>
        </div>
        <div className={`${SETTINGS_COLUM}`}>
          <label className='font-bold'>Card Gaps (mm)</label>
          <div className="grid grid-cols-[auto_1fr] gap-x-8 md:gap-x-2">
            <div className="grid grid-rows-2 gap-2">
              <label className='uppercase font-bold'>Gap X: </label>
              <label className='uppercase font-bold'>Gap Y: </label>
            </div>
            <div className="grid grid-rows-2 gap-2">
              <Inputs type="number" defaultValue={0} className={INPUT_STYLE}/>
              <Inputs type="number" defaultValue={0} className={INPUT_STYLE}/>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-rows-2 gap-2 mt-auto md:grid-rows-none md:grid-cols-2">
        <Button className={BUTTON_STYLE} text="Preview" icon={lupaIcon} onClick={click} />
        <Button className={BUTTON_STYLE} text="Download" icon={downloadIcon} onClick={click} />
      </div>          
    </div>
  )
}

export default SettingsArea
