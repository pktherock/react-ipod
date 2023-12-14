import PropTypes from "prop-types";

function IpodCase({ children }) {
  return (
    <div
      className="h-[550px] w-[350px] rounded-3xl flex flex-col items-center shadow-lg shadow-black overflow-hidden"
      style={{ backgroundColor: "rgb(210, 210, 210)"}}
    >
      {children}
    </div>
  );
}

IpodCase.propTypes = {
  children: PropTypes.any,
};

export default IpodCase;
