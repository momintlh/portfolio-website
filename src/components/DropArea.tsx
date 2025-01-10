import { useDroppable } from "@dnd-kit/core";

interface DropAreaProps {
  droppedCard: { title: string; description: string; rotation: string } | null;
  onReturnCard: () => void;
}

function DropArea({ droppedCard, onReturnCard }: DropAreaProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'dropArea'
    });
    
    return (
        <div
            ref={setNodeRef}
            className={`w-[120px] h-[160px] sm:w-[135px] sm:h-[180px] md:w-[150px] md:h-[200px] 
            border-2 ${isOver ? 'border-green-300 bg-green-900/30' : 'border-green-500'} 
            border-dashed rounded-lg mx-auto mt-8 
            flex items-center justify-center transition-colors duration-200`}
        >
            {droppedCard ? (
                <div 
                    onClick={onReturnCard}
                    className="w-full h-full bg-gray-100 p-4 border-black border-4 rounded-lg cursor-pointer
                    hover:bg-gray-200 transition-colors duration-200"
                >
                    <h2 className="text-pink-800 text-center">{droppedCard.title}</h2>
                    <p className="text-pink-400 text-sm text-center">{droppedCard.description}</p>
                </div>
            ) : (
                <p className="text-rose-50">{isOver ? 'Release to drop' : 'Drop card here'}</p>
            )}
        </div>
    )
}

export default DropArea;