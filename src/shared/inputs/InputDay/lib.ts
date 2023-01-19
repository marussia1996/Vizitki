
const range = (startYear: number, endYear: number): Array<number> => {
  let years: Array<number> = [];
  while (startYear <= endYear) {
    years.push(startYear++);
  }
  return years;
}

export const years = range(1930, new Date().getFullYear());

export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];