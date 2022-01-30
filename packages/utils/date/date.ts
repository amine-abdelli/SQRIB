// Format date object to nivocalendar format: YYYY-MM-DD - object to string
function formatDateToCalendar(date: Date): string {
  const dateString = new Date(date);
  dateString.setDate(dateString.getDate());
  return `${dateString.getFullYear()}-${(`0${dateString.getMonth() + 1}`).slice(-2)}-${(`0${dateString.getDate()}`).slice(-2)}`;
}

function formatDate(date: Date, lang: 'fr' | 'en' = 'fr') {
  const options: any = {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
  };
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', options).format(new Date(date));
}

export { formatDateToCalendar, formatDate };
