import { Card } from '.'

function PreviewArea() {
  return (
    <div className="mx-auto grid h-auto w-full grid-cols-3 gap-2 rounded bg-[#1eff00] p-4 md:w-[50%] md:max-w-4xl">
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
