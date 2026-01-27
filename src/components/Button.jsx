function Button({ text, icon, onClick }) {
  return (
    <div className="flex flex-row items-center justify-center gap-5 rounded bg-[#B56526] p-2 font-bold text-white hover:opacity-90">
      <img src={icon} className="h-auto w-6"></img>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button
