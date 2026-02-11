import { useState, useEffect, useRef } from "react";

const STATUS = {
    pause: 0,
    running: 1
  }

export default function ShowTimer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerState, setTimerState] = useState(STATUS.pause);
    const intervalRef = useRef();

    const toggleTimer = () => {
        switch (timerState) {
            case STATUS.pause:
                setTimerState(STATUS.running);
                break;
            case STATUS.running:
                setTimerState(STATUS.pause);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(timerState === STATUS.running){
          intervalRef.current = setInterval(() => {
            // Add one second to the timer
            if (seconds < 59) {
                setSeconds(sec => sec + 1);
            }
            else {
                setSeconds(0);
                setMinutes(min => min + 1);
            }
          }, 1000);
        } else if(timerState === STATUS.pause && intervalRef.current){
          clearInterval(intervalRef.current)
        }
        return () => {
          clearInterval(intervalRef.current)
        };
      }, [minutes, seconds, timerState]);

    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const timerButtonDisplay = timerState === STATUS.running ? "Stop" : "Start";

    return (
        <div className="timer">
            <h2>{displayMinutes}:{displaySeconds}</h2>
            <button className="timer-btn" onClick={toggleTimer}>{timerButtonDisplay}</button>
        </div>
    )
}