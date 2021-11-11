import { ICountUpValues } from "../components/CountDown/CountDown.interfaces";

/* Format minutes and seconds to 00:00 format */
function formatTimerParameters({timerMinutes, timerSeconds}: ICountUpValues) {
  return `0${timerMinutes}:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}`;
}

export { formatTimerParameters };