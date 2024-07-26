function countLetters(input) {
  if (typeof input !== "string") {
    return { error: "Invalid input" };
  }

  let uppercaseCount = 0;
  let lowercaseCount = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i].toUpperCase() === input[i]) {
      uppercaseCount++;
    } else if (input[i].toLowerCase() === input[i]) {
      lowercaseCount++;
    }
  }

  return {
    uppercase: uppercaseCount,
    lowercase: lowercaseCount,
  };
}

module.exports = countLetters;
