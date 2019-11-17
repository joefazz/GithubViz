import { format, parseISO } from 'date-fns';
import { createEmptyMonthsObject } from './consts';

export function plotDataToXY(data) {
  return Object.keys(data).map((key) => ({ x: key, y: data[key] || 0 }));
}

export function mapDataToMonthsObject(data) {
  const months = createEmptyMonthsObject();

  data.forEach((item) => {
    const createdMonth = format(parseISO(item.created_at), 'MMM');
    months[createdMonth] += 1;
  });

  return months;
}

export function mapDataToYearsObject(data) {
  const years = {};

  data.forEach((item) => {
    const year = format(parseISO(item.created_at), 'yyyy');
    years[year] = years[year] || 0;
    years[year] += 1;
  });

  return years;
}

export function sortArrayOfObjectsFromKey(array, key, ascending = false) {
  return array.sort((b, a) => {
    var x = a[key];
    var y = b[key];
    if (ascending) {
      return x > y ? -1 : x > y ? 1 : 0;
    } else {
      return x < y ? -1 : x > y ? 1 : 0;
    }
  });
}
