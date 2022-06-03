import { formatDate, formatDateToCalendar } from './date';

const date = new Date('2022-03-30T17:40:38.577Z');
describe('Should format date', () => {
  it('Should format the date object to this format: YYYY-MM-DD', () => {
    expect(formatDateToCalendar(date)).toBe('2022-03-30');
  });

  it('Should format the date object to this format: DD/MM/YYY', () => {
    expect(formatDateToCalendar(date)).toBe('30/03/2022');
  });

  it('Should format the date object to this format: lun. 01 janvier 2000', () => {
    expect(formatDate(date, 'fr')).toBe('mer. 30 mars 2022');
    expect(formatDate(date, 'en')).toBe('Wed, 30 March 2022');
  });
});
