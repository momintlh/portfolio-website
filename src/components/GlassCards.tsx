import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

interface CardProps {
  title: string;
  description: string;
  className?: string;
  cardId: number;
  imageSrc?: string;
  projectUrl?: string;
}

export default function GlassCard({
  title,
  description,
  cardId,
  className = "",
  imageSrc,
  projectUrl,
}: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `card${cardId}`,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only handle click if not dragging
    if (!isDragging) {
      // Stop the event from triggering drag events
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onMouseUp={handleClick}
        className={`relative touch-none rounded-xl border-2 w-32 h-44 backdrop-blur-[5px] border-white/15 hover:ring-2 transition-transform duration-200 cursor-pointer ${
          className
        } ${isDragging ? "opacity-90 shadow-lg" : "hover:-translate-y-2"}`}
      >
        {imageSrc && (
          <div className="p-1">
            {imageSrc.includes('youtube.com') || imageSrc.includes('youtu.be') ? (
              <div className="relative">
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeVideoId(imageSrc)}/mqdefault.jpg`}
                  alt={title}
                  className="rounded-md border-b-2 border-white/15 border-2 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={imageSrc}
                alt={title}
                className="rounded-md border-b-2 border-white/15 border-2 w-full object-cover"
              />
            )}
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-white text-sm font-semibold text-center">
            {title}
          </h2>
          <p className="text-gray-300 text-xs text-center line-clamp-3 italic">
            {description}
          </p>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        imageSrc={imageSrc}
        projectUrl={projectUrl}
      />
    </>
  );
}
