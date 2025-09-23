const logprint = false;

export function logfunction(tag, message) {
  if (logprint) {
    console.log(tag, message);
  }
}

export function numberWithComma(num) {
  var decimalPart;

  var array = Math.floor(num).toString().split('');
  var index = -3;
  while (array.length + index > 0) {
    array.splice(index, 0, ',');
    index -= 4;
  }

  if (2 > 0) {
    num = parseFloat(num);
    decimalPart = num.toFixed(2).split('.')[1];
    return array.join('') + '.' + decimalPart;
  }
  return array.join('');
}

export function calculateOffPercentage(original, special) {
  let off = 0;
  let diff = original - special;
  off = numberWithComma((diff / original) * 100);
  return off;
}
