import {isDate, parse} from 'date-fns';

export function parseDateString(value, originalValue) {
  return isDate(originalValue)
    ? originalValue
    : parse(originalValue, "dd-MM-yyyy", new Date());
}
