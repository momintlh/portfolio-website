import { DndContext, DragEndEvent } from "@dnd-kit/core"
import Card from "./components/Card"
import DropArea from "./components/DropArea"
import { useState } from "react"

function App() {
  const [droppedCard, setDroppedCard] = useState<number | null>(null);

  function handleEndDrag(event: DragEndEvent) {
    const { over, active } = event;
    if (!over || over.id !== 'dropArea') return;

    const cardId = parseInt(String(active.id).replace('card', ''));
    setDroppedCard(cardId);
  }

  function handleReturnCard() {
    setDroppedCard(null);
  }

  // Create an object to store card data for easy lookup
  const cardData = {
    1: { title: "About", description: "Who am I?", rotation: "-rotate-[15deg] translate-x-4" },
    2: { title: "Work", description: "What do I do?", rotation: "rotate-0 -translate-y-4" },
    3: { title: "Stuff", description: "my yapping", rotation: "rotate-[15deg] -translate-x-4" }
  };

  return (
    <div className="flex flex-col justify-between items-center border-rose-600 border-2 overflow-hidden w-screen h-screen">
      <DndContext onDragEnd={handleEndDrag}>
        <div className="flex justify-center items-center flex-grow">
          <div className="w-[500px] h-[300px] bg-rose-950 rounded-xl text-center">
            <h1 className="text-rose-50 text-2xl font-mono">Place you card here</h1>
            <DropArea 
              droppedCard={droppedCard ? cardData[droppedCard as keyof typeof cardData] : null} 
              onReturnCard={handleReturnCard}
            />
          </div>
        </div>  

        <div className="flex justify-center items-end border-white border-2 translate-y-20">
          {droppedCard !== 1 && <Card cardId={1} {...cardData[1]} />}
          {droppedCard !== 2 && <Card cardId={2} {...cardData[2]} />}
          {droppedCard !== 3 && <Card cardId={3} {...cardData[3]} />}
        </div>
      </DndContext>
    </div>
  )
}

export default App