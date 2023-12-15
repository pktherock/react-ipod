import { useEffect, useState } from "react";
import "./App.css";
import { Display, IpodCase, Navbar, Screen, Wheel } from "./components";

// Import all songs
import song1 from "./assets/audios/song1.mp3";
import song2 from "./assets/audios/song2.mp3";
import song3 from "./assets/audios/song3.mp3";
import song4 from "./assets/audios/song4.mp3";
import song5 from "./assets/audios/song5.mp3";

// Import songs cover song
import song1Img from "./assets/img/song1Img.png";
import song2Img from "./assets/img/song2Img.png";
import song3Img from "./assets/img/song3Img.png";
import song4Img from "./assets/img/song4Img.png";
import song5Img from "./assets/img/song5Img.png";

// todo Import wallpapers
import wallpaper1 from "./assets/img/wallpaper1.jpg";
import wallpaper2 from "./assets/img/wallpaper2.jpg";
import wallpaper3 from "./assets/img/wallpaper3.jpg";

const menuItems = ["Now Playing", "Music", "Games", "Settings"]; //menu Items
const musicItems = ["All Songs", "Artist", "Albums"]; //Items in music

// length of a particular menu
const lengthMenuKey = { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 };

// which menu can be rendered by key menu
const menuMapping = { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] };
const songItemsUrl = [song1, song2, song3, song4, song5]; //songs list

//song images list
const songImgItemsUrl = [song1Img, song2Img, song3Img, song4Img, song5Img];

const songItems = [
  "Teere mohalle - Mamta Sharma",
  "Tera Ishq Bada Teekha - Javed Ali & Shreya Ghoshal",
  "Kar Gayi Chull - Badshah, Arman Malik",
  "Jashn-e-Ishqa - Javed Ali & Shadab Faridi",
  "Laila Main Laila - Pawni Pandey, Kalyanji",
];

const wallpaperItems = [wallpaper1, wallpaper2, wallpaper3]; // todo

function App() {
  const [currentMenu, setCurrentMenu] = useState(-2);
  const [active, setActive] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [navigationStack, setNavigationStack] = useState([]);
  const [songUrl, setSongUrl] = useState(song1);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(song1));
  const [songImgUrl, setSongImgUrl] = useState(song1Img);
  const [wallpaper, setWallpaper] = useState(0); // todo

  // todo function to set wallpaper
  const handleChangeWallpaper = (id) => {
    // todo
    setWallpaper(id);
  };

  // function to change music
  const changePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = songItemsUrl[id];
    const songImgUrl = songImgItemsUrl[id];
    audio.pause();
    setCurrentMenu(7);
    setSongUrl(songUrl);
    setNavigationStack(navigationStack); // todo
    setActive(0);
    setPlaying(true);
    setSongIndex(id);
    setAudio(() => new Audio(songUrl)); // todo
    setSongImgUrl(songImgUrl);
  };

  // function to handle long press on forward btn
  const seekSongForward = (e) => {
    if (currentMenu === -2 || playing === false) return;

    if (e.detail.interval < 250) {
      audio.pause();
      let currentSongIndex = songIndex;
      if (currentSongIndex === songItemsUrl.length - 1) {
        currentSongIndex = 0;
      } else {
        currentSongIndex++;
      }
      const songUrl = songItemsUrl[currentSongIndex];
      const songImgUrl = songImgItemsUrl[currentSongIndex];
      setSongIndex(currentSongIndex);
      setSongImgUrl(songImgUrl);
      setSongUrl(songUrl);
      setAudio(new Audio(songUrl));
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      setAudio((prevState) => {
        prevState.currentTime += interval;
        return prevState;
      });
    }
  };

  // function to handle long press on reverse btn
  const seekSongReverse = (e) => {
    if (currentMenu === -2 || playing === false) return;

    if (e.detail.interval < 250) {
      audio.pause();
      let currentSongIndex = songIndex;
      if (currentSongIndex === 0) {
        currentSongIndex = songItemsUrl.length - 1;
      } else {
        currentSongIndex--;
      }
      const songUrl = songItemsUrl[currentSongIndex];
      const songImgUrl = songImgItemsUrl[currentSongIndex];

      setSongIndex(currentSongIndex);
      setSongImgUrl(songImgUrl);
      setSongUrl(songUrl);
      setAudio(new Audio(songUrl));
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      setAudio((prevState) => {
        prevState.currentTime -= interval;
        return prevState;
      });
    }
  };

  // function to play and pause
  const togglePlayPause = () => {
    if (currentMenu === -2) return;

    if (playing === true) {
      setPlaying(false);
      audio.pause();
    } else {
      setPlaying(true);
      audio.play();
    }
  };

  // function to handle wheel movement and set to track menu
  const updateActiveMenu = (direction, menu) => {
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10
    ) {
      return;
    }
    let min = 0;
    let max = 0;

    max = lengthMenuKey[menu];

    if (direction === 1) {
      if (active >= max) {
        setActive(min);
      } else {
        setActive(active + 1);
      }
    } else {
      if (active <= min) {
        setActive(max);
      } else {
        setActive(active - 1);
      }
    }
  };

  // function to handle click event on backward btn
  const changeMenuBackward = () => {
    const navigationStacks = navigationStack.slice();
    if (currentMenu === -2) return;

    const prevId = navigationStacks.pop();
    setCurrentMenu(prevId);
    setNavigationStack(navigationStacks);
    setActive(0);
  };

  // function to handle click event on forward btn
  const changeMenuForward = (id, fromMenu) => {
    const navigationStacks = navigationStack.slice();

    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10
    ) {
      return;
    }

    if (fromMenu === -2) {
      navigationStacks.push(currentMenu);
      setCurrentMenu(-1);
      setNavigationStack(navigationStacks);
      setActive(0);
      return;
    }

    if (fromMenu === -1) {
      navigationStacks.push(currentMenu);
      setCurrentMenu(id);
      setNavigationStack(navigationStacks);
      setActive(0);
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      // setTheme(id); // todo
      return;
    }

    if (fromMenu === 9) {
      // setWheelColor(id); // todo
      return;
    }

    if (fromMenu === 10) {
      setWallpaper(id);
      return;
    }

    navigationStacks.push(currentMenu);

    if (fromMenu === 4) {
      changePlayingSongFromMusicMenu(id, navigationStacks, fromMenu);
      return;
    }

    const currentMenuID = menuMapping[fromMenu][id];

    setCurrentMenu(currentMenuID);
    setNavigationStack(navigationStacks);
    setActive(0);
  };

  useEffect(() => {
    if (playing) {
      audio.play();

      // add event listener, so next song automatically will play
      audio.addEventListener("ended", () => {
        console.log("new song started...");
        let currentSongIndex = songIndex;
        if (currentSongIndex === songItemsUrl.length - 1) {
          currentSongIndex = 0;
        } else {
          currentSongIndex++;
        }
        const songUrl = songItemsUrl[currentSongIndex];
        const songImgUrl = songImgItemsUrl[currentSongIndex];
        setSongIndex(currentSongIndex);
        setSongImgUrl(songImgUrl);
        setSongUrl(songUrl);
        setAudio(new Audio(songUrl));
      });
    }
  }, [audio, playing, songIndex]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-800 ">
      <IpodCase>
        <Display>
          <Navbar />
          <Screen
            active={active}
            currentMenu={currentMenu}
            songImgUrl={songImgUrl}
            menuItems={menuItems}
            musicItems={musicItems}
            songItems={songItems}
            audio={audio}
            songUrl={songUrl}
            playing={playing}
            songIndex={songIndex}
          />
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
