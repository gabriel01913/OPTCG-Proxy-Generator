function Button({ text, icon, onClick, disabled = false, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled = {disabled}
      className={`flex flex-row items-center justify-center uppercase
      gap-3 rounded-[5px] bg-[#B56526] p-2 
      buttonFont transition-opacity 
      ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#f58632]"}
      border-2 border-[#00000069] shadow-md shadow-[#00000069] ${className}`}
    >
      {icon && ( <img src={icon} className="h-auto w-[1em] md:[2em] aspect-square object-contain" alt=""/>)}
      <span>{text}</span>
    </button>
  )
}

export default Button
