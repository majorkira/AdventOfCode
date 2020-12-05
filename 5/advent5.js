let dataArray = [];
fetch("input.txt")
  .then((response) => response.text())
  .then((text) => (dataArray = text.replace(/\n/g, ",")))
  .then(() => {
    let dataFinal = dataArray.split(",");
    let idRow = 7;
    let idCol = 3;
    let idTotal = 10;
    let seatID = 0;
    const values = [];
    for (i = 0; i < dataFinal.length; i++) {
      let rowMax = 127;
      let rowMin = 0;
      let colMin = 0;
      let colMax = 7;
      for (j = 0; j < idRow; j++) {
        if (dataFinal[i].charAt(j) == "F") {
          rowMax = Math.floor((rowMax - rowMin) / 2 + rowMin);
        } else {
          rowMin = Math.ceil((rowMax - rowMin) / 2 + rowMin);
        }
      }

      for (j = idRow; j < idTotal; j++) {
        if (dataFinal[i].charAt(j) == "L") {
          colMax = Math.floor((colMax - colMin) / 2 + colMin);
        } else {
          colMin = Math.ceil((colMax - colMin) / 2 + colMin);
        }
      }
      values.push(rowMin * 8 + colMin);
    }
    values.sort((a, b) => a - b);
    for (let i = 1; i < values.length - 1; i++) {
      if (values[i] + 2 == values[i + 1] && values[i] - 1 == values[i - 1]) {
        console.log("The missing boarding pass is ", values[i] + 1);
      }
    }
    console.log(values);
    console.log(
      "The highest seat ID on a boarding pass is ",
      Math.max(...values)
    );
  });
