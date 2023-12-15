import {
  ForwardIcon,
  BackwardIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect } from "react";
import ZingTouch from "zingtouch";
import PropTypes from "prop-types";

function Wheel({
  active,
  updateActiveMenu,
  currentMenu,
  changeMenuBackward,
  changeMenuForward,
  togglePlayPause,
  seekSongForward,
  seekSongReverse,
}) {
  // control the wheel rotation action if rotation is more than 15 degrees and also check direction of rotation
  const wheelControl = useCallback(
    (e) => {
      let angle = 0;
      if (e.detail.distanceFromOrigin === 0) {
        angle = e.detail.angle;
      }
      if (Math.abs(angle - e.detail.angle) > 300) {
        angle = Math.abs(e.detail.angle);
        if (e.detail.distanceFromLast === 0) {
          return;
        } else if (e.detail.distanceFromLast < 0) {
          updateActiveMenu(1, currentMenu);
        } else {
          updateActiveMenu(0, currentMenu);
        }
      } else if (Math.abs(angle - e.detail.angle) > 15) {
        angle = Math.abs(e.detail.angle);
        if (e.detail.distanceFromLast === 0) {
          return;
        } else if (e.detail.distanceFromLast > 0) {
          updateActiveMenu(1, currentMenu);
        } else {
          updateActiveMenu(0, currentMenu);
        }
      }
    },
    [currentMenu, updateActiveMenu]
  );

  useEffect(() => {
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);
    const menuIcon = document.getElementById("menu");
    const playPause = document.getElementById("play-pause");
    const reverse = document.getElementById("reverse");
    const forward = document.getElementById("forward");

    const longTapGesture = new ZingTouch.Tap({
      maxDelay: 10000,
      numInputs: 1,
      tolerance: 1,
    });

    activeRegion.bind(menuIcon, "tap", function () {
      changeMenuBackward();
    });
    activeRegion.bind(wheel, "rotate", function (e) {
      wheelControl(e);
    });
    activeRegion.bind(playPause, "tap", function () {
      togglePlayPause();
    });

    activeRegion.bind(reverse, longTapGesture, function (e) {
      seekSongReverse(e);
    });

    activeRegion.bind(forward, longTapGesture, function (e) {
      seekSongForward(e);
    });
  }, [
    changeMenuBackward,
    seekSongForward,
    seekSongReverse,
    togglePlayPause,
    wheelControl,
  ]);

  return (
    // wheel container
    <div className="relative w-[230px] h-[230px] mt-auto mb-5 flex">
      {/* wheel */}
      <div
        className="bg-white cursor-pointer w-full h-full rounded-full"
        id="wheel"
      >
        <div
          className="absolute left-[38%] top-[11%] w-[40px] h-[20px]"
          id="menu"
        >
          <div className="font-bold text-lg text-gray-500">MENU</div>
        </div>

        <div className="absolute right-[10%] top-[45%]" id="forward">
          <ForwardIcon className="w-8 h-8 text-gray-500" />
        </div>

        <div className="absolute left-[10%] top-[45%]" id="reverse">
          <BackwardIcon className="w-8 h-8 text-gray-500" />
        </div>

        <div className="absolute bottom-[11%] left-[40%] flex" id="play-pause">
          <PlayIcon className="w-8 h-8 text-gray-500" />
          <PauseIcon className="w-8 h-8 text-gray-500" />
        </div>
      </div>

      <div
        className="w-[90px] h-[90px] rounded-full absolute left-[31%] top-[31%]"
        style={{ backgroundColor: "rgb(210, 210, 210)" }}
        onClick={() => changeMenuForward(active, currentMenu)}
        id="blank"
      ></div>
    </div>
  );
}

Wheel.propTypes = {
  active: PropTypes.number.isRequired,
  updateActiveMenu: PropTypes.func.isRequired,
  currentMenu: PropTypes.number.isRequired,
  changeMenuBackward: PropTypes.func.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  seekSongForward: PropTypes.func.isRequired,
  seekSongReverse: PropTypes.func.isRequired,
  changeMenuForward: PropTypes.func.isRequired,
};

export default Wheel;
