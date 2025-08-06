import BackgroundCanvas from "./background";
import { useState } from "react";
import GlassCard from "./components/GlassCards";
import { DndContext } from "@dnd-kit/core";

import bodImg from "./assets/images/bod.png";
import punity from "./assets/images/punity.png";
import al from "./assets/images/al.png";

function App() {
  const [isAbout, setIsAbout] = useState(true);

  function getRandomRotation() {
    const rotations = [
      "rotate-0",
      "rotate-1",
      "rotate-2",
      "rotate-3",
      "rotate-6",
      "-rotate-1",
      "-rotate-2",
      "-rotate-3",
      "-rotate-6",
    ];
    return rotations[Math.floor(Math.random() * rotations.length)];
  }

  function getRandomBg() {
    const bgs = [
      "bg-orange-400/10",
      "bg-rose-400/10",
      "bg-green-400/10",
      "bg-blue-400/10",
      "bg-yellow-300/10",
      "bg-purple-400/10",
      "bg-pink-400/10",
      "bg-cyan-400/10",
      "bg-lime-400/!0",
    ];
    return bgs[Math.floor(Math.random() * bgs.length)];
  }

  const cardsData = [
    {
      cardId: 1,
      title: "Banana of Doom",
      img: bodImg,
      description: `Juicy online multiple card combining and collection game
where AI judges the outcome of your battles!`,
      projectUrl: "https://banannaofdoom.vercel.app/",
      bg: "bg-orange-400/25",
      rotation: "-rotate-6",
    },
    {
      cardId: 2,
      img: punity,
      title: "Playroomkit Unity",
      description: "Easy multiplayer sdk for online games.",
      projectUrl: "https://github.com/momintlh/playroomkit-unity",
      bg: "bg-green-400/15",
      rotation: "rotate-4",
    },

    {
      cardId: 4,
      title: "Autism Launchpad",
      img: al,
      description:
        "A proof of concept for detecting Autism using AI. This was the capstone project for my Bachelors.",
      projectUrl: "https://github.com/momintlh/FSIT",
      bg: "bg-rose-400/15",
      rotation: "rotate-0",
    },
    {
      cardId: 3,
      title: "The Last Tale",
      // img: al,
      description: "Retro inspired game made with Unity where you have to defend yourself and a valuable from waves of enemies.",
      projectUrl: "https://github.com/momintlh/Last-Tale",
      bg: "bg-green-400/15",
      rotation: "rotate-3",
    },
    {
      cardId: 5,
      title: "Foodefender",
      img: "https://www.youtube.com/watch?v=aKPagTt4eI8",
      description:
        "Art award winning game made for Rookie Game Jam 23.",
      projectUrl: "https://momintlh.itch.io/foodefender",
      rotation: "rotate-0",
    },
  ];

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
            className={`flex flex-col justify-center items-center ${isAbout ? "w-[500px] h-[400px] transition-width duration-300" : "w-[600px] h-[400px] transition-width duration-300"
              } rounded-xl text-center  border-white/10 border-2 shadow-lg bg-blue-500/5 backdrop-blur-[4px]`}
          >
            <div className="flex flex-row justify-evenly w-full p-4 border-b- border-white/10  border-b-2 rounded-xl">
              <h1
                className={`text-[1.25rem] font-mono cursor-pointer hover:text-purple-400 hover:underline ${isAbout
                  ? "text-white transition-all duration-75"
                  : "text-gray-400 transition-all duration-75"
                  }`}
                onClick={() => setIsAbout(true)}
              >
                About
              </h1>
              <h1
                className={`text-[1.25rem] font-mono cursor-pointer hover:text-purple-400 hover:underline ${!isAbout
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
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 place-items-center h-full w-full overflow-y-auto p-8">
                <DndContext onDragEnd={() => { }} onDragStart={() => { }}>
                  {cardsData.map(({ cardId, title, img, description, projectUrl }) => (
                    <GlassCard
                      key={cardId + title}
                      imageSrc={img}
                      cardId={cardId}
                      title={title}
                      description={description}
                      projectUrl={projectUrl}
                      className={`${getRandomBg()} ${getRandomRotation()}`}
                    />
                  ))}
                </DndContext>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
