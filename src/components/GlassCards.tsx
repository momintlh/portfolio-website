import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  title: string;
  description: string;
  rotation: string;
  cardId: number;
}

function GlassCard({ title, description, rotation, cardId }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `card${cardId}`,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={` ${rotation} touch-none  rounded-2xl border-2 w-28 h-32 sm:w-32 sm:h-44 
      bg-white/5 backdrop-blur-[5px] border-white/15 hover:ring-2
       
       ${!isDragging
          ? "hover:-translate-y-4 transform transition-transform duration-200"
          : "duration-75"
        }`}
    >
      <h2 className="text-gray-50 text-center">{title}</h2>
      <p className="text-gray-300 text-sm text-center">{description}</p>
    </div>
  );
}

export default GlassCard;
