import Card from "./components/Card"

function App() {
  return (
    <div className="flex justify-center items-center border-rose-600 border-2 w-screen h-screen">
      <div className="flex justify-center items-center border-2 border-white">
        <Card title="About" description="Who am I?" rotataion="-rotate-[5deg] pos" />
        <Card title="Work" description="What do I do?" rotataion="" />
        <Card title="Stuff" description="my yapping" rotataion="rotate-[5deg]" />
      </div>
    </div>
  )
}

export default App