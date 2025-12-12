let inputVariant = "1";

function change(data) {
  inputVariant = document.getElementById('inputSelect').value;
  let img = document.getElementById('image');
  let label = document.getElementById('input3').parentElement;
  if (inputVariant === "1") {
    img.src = "images/img1.jpg";
    label.innerHTML = 'c = <input type="number" id="input3" min=0 max=200>';
  } else {
    img.src = "images/img2.jpg";
    label.innerHTML = 'β = <input type="number" id="input3" min=1 max=89 placeholder="1-89°">';
  }
  document.getElementById('input3').onfocus = function() {
    this.classList.remove('inputError');
    document.getElementById('output').innerHTML = '';
  };
  clearData(document.getElementById('find').parentElement);
}

function calculate(data) {
  let a = data.input1.value;
  if (Number(a) <= 0 || isNaN(a)) {
    data.input1.classList.add("inputError");
    return false;
  }
  let b = data.input2.value;
  if (Number(b) <= 0 || isNaN(b) || (Number(b) <= Number(a))) {
    data.input2.classList.add("inputError");
    return false;
  }
  let c = data.input3.value;
  if (Number(c) <= 0 || isNaN(c)) {
    data.input3.classList.add("inputError");
    return false;
  }
  if (inputVariant === '2' && (c < 1 || c > 89)) {
    data.input3.classList.add("inputError");
    return false;
  }

  if (inputVariant === '2') {
    c = (b - a) / (2 * Math.cos(c * Math.PI / 180));
  }
  let output = document.getElementById('output');
  if (!data.task1.checked && !data.task2.checked && !data.task3.checked) {
    document.getElementById('find').classList.add("findError");
  } else {
    output.innerHTML = "<p><b>Результат:</b></p>";
    if (data.task1.checked) {
      let d = Math.sqrt(c ** 2 + a * b);
      let newElement = document.createElement('p');
      if (isNaN(d)) {
        newElement.innerHTML = "Не получилось вычислить d";
      } else {
        newElement.innerHTML = "d = " + (Math.round(d * 1000) / 1000);
      }
      output.appendChild(newElement);
    }
    if (data.task2.checked) {
      let h = (1 / 2) * Math.sqrt(4 * c ** 2 - (a - b) ** 2);
      let newElement = document.createElement('p');
      if (isNaN(h)) {
        newElement.innerHTML = "Не получилось вычислить h";
      } else {
        newElement.innerHTML = "h = " + (Math.round(h * 1000) / 1000);
      }
      output.appendChild(newElement);
    }
    if (data.task3.checked) {
      let alpha = 180 - (2 * Math.atan(Math.abs(a - b) / (2 * Math.abs(a - b)
        / 2 * Math.tan((b - a) / (2 * c)))) * 180 / Math.PI);
      let newElement = document.createElement('p');
      if (isNaN(alpha)) {
        newElement.innerHTML = "Не получилось вычислить α";
      } else {
        newElement.innerHTML = "α = " + (Math.round(alpha * 1000) / 1000);
      }
      output.appendChild(newElement);
    }
  }

  return true;
}

function clearData(data) {
  data.input1.value = '';
  data.input2.value = '';
  data.input3.value = '';
  data.input1.classList.remove('inputError');
  data.input2.classList.remove('inputError');
  data.input3.classList.remove('inputError');
  data.task1.checked = false;
  data.task2.checked = false;
  data.task3.checked = false;
  document.getElementById('output').innerHTML = '';
  document.getElementById('find').classList.remove('findError');

}

document.getElementById('input1').onfocus = function() {
  this.classList.remove('inputError');
  document.getElementById('output').innerHTML = '';
};
document.getElementById('input2').onfocus = function() {
  this.classList.remove('inputError');
  document.getElementById('output').innerHTML = '';
};
document.getElementById('input3').onfocus = function() {
  this.classList.remove('inputError');
  document.getElementById('output').innerHTML = '';
};
let find = document.getElementById('find');
document.getElementById('task1').onfocus = function() {
  find.classList.remove('findError');
};
document.getElementById('task2').onfocus = function() {
  find.classList.remove('findError');
};
document.getElementById('task3').onfocus = function() {
  find.classList.remove('findError');
};