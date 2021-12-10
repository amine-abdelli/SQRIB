import { ICountUpValues } from '../components/CountDown/CountDown.props';

/* Format minutes and seconds to 00:00 format */
function formatTimerParameters({ timerMinutes, timerSeconds }: ICountUpValues) {
  if (Number.isNaN(timerMinutes) || Number.isNaN(timerSeconds)) return '01:00';
  return `0${timerMinutes}:${timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}`;
}

export { formatTimerParameters };
