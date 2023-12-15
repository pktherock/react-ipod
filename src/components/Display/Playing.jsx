import PropTypes from "prop-types";
import { useEffect, useState } from "react";

let intervalId;

function Playing({ songItems, playing, songIndex, audio, songImgUrl }) {
  const [currentTime, setCurrentTime] = useState(0);

  let currentTimeRender =
    Math.floor(currentTime / 60) + ":" + Math.floor(currentTime % 60);
  let durationRender =
    Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
  const percentageComplete = {
    width: (currentTime / audio.duration) * 100 + "%",
  };
  if (durationRender === "NaN:NaN") {
    durationRender = "0:00";
  }
  if (Math.floor(currentTime % 60 < 10)) {
    currentTimeRender =
      Math.floor(currentTime / 60) + ":0" + Math.floor(currentTime % 60);
  }

  useEffect(() => {
    setCurrentTime(audio.currentTime);
    intervalId = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [audio.currentTime]);

  return (
    <div className="w-[330] h-[210px]  bg-blue-100">
      <div className="flex items-center justify-between box-border p-2">
        <img
          className="m-auto mt-2 w-[110px] h-[110px]"
          src={songImgUrl}
          alt="songImg"
        ></img>
        <div>
          <h6 className="m-1 ml-1 text-2xl">{songItems[songIndex]}</h6>
          {playing && <h4 className="mt-5 text-2xl text-green-500">Playing</h4>}
          {!playing && <h4 className="mt-5 text-2xl">Paused</h4>}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center w-full">
        {currentTimeRender}
        <div className="w-8/12 h-3 my-0 mx-1 bg-gray-500 rounded-lg">
          <div style={percentageComplete} className="h-3 bg-blue-500 rounded-lg"></div>
        </div>
        {durationRender}
      </div>
    </div>
  );
}

Playing.propTypes = {
  songItems: PropTypes.array.isRequired,
  playing: PropTypes.bool.isRequired,
  songIndex: PropTypes.number.isRequired,
  audio: PropTypes.any.isRequired,
  songImgUrl: PropTypes.string.isRequired,
};

export default Playing;
