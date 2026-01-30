function InputArea() {
  return (
    <div className="h-full w-full items-start justify-center text-[1.5rem] md:text-[1rem]">
      <textarea
        className="h-auto min-h-[32rem] md:min-h-[13rem] w-full resize-none rounded bg-[#FFFAFA80] p-4 font-mono leading-tight"
        defaultValue={'Insert the deck list here'}
      ></textarea>
      <div className="h-auto w-full rounded-lg bg-[#FFFAFA80] p-8 font-sans leading-relaxed text-[#333] md:text-[0.8em]">
        <h3 className="font-extrabold">Instructions</h3>
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
