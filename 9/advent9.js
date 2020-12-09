const rawData = input.replace(/\n/g, ",").split(",");
const data = rawData.map((x) => {
  return parseInt(x, 10);
});
let passData = [];
const preamble = 25;
for (i = preamble; i < data.length; i++) {
  for (j = i - preamble; j < i; j++) {
    for (k = j + 1; k < j + preamble - 1; k++) {
      if (data[j] + data[k] === data[i]) {
        passData.push(data[i]);
      }
    }
  }
}
console.log("data ", data);
const sliceData = data.slice(preamble);
let passDataUniques = [...new Set(passData)];
const results = sliceData.filter((item) => {
  return !passData.includes(item);
});
console.log("results for the first part ", results);
let invalid = results[0];
i = 0;
let answer = 0;
let contiguous = [];
let results2 = 0;
while (i < data.length) {
  contiguous = [];
  answer = 0;
  j = i;
  while (j < data.length) {
    answer = answer + data[j];
    contiguous.push(data[j]);
    if (answer === invalid) {
      contiguous.sort((a, b) => {
        return a - b;
      });

      results2 = contiguous[0] + contiguous[contiguous.length - 1];

      i = data.length;
      j = data.length;
    }
    j += 1;
  }
  i += 1;
}
console.log("The answer for the second part is ", results2);
