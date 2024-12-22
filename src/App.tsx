import Card from "./components/Card"

function App() {
  return (
    <div className="flex justify-center items-end border-rose-600 border-2 w-screen h-screen">
      <div className="flex border-2 border-white translate-y-20">
        <Card title="About" description="Who am I?" rotation="-rotate-[15deg] translate-x-4" />
        <Card title="Work" description="What do I do?" rotation="rotate-0 -translate-y-4" />
        <Card title="Stuff" description="my yapping" rotation="rotate-[15deg] -translate-x-4" />
      </div>
    </div>
  )
}

export default App