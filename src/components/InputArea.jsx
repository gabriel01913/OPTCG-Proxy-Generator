function InputArea() {
  return (
    <div className="h-full w-full items-stretch justify-center gap-4 bg-red-600 md:w-[25%]">
      <textarea className="w-[80%] resize-none rounded bg-[#FFFAFA80]">
        teste
      </textarea>
      <div className="w-[80%] rounded-lg border-l-[3px] bg-[#FFFAFA80] p-8 font-sans text-[13px] leading-relaxed text-[#333]">
        <h3>Instructions</h3>
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
