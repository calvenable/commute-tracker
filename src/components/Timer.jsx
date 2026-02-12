import { useState } from "react";

const STATUS = {
    pause: 0,
    running: 1
  }

export default function ShowTimer() {
    const [seconds, setSeconds] = useState(0);
    const [timerState, setTimerState] = useState(STATUS.pause);
    const [timerInterval, setTimerInterval] = useState(null);

    const toggleTimer = () => {
        switch (timerState) {
            case STATUS.pause:
                setTimerState(STATUS.running);
                setTimerInterval(setInterval(() => {
                    setSeconds(sec => sec + 1);
                }, 1000));
                break;
            case STATUS.running:
                setTimerState(STATUS.pause);
                clearInterval(timerInterval);
                break;
            default:
                break;
        }
    }

    const calculatedSeconds = seconds % 60;
    const calculatedMinutes = (seconds - calculatedSeconds) / 60;

    const displaySeconds = calculatedSeconds < 10 ? `0${calculatedSeconds}` : calculatedSeconds;
    const displayMinutes = calculatedMinutes < 10 ? `0${calculatedMinutes}` : calculatedMinutes;

    const timerButtonDisplay = timerState === STATUS.running ? "Stop" : "Start";
    const timerButtonClass = "timer-btn"
        + (timerState === STATUS.running ? " timer-stop" : "")
        + (timerState === STATUS.pause ? " timer-start" : "")

    return (
        <div className="timer">
            <h2>{displayMinutes}:{displaySeconds}</h2>
            <button className={timerButtonClass} onClick={toggleTimer}>{timerButtonDisplay}</button>
        </div>
    )
}