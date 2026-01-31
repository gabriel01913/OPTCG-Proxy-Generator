function Inputs({ type, defaultValue, prop, className, onChange}) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      onChange={ (e) => onChange(prop, e.target.value)}
      className={`text-center border border-black rounded-[4px] font-bold
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className}`}
    />
  )
}

export default Inputs
