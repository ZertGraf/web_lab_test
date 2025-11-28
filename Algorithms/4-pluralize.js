function pluralizeRecords(n) {
  let lastDigit = n % 10;
  let lastTwoDigits = n % 100;
  let record, was;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    record = "запись";
    was = "была найдена";
  } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
    record = "записи";
    was = "было найдено";
  } else {
    record = "записей";
    was = "было найдено";
  }

  return `В результате выполнения запроса ${was} ${n} ${record}`;
}

console.log(pluralizeRecords(5))