function Inputs({ type, defaultValue, className}) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      className={`text-center border border-black rounded-[4px] font-bold
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className}`}
    />
  )
}

export default Inputs
