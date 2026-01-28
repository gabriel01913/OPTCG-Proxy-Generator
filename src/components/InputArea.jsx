function InputArea() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 bg-red-600 md:w-[25%]">
      <textarea
        className="aspect-square h-auto min-h-60 w-[80%] resize-none rounded bg-[#FFFAFA80] p-4 font-mono leading-tight"
        defaultValue={'Insert the deck list here'}
      ></textarea>
      <div className="w-[80%] rounded-lg bg-[#FFFAFA80] p-8 font-sans text-[13px] leading-relaxed text-[#333]">
        <h3 className="text-lg font-extrabold">Instructions</h3>
        <p>
          <strong>Pattern:</strong>
          <br />
          1xOP01-001
        </p>
        <p>
          <code>[Quantity]x[SET]-[Number]</code>
        </p>
        <p>
          <strong>Alt Arts:</strong>
          <br />
          Add <code>#[Number]</code> at the end:
        </p>
        <p>
          <code>1xOP01-001#1</code>
        </p>
        <p>
          Use the preview to check if it is the correct art before downloading
          the PDF.
        </p>
      </div>
    </div>
  )
}

export default InputArea
