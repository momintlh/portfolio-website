import { useDroppable } from "@dnd-kit/core";


function DropArea() {

    const { setNodeRef } = useDroppable({
        id: 'dropArea'
    })

    return (
        <div
            ref={setNodeRef}
            className="w-[120px] h-[160px] sm:w-[135px] sm:h-[180px] md:w-[150px] md:h-[200px] border-2 border-rose-50 border-dashed rounded-lg mx-auto mt-8 flex items-center justify-center">
            <p className="text-rose-50" > Drop card here </p>
        </div>
    )
}

export default DropArea;