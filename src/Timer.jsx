import { useEffect } from "react";

function Timer({ timer, dispatch }) {
  useEffect(
    function () {
      const timeId = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(timeId);
    },
    [dispatch]
  );

  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;

  return (
    <div className="timer">
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}

export default Timer;
