import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0); // seconds
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Format HH:MM:SS
  const formatTime = (t) => {
    const hrs = String(Math.floor(t / 3600)).padStart(2, "0");
    const mins = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
    const secs = String(t % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  return (
    <div className="container">
      <h2>Stopwatch</h2>

      <h1>{formatTime(time)}</h1>

      <div className="buttons">
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <button onClick={addLap}>Lap</button>
      </div>

      <h3>Lap Times</h3>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {lap}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
