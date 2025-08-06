import BackgroundCanvas from "./background";
import { useState } from "react";
import GlassCard from "./components/GlassCards";

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
      "bg-orange-400/25",
      "bg-rose-400/15",
      "bg-green-400/15",
      "bg-blue-400/20",
      "bg-yellow-300/20",
      "bg-purple-400/20",
      "bg-pink-400/20",
      "bg-cyan-400/20",
      "bg-lime-400/20",
    ];
    return bgs[Math.floor(Math.random() * bgs.length)];
  }

  const cardsData = [
    {
      cardId: 1,
      title: "Banana of Doom",
      description: `Juicy online multiple card combining and collection game
where AI judges the outcome of your battles!`,
      bg: "bg-orange-400/25",
      rotation: "-rotate-6",
    },
    {
      cardId: 2,
      title: "Autism Launchpad",
      description:
        "A proof of concept for detecting Autism using AI. This was my capstone project for my Bachelors",
      bg: "bg-rose-400/15",
      rotation: "rotate-0",
    },
    {
      cardId: 3,
      title: "The Last Tale",
      description: "Top down wave based game made with Unity",
      bg: "bg-green-400/15",
      rotation: "rotate-4",
    },
    {
      cardId: 1,
      title: "Banana of Doom",
      description: `Juicy online multiple card combining and collection game
where AI judges the outcome of your battles!`,
      bg: "bg-orange-400/25",
      rotation: "-rotate-2",
    },
    {
      cardId: 2,
      title: "Autism Launchpad",
      description:
        "A proof of concept for detecting Autism using AI. This was my capstone project for my Bachelors",
      bg: "bg-rose-400/15",
      rotation: "rotate-4",
    },
    {
      cardId: 3,
      title: "The Last Tale",
      description: "Top down wave based game made with Unity",
      bg: "bg-green-400/15",
      rotation: "rotate-3",
    },
    {
      cardId: 1,
      title: "Banana of Doom",
      description: `Juicy online multiple card combining and collection game
where AI judges the outcome of your battles!`,
      bg: "bg-orange-400/25",
      rotation: "-rotate-1",
    },
    {
      cardId: 2,
      title: "Autism Launchpad",
      description:
        "A proof of concept for detecting Autism using AI. This was my capstone project for my Bachelors",
      bg: "bg-rose-400/15",
      rotation: "rotate-1",
    },
    {
      cardId: 3,
      title: "The Last Tale",
      description: "Top down wave based game made with Unity",
      bg: "bg-green-400/15",
      rotation: "rotate-3",
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
            className={`flex flex-col justify-center items-center ${
              isAbout ? "w-[500px] h-[400px] transition-width duration-300" : "w-[600px] h-[400px] transition-width duration-300"
            } rounded-xl text-center  border-white/10 border-2 shadow-lg bg-blue-500/5 backdrop-blur-[4px]`}
          >
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
              <div className="grid grid-cols-3 gap-4 place-items-center h-full w-full overflow-y-auto p-8">
                {cardsData.map(({ cardId, title, description }) => (
                  <GlassCard
                    key={cardId + title}
                    cardId={cardId}
                    title={title}
                    description={description}
                    className={`${getRandomBg()} ${getRandomRotation()}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
