const actions = ["1", "2", "3", "4", "5", "6", "7", "8"];

var buttonValues = [];

const moreActions = [["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"], ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8"], ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8"], ["4-1", "4-2", "4-3", "4-4", "4-5", "4-6", "4-7", "4-8"], ["5-1", "5-2", "5-3", "5-4", "5-5", "5-6", "5-7", "5-8"], ["6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-7", "6-8"], ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-7", "7-8"], ["8-1", "8-2", "8-3", "8-4", "8-5", "8-6", "8-7", "8-8"]];

const buttons = [document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3"), document.getElementById("btn4")];
const cancelButton = document.getElementById("cancel-btn");
const nextButton = document.getElementById("next-btn");

var setNum = 0;
var subNum = 0;
const maxSetNum = actions.length/buttons.length -1;

const convertToValues = [
  function() {
    if (buttonValues == moreActions[subNum]) {
      console.log(buttons[0].value);
    }
    if (buttonValues[0+setNum*buttons.length] == actions[0+setNum*buttons.length]) {
      subNum = 0+setNum*buttons.length;
      setMoreOptions();
    }
  },
  function() {
    if (buttonValues == moreActions[subNum]) {
      console.log(buttons[1].value);
    }
    if (buttonValues[1+setNum*buttons.length] == actions[1+setNum*buttons.length]) {
      subNum = 1+setNum*buttons.length;
      setMoreOptions();
    }
  },
  function() {
    if (buttonValues == moreActions[subNum]) {
      console.log(buttons[2].value);
    }
    if (buttonValues[2+setNum*buttons.length] == actions[2+setNum*buttons.length]) {
      subNum = 2+setNum*buttons.length;
      setMoreOptions();
    }
  },
  function() {
    if (buttonValues == moreActions[subNum]) {
      console.log(buttons[3].value);
    }
    if (buttonValues[3+setNum*buttons.length] == actions[3+setNum*buttons.length]) {
      subNum = 3+setNum*buttons.length;
      setMoreOptions();
    }
  },
];

function setButtonValues() {
  for (var i=0; i<buttons.length; i++) {
    buttons[i].innerHTML = buttonValues[i+setNum*buttons.length];
    buttons[i].value = buttonValues[i+setNum*buttons.length];
  }
}

function setActions() {
  buttonValues = actions;
  setNum = 0;
  setButtonValues();
}

function setMoreOptions() {
  buttonValues = moreActions[subNum];
  setNum = 0;
  setButtonValues();
}

function nextSet() {
  setNum++;

  if (setNum > maxSetNum) {
    setNum = 0;
  }

  setButtonValues();
}

cancelButton.addEventListener("click", setActions);
nextButton.addEventListener("click", nextSet);

for (var i=0; i<buttons.length; i++) {
  buttons[i].addEventListener("click", convertToValues[i]);
}

setActions();