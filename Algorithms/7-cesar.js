function cesar(str, shift, action) {
  let alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
  let result = "";
  let s = action === "encode" ? shift : -shift;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let lowerChar = char.toLowerCase();
    let index = alphabet.indexOf(lowerChar);

    if (index !== -1) {
      let newIndex = (index + s + alphabet.length) % alphabet.length;
      let newChar = alphabet[newIndex];
      result += char === lowerChar ? newChar : newChar.toUpperCase();
    } else {
      result += char;
    }
  }

  return result;
}

console.log(cesar("эзтыхз фзъзъз", 4, "decode"));
