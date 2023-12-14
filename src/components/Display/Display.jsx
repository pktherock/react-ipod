import PropTypes from "prop-types";

function Display({ children }) {
  return (
    <div
      className="w-[340px] h-[250px] border-4 border-black mt-4"
      style={{
        backgroundColor: "#E3F2FD",
      }}
    >
      {children}
    </div>
  );
}

Display.propTypes = {
  children: PropTypes.any,
};

export default Display;
