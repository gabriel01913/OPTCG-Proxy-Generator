function InputArea(){
    return(
        <div className='
            flex
            flex-col
            items-center
            justify-center
            h-full            
            gap-4
            bg-red-600'>
            <textarea className='                
                resize-none
                bg-[#FFFAFA80]
                rounded
                p-8
                '>
                1xOP01-001
                1xOP01-001#01
            </textarea>
            <div className='
                bg-[#FFFAFA80]
                p-8
                rounded-lg
                font-sans
                text-[13px]
                leading-relaxed
                text-[#333]
                border-l-[3px]
                '>
                <h3>Instructions</h3>
                <p><strong>Pattern:</strong><br/>1xOP01-001</p>
                <p><code>[Quantity]x[SET]-[Number]</code></p>                
                <p><strong>Alt Arts:</strong><br/>Add <code >#[Number]</code> at the end:</p>
                <p><code>1xOP01-001#1</code></p>                
                <p>Use the preview to check if it is the correct art before downloading the PDF.</p>
            </div>
        </div>
    );
}

export default InputArea