import { useDraggable } from "@dnd-kit/core"
import { CSS } from '@dnd-kit/utilities'

interface CardProps {
  title: string
  description: string
  rotation: string
  cardId: number
}

function Card({ title, description, rotation, cardId }: CardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `card${cardId}`
  })

  const style = {
    transform: CSS.Translate.toString(transform)
  }

  return (
    <div
      ref={setNodeRef} style={style} {...listeners} {...attributes}
      className={`w-[120px] h-[160px] sm:w-[135px] sm:h-[180px] md:w-[150px] md:h-[200px] cursor-pointer select-none bg-gray-100 p-4 border-black border-4 rounded-lg ${rotation} hover:-translate-y-10 transform transition duration-200 ease-in-out`}>
      <h2 className="text-pink-800 text-center">{title}</h2>
      <p className="text-pink-400 text-sm text-center">{description}</p>
    </div>
  )
}

export default Card