import PropTypes from "prop-types";
import Menu from "./Menu";
import LockScreen from "./LockScreen";
import Music from "./Music";
import Settings from "./Settings";
import Songs from "./Songs";
import Playing from "./Playing";
function Screen({
  active,
  currentMenu,
  songImgUrl,
  menuItems,
  musicItems,
  songItems,
  audio,
  songUrl,
  playing,
  songIndex,
}) {
  return (
    <div className="w-full h-full">
      {currentMenu === -2 && <LockScreen />}
      {currentMenu === -1 && (
        <Menu active={active} songImgUrl={songImgUrl} menuItems={menuItems} />
      )}
      {currentMenu === 1 && <Music musicItems={musicItems} active={active} />}
      {currentMenu === 2 && (
        <div className="w-[330px] h-[210px] bg-blue-100 flex justify-center items-center text-center">
          <h1 className="text-3xl">Games</h1>
        </div>
      )}
      {currentMenu === 3 && <Settings active={active} />}
      {currentMenu === 4 && <Songs songItems={songItems} active={active} />}
      {currentMenu === 5 && (
        <div className="w-[330px] h-[210px] bg-blue-100 flex justify-center items-center text-center">
          <h1 className="text-3xl">Artists</h1>
        </div>
      )}
      {currentMenu === 6 && (
        <div className="w-[330px] h-[210px] bg-blue-100 flex justify-center items-center text-center">
          <h1 className="text-3xl">Albums</h1>
        </div>
      )}
      {(currentMenu === 0 || currentMenu === 7) && (
        <Playing
          songImgUrl={songImgUrl}
          audio={audio}
          songUrl={songUrl}
          playing={playing}
          songIndex={songIndex}
          songItems={songItems}
        />
      )}
      {currentMenu === 8 && (
        <div className="w-[330px] h-[210px] bg-blue-100 flex justify-center items-center text-center">
          <h1 className="text-3xl">Themes</h1>
        </div>
      )}
      {currentMenu === 9 && (
        <div className="w-[330px] h-[210px] bg-blue-100 flex justify-center items-center text-center">
          <h1 className="text-3xl">WheelColor</h1>
        </div>
      )}
      {currentMenu === 10 && (
        <div className="w-[330px] h-[210px] bg-blue-100 flex justify-center items-center text-center">
          <h1 className="text-3xl">Wallpaper</h1>
        </div>
      )}
    </div>
  );
}

Screen.propTypes = {
  active: PropTypes.number.isRequired,
  currentMenu: PropTypes.number.isRequired,
  songImgUrl: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
  musicItems: PropTypes.array.isRequired,
  songItems: PropTypes.array.isRequired,
  audio: PropTypes.any.isRequired,
  songUrl: PropTypes.any.isRequired,
  playing: PropTypes.bool.isRequired,
  songIndex: PropTypes.number.isRequired,
};

export default Screen;
