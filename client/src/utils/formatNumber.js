import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

export function fLikes(users,otherLikes) {
  switch(users.length) {
      case 1:
          return `${users[0]} likes this`;
      case 2:
          return `${users[0]} and ${users[1]} like this`;
      case 3:
          return `${users[0]}, ${users[1]} and ${users[2]} like this`;
      default:
          return `${users.slice(0, 2).join(", ")} and ${otherLikes} others like this`;
  }
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}