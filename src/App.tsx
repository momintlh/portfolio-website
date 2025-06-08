import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DropArea from "./components/DropArea";
import GlassCard from "./components/GlassCards";
import BackgroundCanvas from "./background";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";

function App() {

  const [items] = useState(['1', '2', '3']);

  function handleEndDrag(event: DragEndEvent) {
    const { over } = event;
    if (!over) return;

    console.log(`width: ${window.innerWidth}`);
    console.log(`height: ${window.innerHeight}`);
    

    console.log(over.id);
  }

  return (
    <>
      <BackgroundCanvas />
      <div className="flex flex-col justify-between items-center  border-rose-600 border-2 overflow-hidden w-screen h-screen">
        <DndContext onDragEnd={handleEndDrag}>
          <div className="flex justify-center items-center flex-grow">
            <div
              className="flex justify-center items-center w-[500px] h-[300px] rounded-xl text-center  bg-blue-500/5 backdrop-blur-[4px] border-blue-200/10 border-[3px] shadow-lg"
            >
              <h1 className="text-rose-50 text-2xl font-mono">
              </h1>
              <DropArea />
            </div>
          </div>

          <div className="flex justify-center items-center -translate-y-12">
            {/* <SortableContext items={items}> */}
              <GlassCard
                cardId={1}
                title="About"
                description="Who am I?"
                rotation="-rotate-[15deg] translate-x-2"
              />
              <GlassCard
                cardId={2}
                title="Projects"
                description="What do I do?"
                rotation="rotate-0 -translate-y-2"
              />
              <GlassCard
                cardId={3}
                title="Stuff"
                description="my yapping"
                rotation="rotate-[15deg] -translate-x-2"
              />
            {/* </SortableContext> */}
          </div>
        </DndContext>
      </div>
    </>

  );
}

export default App;
