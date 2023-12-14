import { useEffect, useState } from "react";
import {Battery50Icon} from "@heroicons/react/24/solid"

let timerId;
function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    timerId = setInterval(() => {
      const date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      const cycle = hour > 12 ? "PM" : "AM";

      hour = hour > 12 ? hour - 12 : hour;
      hour = hour < 10 ? `0${hour}` : hour;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      const formattedTime = `${hour}:${minutes} ${cycle}`;
      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex justify-between px-1 w-full border border-black bottom-1 font-bold">
      <p>iPod</p>
      <div>{time}</div>
      <div><Battery50Icon className="w-8 h-6" /></div>
    </div>
  );
}

export default Navbar;
