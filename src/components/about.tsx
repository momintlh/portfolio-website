import React from "react";

import github from "../assets/images/github-icon.svg";
import x from "../assets/images/x.svg";
import linkedin from "../assets/images/linkedin.svg";

const About: React.FC = () => (
  <section className="flex flex-col items-center justify-center p-8 h-full bg-gradient-to-brshadow-lg max-w-xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-200 mb-4">
      {" "}
      Oi, fancy seeing you on my website!
    </h2>
    <p className="text-base text-gray-300 text-center mb-4">
      I am a{" "}
      <span className="font-semibold text-cyan-400">Software Engineer</span>,
      with a soft spot for{" "}
      <span className="font-semibold text-lime-400">
        Game and Tools Development
      </span>
      .
    </p>
    <p className="text-md font-semibold text-white mb-2 tracking-wide drop-shadow">
      Connect with me on:
    </p>
    <div className="flex gap-4 mt-2 bg-blue-500/20 p-3 rounded-2xl shadow-lg">
      <a
        href="https://x.com/momintlh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
      >
        <img
          src={x}
          alt="X (Twitter) Logo"
          className="h-7 w-7 filter brightness-0 invert hover:brightness-100 hover:invert-0 transition"
        />
      </a>
      <a
        href="https://github.com/momintlh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <img
          src={github}
          alt="GitHub Logo"
          className="h-7 w-7 filter brightness-0 invert hover:brightness-100 hover:invert-0 transition"
        />
      </a>
      <a
        href="https://www.linkedin.com/in/talhamomin"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <img
          src={linkedin}
          alt="LinkedIn Logo"
          className="h-7 w-7 filter brightness-0 invert hover:brightness-100 hover:invert-0 transition"
        />
      </a>
    </div>
  </section>
);

export default About;
