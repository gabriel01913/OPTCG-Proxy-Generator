function Button({ text, icon, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row items-center justify-center uppercase
      gap-3 rounded-[5px] bg-[#B56526] p-2 
      font-bold text-white transition-opacity 
      hover:bg-[#f58632]
      border-2 border-[#00000069] shadow-md shadow-[#00000069] ${className}`}
    >
      <img src={icon} className="h-auto w-[1em] md:[2em] aspect-square object-contain" alt=""/>
      <span className="text-center text-[1em] md:[2em]">{text}</span>
    </button>
  )
}

export default Button
