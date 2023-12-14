import { useState } from "react";
import "./App.css";
import { Display, IpodCase, Navbar, Screen, Wheel } from "./components";

const menuItems = ["Now Playing", "Music", "Games", "Settings"]; //menu Items
const musicItems = ["All Songs", "Artist", "Albums"]; //Items in music

function App() {
  const [currentMenu, setCurrentMenu] = useState(-2);
  const [active, setActive] = useState(0);

  const seekSongForward = (e) => {
    console.log(e);
  };

  const seekSongReverse = (e) => {
    console.log(e);
  };

  const togglePlayPause = () => {
    console.log("play pause btn clicked");
  };

  const updateActiveMenu = (direction, menu) => {
    console.log(direction, menu);
  };

  const changeMenuBackward = () => {
    console.log("backward btn clicked");
  };

  const changeMenuForward = (id, fromMenu) => {
    console.log(id, fromMenu);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-400 ">
      <IpodCase>
        <Display>
          <Navbar />
          <Screen />
        </Display>

        <Wheel
          active={active}
          currentMenu={currentMenu}
          changeMenuForward={changeMenuForward}
          changeMenuBackward={changeMenuBackward}
          updateActiveMenu={updateActiveMenu}
          seekSongForward={seekSongForward}
          seekSongReverse={seekSongReverse}
          togglePlayPause={togglePlayPause}
        />
      </IpodCase>
    </div>
  );
}

export default App;
