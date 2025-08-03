import BackgroundCanvas from "./background";
import { useState } from "react";


function App() {
  const [isMe, setIsMe] = useState(true);


  return (
    <>
      <BackgroundCanvas />
      <div className="flex flex-col justify-between items-center  border-rose-600 border-2 overflow-hidden w-screen h-screen">
        <div className="flex justify-center items-center flex-grow">
          <div
            // className="flex justify-center items-center w-[500px] h-[300px] rounded-xl text-center  bg-blue-500/5 backdrop-blur-[4px] border-blue-200/10 border-[3px] shadow-lg"
            className="flex flex-col justify-center items-center w-[700px] h-[500px] rounded-xl text-center  bg-white/50 backdrop-blur-[4px] border-white border-[2px] shadow-lg"
          >
            <div className="flex flex-row justify-between items-center w-full p-4 border-b-2 border-white rounded-xl">
              <div>
                <h1 className="text-black text-[2rem] font-mono font-semibold">
                  Talha Momin
                </h1>
                <h1 className="text-black text-[1.25rem] font-mono  cursor-pointer hover:text-purple-600 hover:underline">
                  {/* <img src="assets/react.svg" alt="" /> */}
                </h1>
                <p className="text-black text-sm italic font-mono font-light">
                  Cooking Products
                </p>
              </div>
              <p className="text-black text-sm italic font-mono font-light">
                Dark / Light
              </p>
            </div>
            <div className="flex flex-row justify-evenly w-full p-4 border-b- border-white rounded-xl">
              <h1 className="text-black text-[1.25rem] font-mono  cursor-pointer hover:text-purple-600 hover:underline">
                About
              </h1>
              <h1 className="text-black text-[1.25rem] font-mono  cursor-pointer hover:text-purple-600 hover:underline">
                Projects
              </h1>
            </div>
            <div className="border-2 border-green-500 w-full h-full" >
            </div>
          </div>

        </div>
      </div>
    </>

  );
}

export default App;
