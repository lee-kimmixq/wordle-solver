const possibleAnsArr = [...ansArr];

const analyseAns = (curWord, curColours) => {
  const wrongLtrs = [];
  const mustLtrs = [];
  const ansData = [[], [], [], [], []];

  // update data
  curColours.forEach((colour, idx) => {
    if (colour === "B" && !wrongLtrs.includes(curWord[idx])) {
      wrongLtrs.push(curWord[idx]);
    } else if (colour === "Y") {
      ansData[idx].push(curWord[idx]);
      mustLtrs.push(curWord[idx]);
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
      ansData[idx] = [];
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
    // remove words that contain 'yellow' letters in the place
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
  console.log("possible ans:", possibleAnsArr);
  document.querySelector("#msg-div").innerHTML +=
    "<br> ** POSSIBLE ANSWERS: <br>";
  possibleAnsArr.forEach((ans) => {
    document.querySelector("#msg-div").innerHTML += `${ans}  `;
  });
};
