import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  title: string;
  description: string;
  className: string | "";
  cardId: number;
}

function GlassCard({ title, description, cardId, className }: CardProps) {
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
      className={`${className} touch-none rounded-xl border-2 w-28 h-32 sm:w-32 sm:h-44    backdrop-blur-[5px] border-white/15 hover:ring-2
       ${
         !isDragging
           ? "hover:-translate-y-4 hover:rotate-0 transition-transform duration-200"
           : "duration-75"
       }`}
    >
      <div className="flex flex-col w-full h-full justify-around items-center">
        <h2 className="text-white text-lg text-center underline">
          {title}
        </h2>
        <p className="text-gray-300 text-sm text-left line-clamp-3 border-2 italic">
          {description}
        </p>
      </div>
    </div>
  );
}

export default GlassCard;
