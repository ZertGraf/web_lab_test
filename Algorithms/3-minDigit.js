function minDigit(x) {
  let min = 9;
  while (x > 0) {
    let digit = x % 10;
    if (digit < min) {
      min = digit;
    }
    x = (x - digit) / 10;
  }
  return min;
}

console.log(minDigit(519))
