import { useDraggable } from "@dnd-kit/core"
import { CSS } from '@dnd-kit/utilities'

interface CardProps {
  title: string
  description: string
  rotation: string
  cardId: number
}

function GlassCard({ title, description, rotation, cardId }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `card${cardId}`,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  // bg-gradient-to-br from-[#ffffff7F] to-transparent backdrop-blur-xl

  return (
    <div
      ref={setNodeRef} style={style} {...listeners} {...attributes}
      className={` ${rotation} touch-none  w-[120px] h-[160px] sm:w-[135px] sm:h-[180px] md:w-[150px] md:h-[200px] rounded-2xl
       
      
      bg-white/5 backdrop-blur-md border-white/15 shadow-sm hover:ring-2
       
       ${!isDragging ? "hover:-translate-y-14 transform transition-transform duration-200" : "duration-0"}`}
    >
      <h2 className="text-gray-50 text-center">{title}</h2>
      <p className="text-gray-300 text-sm text-center">{description}</p>
    </div>
  )
}

export default GlassCard