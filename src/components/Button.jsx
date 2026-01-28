function Button({ text, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-row items-center justify-center uppercase
      gap-3 rounded-[12px] bg-[#B56526] p-2 
      font-bold text-white transition-opacity 
      hover:bg-[#f58632]
      border-2 border-[#00000069] shadow-md shadow-[#00000069]"
    >
      <img src={icon} className="h-6 w-6 object-contain" alt="" />
      <span className="flex-1 text-center">{text}</span>
    </button>
  )
}

export default Button
