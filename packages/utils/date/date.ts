/**
 * Format date object to nivo calendar format:
 * e.g. 2022-03-30T17:40:38.577Z -> 2022-03-30
 * @param date Date object
 * @returns A formatted date string for nivo calendar
 */
function formatDateToCalendar(date: Date): string {
  const dateString = new Date(date);
  dateString.setDate(dateString.getDate());
  return `${dateString.getFullYear()}-${(`0${dateString.getMonth() + 1}`).slice(-2)}-${(`0${dateString.getDate()}`).slice(-2)}`;
}

/**
 * Format date object to leaderboard format:
 * e.g. 2022-03-30T17:40:38.577Z -> 30-03-2022
 * @param date Date object
 * @returns A formatted date string for nivo calendar
 */
function formatDateToLeaderboard(date: Date): string {
  const dateString = new Date(date);
  dateString.setDate(dateString.getDate());
  return `${(`0${dateString.getDate()}`).slice(-2)}-${(`0${dateString.getMonth() + 1}`).slice(-2)}-${dateString.getFullYear()}`;
}

/**
 * Format date object to a more readable format:
 * e.g. 2022-03-30T17:40:38.577Z -> mer. 30 mars 2022
 * @param date Date object
 * @param lang Chosen language 'fr' | 'en'
 * @returns a formatted date string
 */
function formatDate(date: Date, lang: 'fr' | 'en' = 'fr') {
  const options: any = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  };
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', options).format(new Date(date));
}

export { formatDateToCalendar, formatDate, formatDateToLeaderboard };
