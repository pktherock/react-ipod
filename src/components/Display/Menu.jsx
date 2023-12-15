import PropTypes from "prop-types";

import game from "../../assets/img/game.jpg";
import music from "../../assets/img/music.jpg";
import settings from "../../assets/img/settings.png";

function Menu({ active, songImgUrl, menuItems }) {
  return (
    <div className="flex w-full h-full">
      <div className="bg-blue-200 h-[217px] w-[140px]">
        <ul className="w-full p-0 list-none">
          {menuItems.map((element, index) => (
            <li
              style={{ padding: "10px 0" }}
              key={index}
              className={
                active === index
                  ? "pl-1 relative bg-blue-400 text-white active:after:content-['>'] active:after:relative active:after:right-1"
                  : ""
              }
            >
              &nbsp;{element}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-l-2 border-black bg-blue-200 h-[217px] w-[200px]">
        {active === 0 && (
          <img
            src={songImgUrl}
            className="border-2 border-black h-full w-full"
          />
        )}
        {active === 1 && (
          <img src={music} className="border-2 border-black h-full w-full" />
        )}
        {active === 2 && (
          <img src={game} className="border-2 border-black h-full w-full" />
        )}
        {active === 3 && (
          <img src={settings} className="border-2 border-black h-full w-full" />
        )}
      </div>
    </div>
  );
}

Menu.propTypes = {
  active: PropTypes.number.isRequired,
  songImgUrl: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default Menu;
