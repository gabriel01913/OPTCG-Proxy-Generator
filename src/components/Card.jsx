import card from '../assets/proxy.png'

function Card({imageUrl}) {
  console.log(imageUrl)
  if(!imageUrl) imageUrl = card
  return <img className="h-auto w-full aspect[600/838] rounded-lg" src={imageUrl}></img>
}

export default Card
