const MAX_ITERATOR = 1000000; // 1 million

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

function main () {
  const start = +new Date();
  for (let i = 0; i < MAX_ITERATOR; i++) {
    findAgeWithEx();
  }
  const end = +new Date();
  console.log(end - start);

  const start2 = +new Date();
  for (let i = 0; i < MAX_ITERATOR; i++) {
    findAgeWithoutEx();
  }
  const end2 = +new Date();
  console.log(end2 - start2);
}

main();