import { Link } from "react-router-dom";
import "./Home.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Home = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  
  return (
    <div className="homePage">
      <img src="/src/assets/logos.png" alt="bg" className="orbital" />
      <div className="left">
        <h1>EEY!! AYYY!!</h1>
        <h2>Sundan mo ng ligaw ang buhay mundo </h2>
        <h3>
          To promote good coding practices, it might be best to insert a
          semi-colon after "500" and initialise "millisecondsToWait" in the code
          sample (e.g. by preceding it with "var ") (this way, if someone copies
          and pastes the sample, they won't end up with an implied global)
        </h3>
        <Link to="/dashboard">Let's go</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/src/assets/bg.png" alt="" className="imgAi" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/src/assets/mahalkita.png"
                  : typingStatus === "human2"
                  ? "/src/assets/mahal.png"
                  : "/src/assets/bot.jpg"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "Human: We produce food for Mice",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: We produce food for Hamsters",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human: We produce food for Guinea Pigs",
                2000,
                () => {
                  setTypingStatus("bot");
                },
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "1em", display: "inline-block" }}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/src/assets/logos.png" alt="" />
        <div className="links">
          <Link part="/">Terms of Service</Link>
          <span>|</span>
          <Link part="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
