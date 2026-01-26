import { Card } from '.'

function PreviewArea(){
    return(
        <div className='
        grid 
        grid-cols-3
        bg-[#1eff00]
        rounded
        gap-2
        p-4
        '>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    );
}

export default PreviewArea