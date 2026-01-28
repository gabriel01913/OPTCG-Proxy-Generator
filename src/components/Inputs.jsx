function Inputs({ type, defaultValue, visible = true }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      className="w-[60%] h-full text-center text-[15px] border border-black rounded-sm font-bold"
    />
  )
}

export default Inputs
