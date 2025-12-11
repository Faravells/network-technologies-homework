function removeDuplicates(str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (!res.includes(str[i])) {
      res += str[i];
    }
  }
  return res;
}

const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const keys = ["ИНТЕРФЕЙС", "ПУБЛИКАЦИЯ", "ХОСТИНГ", "ТЕСТИРОВАНИЕ", "ЗВЕЗДА"];
const text = "ЯЦРЫЩ ЪЦЮЙЯУО ХЙ, ГХЙ ЯЧАЮПЦ УЦ БЙХОХ — ТЫЭХЧЫ ЬАЯЦДК НПХК ХЫЕ, ЕЫЕ ЯЧАЮПЦ УЦ ФЙЮАХ";

for (let i = 0; i < keys.length; i++) {
  let ceasarAlphabet = removeDuplicates(keys[i]) + alphabet;
  ceasarAlphabet = removeDuplicates(ceasarAlphabet);

  for (let j = 20; j <= 22; j++) {
    let newText = "";
    for (let k = 0; k < text.length; k++) {
      if (ceasarAlphabet.indexOf(text[k]) === -1) {
        newText += text[k];
      } else {
        newText += ceasarAlphabet[(ceasarAlphabet.indexOf(text[k]) - j + 33) % 33];
      }
    }
    console.log(newText);
  }
}