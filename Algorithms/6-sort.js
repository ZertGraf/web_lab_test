function getSortedArray(array, key) {
  let arr = array;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j][key] > arr[j + 1][key]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const users = [
    { name: 'Иван', age: 25 },
    { name: 'Анна', age: 20 },
    { name: 'Петр', age: 30 }
];

console.log(getSortedArray(users, 'age'));
console.log(getSortedArray(users, 'name'));
