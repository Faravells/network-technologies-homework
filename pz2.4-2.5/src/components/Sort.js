const Sort = (props) => {
  const optionKeys = ["Нет", ...Object.keys(props.data[0])];

  const handleChange = (event) => {
    let curSelect = event.currentTarget;
    let nextSelectId = curSelect.id === 'fieldsFirst' ? 'fieldsSecond' : 'fieldsThird';
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value !== 'Нет') {
      [...nextSelect.options].forEach((item, i) => {
        if (item.value === curSelect.value) {
          nextSelect.remove(i);
        }
      })
    } else {
      nextSelect.disabled = true;
      if (curSelect.id === 'fieldsFirst') {
        let thirdSelect = document.getElementById('fieldsThird');
        thirdSelect.disabled = true;
        thirdSelect.value = "Нет";
      }
    }
  }

  const createSortArr = (selects) => {
    let sortArr = [];
    for (const item of selects) {
      const desc = document.getElementById(item.id + 'Desc').checked;
      sortArr.push({column: item.value, direction: desc});
    }
    return sortArr;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const sortArr = createSortArr(event.currentTarget.querySelectorAll('select'));
    if (sortArr[0].column !== "Нет") {
      let arr = [...props.data];
      arr.sort((first, second) => {
        for (let { column, direction } of sortArr) {
          if (column !== "Нет") {
            const firstCell = first[column];
            const secondCell = second[column];
            let comparison = 0;
            if (column === "Площадь, км²" || column === "Год образования") {
              const firstNum = parseFloat(firstCell);
              const secondNum = parseFloat(secondCell);
              comparison = firstNum - secondNum;
            } else {
              comparison = firstCell.localeCompare(secondCell);
            }
            if (comparison !== 0) {
              return (direction ? -comparison : comparison);
            }
          }
        }
        return 0;
      });
      props.sorting(false, arr);
    }
  }

  const handleReset = (event) => {
    event.preventDefault();
    const allSelect = event.currentTarget.querySelectorAll('select');
    allSelect.forEach(elem => elem.value = 'Нет');
    event.currentTarget.querySelectorAll('input').forEach(elem => elem.checked = false);
    allSelect.forEach((item, i) => i !== 0 ? item.disabled = true : item.disabled = false);
    props.sorting(true);
  }

  return (
    <details>
      <summary>Сортировка</summary>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          Первый уровень:
          <select id="fieldsFirst" onChange={handleChange}>
            {optionKeys.map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
          по убыванию? <input type="checkbox" id="fieldsFirstDesc"/>
        </p>
        <p>
          Второй уровень:
          <select id="fieldsSecond" disabled={true} onChange={handleChange}>
            {optionKeys.map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
          по убыванию? <input type="checkbox" id="fieldsSecondDesc"/>
        </p>
        <p>
          Третий уровень:
          <select id="fieldsThird" disabled={true}>
            {optionKeys.map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
          по убыванию? <input type="checkbox" id="fieldsThirdDesc"/>
        </p>
        <p>
          <button type="submit">Сортировать</button>
          <button type="reset">Сбросить сортировку</button>
        </p>
      </form>
    </details>
  )
}

export default Sort;