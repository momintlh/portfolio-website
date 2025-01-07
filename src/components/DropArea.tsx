import { useDroppable } from "@dnd-kit/core";

function DropArea() {

    const { isOver, setNodeRef } = useDroppable({
        id: 'dropArea'
    })
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            className={`${style} w-[120px] h-[160px] sm:w-[135px] sm:h-[180px] md:w-[150px] md:h-[200px] border-2 border-rose-50 border-dashed rounded-lg mx-auto mt-8 flex items-center justify-center`}>
            <p className="text-rose-50" > Drop card here </p>
        </div>
    )
}

export default DropArea;