import { ICountUpValues } from "../../components/CountDown/CountDown.interfaces";

function formatTimerParameters(countUpValues: ICountUpValues) {
  const minutes = `0${countUpValues.minutes}`
  const seconds = `${countUpValues.seconds < 10 ? '0' + countUpValues.seconds : countUpValues.seconds}`
  return `${minutes}:${seconds}`;
}

export { formatTimerParameters };