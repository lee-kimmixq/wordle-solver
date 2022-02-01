const possibleAnsArr = [...ansArr];

const getAllIndexes = (word, idx) => {
  const indexes = [];
  for (let i = 0; i < word.length; i += 1) {
    if (word[i] === word[idx] && i !== idx) indexes.push(i);
  }
  return indexes;
};

const getIdxOfClosestNum = (arr, goal, except) => {
  const num = arr.reduce((prev, curr) =>
    !except.includes(curr) && Math.abs(curr - goal) < Math.abs(prev - goal)
      ? curr
      : prev
  );
  return arr.indexOf(num);
};

const getTryArr = (tally, arr, diff) => {
  const arr2 = [...arr];
  const wordsToRemove = [];
  arr2.forEach((word) => {
    if (!word.includes(diff)) {
      wordsToRemove.push(word);
    }
  });
  wordsToRemove.forEach((word) => {
    arr2.splice(arr2.indexOf(word), 1);
  });
  return arr2;
};

const analysePosAns = (posArr) => {
  const tryArr = [...posArr];
  const ltrTally = {};
  tryArr.forEach((word) => {
    const ltrArr = word.split("");
    const uniqueArr = [];
    ltrArr.forEach((ltr) => {
      if (!uniqueArr.includes(ltr)) {
        uniqueArr.push(ltr);
      }
    });
    uniqueArr.forEach((ltr) => {
      if (ltr in ltrTally) {
        ltrTally[ltr] += 1;
      } else {
        ltrTally[ltr] = 1;
      }
    });
  });
  console.log(ltrTally);
  const except = [];
  const diffLtr =
    Object.keys(ltrTally)[
      getIdxOfClosestNum(Object.values(ltrTally), tryArr.length / 2, except)
    ];
  except.push(ltrTally[diffLtr]);
  console.log(except);
  console.log(diffLtr, ltrTally[diffLtr]);
  const tryArr2 = getTryArr(ltrTally, tryArr, diffLtr);
  console.log(tryArr2);
  if (tryArr2.length === 0) return tryArr;
  if (tryArr2.length === 1) return tryArr2;
  const diffLtr2 =
    Object.keys(ltrTally)[
      getIdxOfClosestNum(Object.values(ltrTally), tryArr.length / 2, except)
    ];
  except.push(ltrTally[diffLtr2]);
  console.log(except);
  console.log(diffLtr2, ltrTally[diffLtr2]);
  const tryArr3 = getTryArr(ltrTally, tryArr2, diffLtr2);
  console.log(tryArr3);
  if (tryArr3.length === 0) return tryArr2;
  if (tryArr3.length === 1) return tryArr3;
  const diffLtr3 =
    Object.keys(ltrTally)[
      getIdxOfClosestNum(Object.values(ltrTally), tryArr.length / 2, except)
    ];
  except.push(ltrTally[diffLtr3]);
  console.log(except);
  console.log(diffLtr3, ltrTally[diffLtr3]);
  const tryArr4 = getTryArr(ltrTally, tryArr3, diffLtr3);
  console.log(tryArr4);
  if (tryArr4.length === 0) return tryArr3;
  return tryArr4;
};

const analyseAns = (curWord, curColours) => {
  const wrongLtrs = [];
  const mustLtrs = [];
  const ansData = [[], [], [], [], []];

  var temp = "This is a string.";
  const toMatch = "is";
  const regex = new RegExp(`${toMatch}`, "g");
  console.log(regex);
  var count = (temp.match(regex) || []).length;
  console.log(count);

  // update data
  curColours.forEach((colour, idx) => {
    const letterToMatch = new RegExp(`${curWord[idx]}`, "g");
    const numLtrsInWord = (curWord.match(letterToMatch) || []).length;
    let haveOtherYG = false;
    getAllIndexes(curWord, idx).forEach((index) => {
      if (curColours[index] === "Y" || curColours[index] === "G") {
        haveOtherYG = true;
      }
    });
    if (
      colour === "B" &&
      !wrongLtrs.includes(curWord[idx]) &&
      (numLtrsInWord < 2 || (numLtrsInWord > 1 && !haveOtherYG))
    ) {
      wrongLtrs.push(curWord[idx]); // letter is WRONG if colour = B and (no other occurence or other occurence not yg)
    } else if (colour === "Y") {
      ansData[idx].push(curWord[idx]); // letter at WRONG POS
      mustLtrs.push(curWord[idx]); // letter needs to exist in word
    } else if (colour === "G") {
      // remove words that dont have 'green' letters in the right place
      const wordsToRemoveGr = [];
      possibleAnsArr.forEach((word) => {
        if (word[idx] !== curWord[idx]) {
          wordsToRemoveGr.push(word);
        }
      });
      wordsToRemoveGr.forEach((word) => {
        possibleAnsArr.splice(possibleAnsArr.indexOf(word), 1);
      });
    }
  });
  curColours.forEach((colour, idx) => {
    if (colour === "G") {
      ansData[idx] = []; // clear ansData for green pos
    }
  });
  // remove wrong word
  if (
    curColours !== ["G", "G", "G", "G", "G"] &&
    possibleAnsArr.includes(curWord)
  ) {
    possibleAnsArr.splice(possibleAnsArr.indexOf(curWord), 1);
  }
  // remove words that contain 'black' letters
  wrongLtrs.forEach((ltr) => {
    const wordsToRemoveBl = [];
    possibleAnsArr.forEach((word) => {
      if (word.includes(ltr)) {
        wordsToRemoveBl.push(word);
      }
    });
    wordsToRemoveBl.forEach((word) => {
      possibleAnsArr.splice(possibleAnsArr.indexOf(word), 1);
    });
  });

  ansData.forEach((pos, idx) => {
    // remove words that contain 'yellow' letters in the wrong place
    const wordsToRemoveYl = [];
    possibleAnsArr.forEach((word) => {
      pos.forEach((ltr) => {
        if (word[idx] === ltr) {
          wordsToRemoveYl.push(word);
        }
      });
    });
    wordsToRemoveYl.forEach((word) => {
      possibleAnsArr.splice(possibleAnsArr.indexOf(word), 1);
    });
  });
  // remove words that don't contain 'yellow' letters at all
  mustLtrs.forEach((ltr) => {
    const wordsToRemoveYl2 = [];
    possibleAnsArr.forEach((word) => {
      if (!word.includes(ltr)) {
        wordsToRemoveYl2.push(word);
      }
    });
    wordsToRemoveYl2.forEach((word) => {
      possibleAnsArr.splice(possibleAnsArr.indexOf(word), 1);
    });
  });
  const wordsToTry = analysePosAns(possibleAnsArr);
  console.log("words to try:", wordsToTry);
  document.querySelector(
    "#msg-div"
  ).innerHTML += `<br> ** WORDS TO TRY (${wordsToTry.length}): <br>`;
  wordsToTry.forEach((ans) => {
    document.querySelector("#msg-div").innerHTML += `${ans}  `;
  });
  console.log("possible ans:", possibleAnsArr);
  document.querySelector(
    "#msg-div"
  ).innerHTML += `<br><br> ** ALL POSSIBLE ANSWERS (${possibleAnsArr.length}): <br>`;
  possibleAnsArr.forEach((ans) => {
    document.querySelector("#msg-div").innerHTML += `${ans}  `;
  });
};
