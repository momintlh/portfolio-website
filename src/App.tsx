import BackgroundCanvas from "./background";
import { useState } from "react";
import GlassCard from "./components/GlassCards";
import Card from "./components/Card";


function App() {
  const [isAbout, setIsAbout] = useState(true);


  return (
    <>
      <BackgroundCanvas />
      <div className="flex flex-col justify-between items-center  border-rose-600 border-2 overflow-hidden w-screen h-screen">
        <div className="flex flex-col justify-center items-center text-center w-[500px]  py-4 rounded-b-2xl  bg-white/10 backdrop-blur-[4px] border-white/10  border-2">
          <h1 className="text-white text-[2rem] font-mono font-semibold">
            Talha Momin
          </h1>
          <p className="text-purple-300 text-sm italic font-mono font-light">
            Cooking Products
          </p>
        </div>

        <div className="flex justify-center items-center flex-grow">
          <div
            className="flex flex-col justify-center items-center w-[500px] h-[400px] rounded-xl text-center  border-white/10 border-2 shadow-lg bg-blue-500/5 backdrop-blur-[4px]"
          >

            <div className="flex flex-row justify-evenly w-full p-4 border-b- border-white/10  border-b-2 rounded-xl">
              <h1 className="text-white text-[1.25rem] font-mono cursor-pointer hover:text-purple-250 hover:underline" onClick={() => setIsAbout(true)}>
                About
              </h1>
              <h1 className="text-white text-[1.25rem] font-mono cursor-pointer hover:text-purple-250 hover:underline" onClick={() => setIsAbout(false)}>
                Projects
              </h1>
            </div>

            {isAbout ? (
              < div className="w-full h-full flex justify-center items-center" >
                I am so cool!
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center" >
                <GlassCard cardId={1} description="Top down game made with Unity" rotation="45" title="The Last Tale" />
                My work is so cool!
              </div>
            )
            }
          </div>
        </div>
      </div >

    </>

  );
}

export default App;
