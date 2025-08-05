import BackgroundCanvas from "./background";
import { useState } from "react";
import GlassCard from "./components/GlassCards";

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
          <div className="flex flex-col justify-center items-center w-[500px] h-[400px] rounded-xl text-center  border-white/10 border-2 shadow-lg bg-blue-500/5 backdrop-blur-[4px]">
            <div className="flex flex-row justify-evenly w-full p-4 border-b- border-white/10  border-b-2 rounded-xl">
              <h1
                className={`text-[1.25rem] font-mono cursor-pointer hover:text-purple-400 hover:underline ${
                  isAbout
                    ? "text-white transition-all duration-75"
                    : "text-gray-400 transition-all duration-75"
                }`}
                onClick={() => setIsAbout(true)}
              >
                About
              </h1>
              <h1
                className={`text-[1.25rem] font-mono cursor-pointer hover:text-purple-400 hover:underline ${
                  !isAbout
                    ? "text-white transition-all duration-75"
                    : "text-gray-400 transition-all duration-75"
                }`}
                onClick={() => setIsAbout(false)}
              >
                Projects
              </h1>
            </div>

            {isAbout ? (
              <div className="w-full h-full flex justify-center items-center">
                I am so cool!
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <GlassCard
                  className="bg-orange-400/25 -rotate-6"
                  cardId={1}
                  description={`Juicy online multiple card combining and collection game\n where AI judges the outcome of your battles!`}
                  title="Banana of Doom"
                />
                <GlassCard
                  className="bg-rose-400/15 rotate-0"
                  cardId={2}
                  description="An proof of concept for detecting Autism using AI.This was my capstone project for my Bachelors"
                  title="Autism Launchpad"
                />
                <GlassCard
                  className="bg-green-400/15 -rotate-6"
                  cardId={1}
                  description="Top down wave based game made with Unity"
                  title="The Last Tale"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
