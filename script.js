const actions = ["1", "2", "3", "4", "5", "6", "7", "8"];

var buttonValues = [];

const moreActions = [["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"], ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8"], ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8"], ["4-1", "4-2", "4-3", "4-4", "4-5", "4-6", "4-7", "4-8"]];

var setNum = 0;

const buttons = [document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3"), document.getElementById("btn4")];
const cancelButton = document.getElementById("cancel-btn");
const nextButton = document.getElementById("next-btn");

const convertToValues = [
  function() {
    for (var i=0; i<=buttonValues.length/buttons.length-1; i++) {
      if (setNum == i) {
        if (buttonValues == actions) {
          setMoreOptions[i*buttons.length+0]();
          setButtonValues();
        }
        if (buttonValues == moreActions[0]) {
          console.log(buttons[0].value);
        }
      }
    }
  },
  function() {
    for (var i=0; i<=buttonValues.length/buttons.length-1; i++) {
      if (setNum == i) {
        if (buttonValues == actions) {
          setMoreOptions[i*buttons.length+1]();
          setButtonValues();
        }
        if (buttonValues == moreActions[1]) {
          console.log(buttons[1].value);
        }
      }
    }
  },
  function() {
    for (var i=0; i<=buttonValues.length/buttons.length-1; i++) {
      if (setNum == i) {
        if (buttonValues == actions) {
          setMoreOptions[i*buttons.length+2]();
          setButtonValues();
        }
        if (buttonValues == moreActions[2]) {
          console.log(buttons[2].value);
        }
      }
    }
  },
  function() {
    for (var i=0; i<=buttonValues.length/buttons.length-1; i++) {
      if (setNum == i) {
        if (buttonValues == actions) {
          setMoreOptions[i*buttons.length+3]();
          setButtonValues();
        }
        if (buttonValues == moreActions[3]) {
          console.log(buttons[3].value);
        }
      }
    }
  },
];

function setButtonValues() {
  for (var i=0; i<buttons.length; i++) {
    buttons[i].innerHTML = buttonValues[i];
    buttons[i].value = buttonValues[i];
  }
}

function setActions() {
  buttonValues = actions;
  setNum = 0;
  setButtonValues();
}

const setMoreOptions = [
  function() {
    buttonValues = moreActions[0];
    setButtonValues();
  },
  function() {
    buttonValues = moreActions[1];
    setButtonValues();
  },
  function() {
    buttonValues = moreActions[2];
    setButtonValues();
  },
  function() {
    buttonValues = moreActions[3];
    setButtonValues();
  }
];

function nextSet() {
  setNum++;

  if (setNum > buttonValues.length/buttons.length -1) {
    setNum = 0;
  }

  for (var i=0; i<buttons.length; i++) {
    buttons[i].innerHTML = buttonValues[setNum*buttons.length+i];
    buttons[i].value = buttonValues[setNum*buttons.length+i];
  }
}

cancelButton.addEventListener("click", setActions);
nextButton.addEventListener("click", nextSet);

for (var i=0; i<buttons.length; i++) {
  buttons[i].addEventListener("click", convertToValues[i]);
}

setActions();