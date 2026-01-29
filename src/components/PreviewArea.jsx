import { Card } from '.'

function PreviewArea() {
  return (
    <div className="h-auto w-full aspect-[210/297]
    grid grid-cols-3 p-2
    rounded-[12px] border-[5px] border-[#B56526D9] bg-[#767676C9]
    md:w-[40%] md:max-w-4xl">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default PreviewArea
