import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";

const db = [
  {
    name: "Richard Hendricks",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf24VYVDatsnFhm4pC6X5mnSSjQEjoSFn3Rw&usqp=CAU",
  },
  {
    name: "Erlich Bachman",
    url: "https://content.presspage.com/uploads/2341/1920_andreas-tostmann.jpg?10000",
  },
  {
    name: "Monica Hall",
    url: "https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,w_250,h_250,g_face:center,q_85,fl_lossy,f_jpg/usr/SNssZxz.jpg",
  },
  {
    name: "Jared Dunn",
    url: "https://www.broadwaydancecenter.com/sites/default/files/meta-images/grimes_jared_meta.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6loIwxY5HfwQEX1fA21S5-HbGc2gyfwE_pQ&usqp=CAU",
  },
];

const Dashboard = () => {
  const characters = db;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer/>
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p>:</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
