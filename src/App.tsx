import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Card from "./components/Card";
import DropArea from "./components/DropArea";
import GlassCard from "./components/GlassCards";
import BackgroundCanvas from "./background";

function App() {
  // const [card, setCard] = useState(false)

  function handleEndDrag(event: DragEndEvent) {
    const { over } = event;
    if (!over) return;

    console.log(over.id);
    // setCard(true)
  }

  return (
    <div className="flex flex-col justify-between items-center  border-rose-600 border-2 overflow-hidden w-screen h-screen">
      <BackgroundCanvas />

      <DndContext onDragEnd={handleEndDrag}>
        <div className="flex justify-center items-center flex-grow">
          <div
            className="w-[500px] h-[300px] bg-rose-950 rounded-xl text-center  bg-black/10 backdrop-blur-[8px] border-white/15 
          border-2 shadow-sm"
          >
            <h1 className="text-rose-50 text-2xl font-mono">
              Place you card here
            </h1>
            <DropArea />
          </div>
        </div>

        <div className="grid grid-flow-col  translate-y-20">
          <GlassCard
            cardId={1}
            title="About"
            description="Who am I?"
            rotation="-rotate-[15deg] translate-x-2 -translate-y-5"
          />
          <GlassCard
            cardId={2}
            title="Work"
            description="What do I do?"
            rotation="rotate-0 -translate-y-10"
          />
          <GlassCard
            cardId={3}
            title="Stuff"
            description="my yapping"
            rotation="rotate-[15deg] -translate-x-2 -translate-y-5"
          />
        </div>
      </DndContext>
    </div>
  );
}

export default App;
