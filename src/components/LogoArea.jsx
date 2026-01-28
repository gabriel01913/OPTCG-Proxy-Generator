import logo from '../assets/logo.png'

function LogoArea() {
  return (
    <div className="flex w-full items-center justify-center">
      <img src={logo} className="h-16 md:h-24 lg:h-32"></img>
    </div>
  )
}

export default LogoArea
