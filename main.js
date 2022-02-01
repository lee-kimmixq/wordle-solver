const changeColour = (inputBox) => {
  if (inputBox.classList.contains("colour-bl")) {
    inputBox.classList.replace("colour-bl", "colour-yl");
  } else if (inputBox.classList.contains("colour-yl")) {
    inputBox.classList.replace("colour-yl", "colour-gr");
  } else if (inputBox.classList.contains("colour-gr")) {
    inputBox.classList.replace("colour-gr", "colour-bl");
  }
};

const lockOrCheckRow = (lockBtn) => {
  if (lockBtn.innerText === "") return;
  const ansToLock = document.body
    .querySelector(`#row${lockBtn.id[3]}`)
    .querySelectorAll("input");
  let ansWord = "";
  ansToLock.forEach((input) => {
    ansWord = ansWord + input.value;
  });
  // check if guess is valid
  if (!guessArr.includes(ansWord) && !ansArr.includes(ansWord)) {
    const alertDiv = document.querySelector("#alert-div");
    alertDiv.innerHTML = `<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg> <span>Invalid Guess!</span>`;
    alertDiv.classList.add("alert-danger");
    console.log("invalid guess");
    return;
  }
  if (lockBtn.innerText === "LOCK") {
    // lock textbox, activate el for colours
    ansToLock.forEach((input) => {
      input.setAttribute("readonly", "true");
      input.addEventListener("click", (event) => {
        changeColour(event.currentTarget);
      });
    });
    lockBtn.innerText = "CHECK";
    lockBtn.classList.replace("btn-outline-warning", "btn-outline-success");
    document.querySelector("#msg-div").innerHTML = "";
  } else if (lockBtn.innerText === "CHECK") {
    const colourArr = ["B", "B", "B", "B", "B"];
    ansToLock.forEach((input) => {
      const index = Number(input.id.slice(3)) % 5;
      input.setAttribute("disabled", "true");
      if (input.classList.contains("colour-yl")) {
        colourArr[index] = "Y";
      }
      if (input.classList.contains("colour-gr")) {
        colourArr[index] = "G";
      }
    });
    lockBtn.innerText = "";
    lockBtn.classList.replace("btn-outline-success", "btn-dark");
    analyseAns(ansWord, colourArr);
  }
};

const initBoard = () => {
  const containerDiv = document.createElement("div");
  document.body.appendChild(containerDiv);
  containerDiv.id = "container";
  containerDiv.classList.add("container");

  for (let i = 0; i < 6; i += 1) {
    const newRow = document.createElement("div");
    containerDiv.appendChild(newRow);
    newRow.classList.add("ans-row");
    newRow.classList.add("row");
    newRow.id = `row${i}`;
    for (let j = 0; j < 5; j += 1) {
      const newInputBox = document.createElement("input");
      newRow.appendChild(newInputBox);
      newInputBox.classList.add("input-box");
      newInputBox.classList.add("col");
      newInputBox.classList.add("colour-bl");
      newInputBox.id = `box${5 * i + j}`;
      newInputBox.setAttribute("type", "text");
      newInputBox.setAttribute("maxlength", "1");
      newInputBox.setAttribute("required", "true");
      newInputBox.onkeyup = (e) => {
        if (
          e.target.value.length >= 1 &&
          Number(e.target.id.slice(3)) % 5 !== 4
        ) {
          document
            .querySelector(`#box${Number(e.target.id.slice(3)) + 1}`)
            .focus();
        }
      };
    }
    const lockBtn = document.createElement("button");
    newRow.appendChild(lockBtn);
    lockBtn.classList.add("col");
    lockBtn.classList.add("btn");
    lockBtn.classList.add("btn-outline-warning");
    lockBtn.id = `btn${i}`;
    lockBtn.innerText = "LOCK";
    lockBtn.addEventListener("click", (event) => {
      lockOrCheckRow(event.currentTarget);
    });
  }
};

const resetBoard = () => {
  document.querySelector(".container").remove();
  initBoard();
};

const initMsgBoard = () => {
  const msgDiv = document.createElement("div");
  document.body.appendChild(msgDiv);
  msgDiv.id = "msg-div";
  msgDiv.classList.add("container");
  msgDiv.classList.add("overflow-auto");
  msgDiv.classList.add("text-wrap");
};

initBoard();
initMsgBoard();
