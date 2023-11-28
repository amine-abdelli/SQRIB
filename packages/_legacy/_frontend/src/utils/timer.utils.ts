import { ICountUpValues } from '../components/CountDown/CountDown.props';

/* Format minutes and seconds to 00:00 format */
function formatTimerParameters({ timerMinutes, timerSeconds }: ICountUpValues) {
  if (Number.isNaN(timerMinutes) || Number.isNaN(timerSeconds)) return '01:00';
  return `${timerMinutes > 9 ? '' : '0'}${timerMinutes}:${timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}`;
}

function formatSecondsIntoTimer(timer: number) {
  const timerMinutes = Math.floor(timer / 60);
  const timerSeconds = Math.floor(timer % 60);
  return formatTimerParameters({ timerMinutes, timerSeconds });
}
export { formatTimerParameters, formatSecondsIntoTimer };
