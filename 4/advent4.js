let dataArray = [];
fetch("input.txt")
  .then((response) => response.text())
  .then((text) => (dataArray = text.replace(/\n\s+/g, "\r\n\n\n")))
  .then(() => {
    let dataFinal = dataArray.split(/\n\n\n/);
    let validCount = 0;
    for (i = 0; i < dataFinal.length; i++) {
      if (
        dataFinal[i].includes("byr") &&
        dataFinal[i].includes("iyr") &&
        dataFinal[i].includes("eyr") &&
        dataFinal[i].includes("hgt") &&
        dataFinal[i].includes("hcl") &&
        dataFinal[i].includes("ecl") &&
        dataFinal[i].includes("pid")
      ) {
        let byrArray = dataFinal[i].match(/byr:(\d{4})/);
        let iyrArray = dataFinal[i].match(/iyr:(\d{4})/);
        let eyrArray = dataFinal[i].match(/eyr:(\d{4})/);
        let hgtArrayCM = dataFinal[i].match(/hgt:(\d{3})(cm)/);
        let hgtArrayIN = dataFinal[i].match(/hgt:(\d{2})(in)/);
        let hgtCM = 0;
        let hgtIN = 0;
        let hcl = dataFinal[i].match(/hcl:#(?:[0-9a-f]{6})/);
        let ecl = dataFinal[i].match(/ecl:amb|blu|brn|gry|grn|hzl|oth/);
        let pid = dataFinal[i].match(/pid:\d{9}\s/);

        if (
          byrArray &&
          iyrArray &&
          eyrArray &&
          (hgtArrayCM || hgtArrayIN) &&
          hcl &&
          ecl &&
          pid
        ) {
          if (hgtArrayCM) {
            hgtCM = hgtArrayCM[1];
          } else {
            hgtIN = hgtArrayIN[1];
          }

          if (byrArray[1] >= 1920 && byrArray[1] <= 2002) {
            if (iyrArray[1] >= 2010 && iyrArray[1] <= 2020) {
              if (eyrArray[1] >= 2020 && eyrArray[1] <= 2030) {
                if (
                  (hgtIN >= 59 && hgtIN <= 76) ||
                  (hgtCM >= 150 && hgtCM <= 193)
                ) {
                  validCount += 1;
                }
              }
            }
          }
        }
      }
    }
    console.log("The number of valid passports is:", validCount);
  });
