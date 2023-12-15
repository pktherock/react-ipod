import PropTypes from "prop-types";

function Songs({ songItems, active }) {
  return (
    <div className="w-[330px] h-[210px] bg-blue-100 overflow-scroll">
      <h3 className="m-1">Music</h3>
      <ul className="w-full p-0 list-none">
        {songItems.map((element, index) => (
          <li
            style={{ padding: "10px 0" }}
            key={index}
            className={
              active === index ? "pl-1 relative bg-blue-400 text-white" : ""
            }
          >
            &nbsp;{element}
          </li>
        ))}
      </ul>
    </div>
  );
}

Songs.propTypes = {
  songItems: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
};

export default Songs;
