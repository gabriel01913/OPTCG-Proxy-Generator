function SettingsArea(){
    return(
        <div className='
            bg-yellow-400
            grid 
            grid-cols-2
        '>
            <div className='flex flex-col'>
                <strong>PDF Margins (mm)</strong>
                <label>Top: <input type="number" value="10"/></label>
                <label>Bottom: <input type="number" value="10"/></label>
                <label>Left: <input type="number" value="10"/></label>
                <label>Right: <input type="number" value="10"/></label>
            </div>
            <div className='flex flex-col'>
                <strong>Card Gaps (mm)</strong>
                <label>Gap X: <input type="number" value="0"/></label>
                <label>Gap Y: <input type="number" value="0"/></label>
            </div>
            <div className='flex flex-row'>
                <button>Preview</button>
                <button>Download</button>
            </div>
        </div>
    );
}

export default SettingsArea