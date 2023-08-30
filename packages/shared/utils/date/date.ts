/* eslint-disable max-len */
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
  return `${(`0${dateString.getDate()}`).slice(-2)}/${(`0${dateString.getMonth() + 1}`).slice(-2)}/${dateString.getFullYear()}`;
}

/**
 * Format date object to a more readable format:
 * e.g. 2022-03-30T17:40:38.577Z -> mer. 30 mars 2022
 * @param date Date object
 * @param lang Chosen language 'fr' | 'en'
 * @returns a formatted date string
 */
function formatDate(date: Date, size?: string, lang: 'fr' | 'en' = 'fr') {
  const options: any = size === 'short'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : {
      weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
    };
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', options).format(new Date(date));
}

/**
 * Converts a creation date to a readable string indicating membership since a specific month and year.
 * Suitable for localization.
 *
 * @param {Date} created_at - The date when the user account was created.
 * @returns {string} - A string in the format "Member since {month} {year}". This string is prepared for localization.
 *
 * @example
 * const dateExample = new Date('2023-08-15');
 * console.log(memberSinceDate(dateExample));  // Outputs: "Member since August 2023"
 */
function memberSinceDate(created_at: Date): string {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const userDateOfCreation = new Date(created_at);
  const month = monthNames[userDateOfCreation.getMonth()];
  const year = userDateOfCreation.getFullYear();

  return `Member since ${month} ${year}`;
}

export {
  formatDateToCalendar, formatDate, formatDateToLeaderboard, memberSinceDate,
};
