export const minimalDistance = (firstWord, secondWord) => {
  const firstWordLength = firstWord.length
  const secondWordLength = secondWord.length
  const distanceMatrix = Array.from({ length: firstWordLength }, () => new Array(secondWordLength))

  const getMatrixValue = (i, j) => {
    if (i < 0 && j < 0) return 0
    if (i < 0) return j + 1
    if (j < 0) return i + 1
    return distanceMatrix[i][j]
  }

  for (let i = 0; i < firstWordLength; i++) {
    for (let j = 0; j < secondWordLength; j++) {
      distanceMatrix[i][j] = Math.min(
        getMatrixValue(i - 1, j) + 1,
        getMatrixValue(i, j - 1) + 1,
        getMatrixValue(i - 1, j - 1) + (firstWord[i] === secondWord[j] ? 0 : 1)
      )
    }
  }

  let minimalDistance = getMatrixValue(firstWordLength - 1, secondWordLength - 1)
  console.log(minimalDistance)
  let currentFirstWordIndex = firstWordLength - 1
  let currentSecondWordIndex = secondWordLength - 1
  const currentWord = Array.from(secondWord)

  console.log(currentWord.join(''))
  while (minimalDistance > 0) {
    const deletionDistance = getMatrixValue(currentFirstWordIndex, currentSecondWordIndex - 1)
    const insertionDistance = getMatrixValue(currentFirstWordIndex - 1, currentSecondWordIndex)
    const replacementDistance = getMatrixValue(currentFirstWordIndex - 1, currentSecondWordIndex - 1)
    if (replacementDistance < minimalDistance) {
      currentWord[currentSecondWordIndex] = firstWord[currentFirstWordIndex]
      currentFirstWordIndex -= 1
      currentSecondWordIndex -= 1
      minimalDistance = replacementDistance
      console.log(currentWord.join(''))
    } else if (deletionDistance < minimalDistance) {
      currentWord.splice(currentSecondWordIndex, 1)
      currentSecondWordIndex -= 1
      minimalDistance = deletionDistance
      console.log(currentWord.join(''))
    } else if (insertionDistance < minimalDistance) {
      currentWord.splice(currentSecondWordIndex + 1, 0, firstWord[currentFirstWordIndex])
      currentFirstWordIndex -= 1
      minimalDistance = insertionDistance
      console.log(currentWord.join(''))
    } else {
      currentFirstWordIndex -= 1
      currentSecondWordIndex -= 1
    }
  }
};

(() => {
  minimalDistance(process.argv[2], process.argv[3])
})()
