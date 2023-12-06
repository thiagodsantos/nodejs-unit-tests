const MAX_ITERATOR = 3570000;

function findAgeNoThrows(name) {
  if (!name) {
    return "";
  }

  return name;
}

function findAgeWithoutEx(name) {
  try {
    return findAgeNoThrows(name);
  } catch (e) {
    return "";
  }
}

function findAgeThrows(name) {
  if (!name) {
    throw new Error("Error");
  }

  return name;
}

function findAgeWithEx(name) {
  try {
    return findAgeThrows(name);
  } catch (e) {
    return "";
  }
}

function elapsedTimeInSeconds(start, end) {
  return (end - start) / 1000;
}

function formatNumberText(number, counter = 0) {
  const units = ["m", "mi", "bi", "tri"];

  if (number < 1000) {
    return `${number}${units[counter]}`;
  }

  const unit = number / 1000;
  if (unit < 1000) {
    return formatNumberText(unit, counter)
  }

  return formatNumberText(unit, counter + 1);
}

function main() {
  console.log("Starting performance test for exceptions...");
  console.log("Iterations:", formatNumberText(MAX_ITERATOR))  ;
  console.log("\n");

  const start = +new Date();
  for (let i = 0; i < MAX_ITERATOR; i++) {
    findAgeWithEx();
  }
  const end = +new Date();
  console.log(
    "Exception performance:",
    elapsedTimeInSeconds(start, end),
    "seconds"
  );

  const start2 = +new Date();
  for (let i = 0; i < MAX_ITERATOR; i++) {
    findAgeWithoutEx();
  }
  const end2 = +new Date();
  console.log(
    "No Exception performance:",
    elapsedTimeInSeconds(start2, end2),
    "seconds"
  );

  console.log("Total time:", elapsedTimeInSeconds(start, end2), "seconds");
}

main();
