import PropTypes from "prop-types";

function Settings({ active }) {
  return (
    <div className="w-[330px] h-[210px] bg-blue-100">
      <h2 className="m-1">Settings</h2>
      <ul className="w-full p-0 list-none">
        {active === 0 ? (
          <li
            style={{ padding: "10px 0" }}
            className="pl-1 relative bg-blue-500 text-white"
          >
            Themes
          </li>
        ) : (
          <li>Themes</li>
        )}
        {active === 1 ? (
          <li
            style={{ padding: "10px 0" }}
            className="pl-1 relative bg-blue-500 text-white"
          >
            Wheel Color
          </li>
        ) : (
          <li>Wheel Color</li>
        )}
        {active === 2 ? (
          <li
            style={{ padding: "10px 0" }}
            className="pl-1 relative bg-blue-500 text-white"
          >
            Wallpaper
          </li>
        ) : (
          <li>Wallpaper</li>
        )}
      </ul>
    </div>
  );
}

Settings.propTypes = {
  active: PropTypes.number.isRequired,
};

export default Settings;
