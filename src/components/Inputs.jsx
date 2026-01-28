function Inputs({ type, defaultValue, visible = true }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      className="w-[60%] h-full text-center text-[15px] border border-black rounded-[4px] font-bold
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  )
}

export default Inputs
