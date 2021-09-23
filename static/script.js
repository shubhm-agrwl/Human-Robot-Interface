// The list of actions displayed on the buttons in the main menu
const actions = ["Pick up", "Open/Close", "Switch on/off", "Feed", "Plug in/out", "6", "7", "8"];

// The values of the buttons. This list changes depending on which menu the user is on
var buttonValues = [];

// The list of lists actions displayed on the buttons in the sub menu. Each list corresponds to a button on the main menu
const moreActions = [
  ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"], 
  ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8"], 
  ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8"], 
  ["4-1", "4-2", "4-3", "4-4", "4-5", "4-6", "4-7", "4-8"], 
  ["5-1", "5-2", "5-3", "5-4", "5-5", "5-6", "5-7", "5-8"], 
  ["6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-7", "6-8"], 
  ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-7", "7-8"], 
  ["8-1", "8-2", "8-3", "8-4", "8-5", "8-6", "8-7", "8-8"]
];

// Defines all the buttons
const buttons = [document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3"), document.getElementById("btn4")];
const cancelButton = document.getElementById("cancel-btn");
const nextButton = document.getElementById("next-btn");

// The number of the set of 4 option the user is currently on
var setNum = 0;
// The specific sub menu the user is currently on
var subNum = 0;
// The maximum number if sets based on how many button values are available
const maxSetNum = actions.length/buttons.length -1;

// A list consisting of one function per button. This takes the button input and converts it into its value rather than just its button number (1, 2, 3, or 4)
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

// A function that updates the button HTML values to match its buttonValue
function setButtonValues() {
  for (var i=0; i<buttons.length; i++) {
    buttons[i].innerHTML = buttonValues[i+setNum*buttons.length];
    buttons[i].value = buttonValues[i+setNum*buttons.length];
  }
}

// A function that sends the user back to the main menu
function setActions() {
  buttonValues = actions;
  setNum = 0;
  setButtonValues();
}

// A function that sends the user to the corresponding sub menu
function setMoreOptions() {
  buttonValues = moreActions[subNum];
  setNum = 0;
  setButtonValues();
}

// A function that changes the buttons to display the next set of values
function nextSet() {
  setNum++;

  if (setNum > maxSetNum) {
    setNum = 0;
  }

  setButtonValues();
}

// Adds listeners to send input when the buttons are clicked
cancelButton.addEventListener("click", setActions);
nextButton.addEventListener("click", nextSet);
for (var i=0; i<buttons.length; i++) {
  buttons[i].addEventListener("click", convertToValues[i]);
}

setActions();

let win = document.getElementById("window"); // pop-up window
let currentAction; // saved 'task' value
let currentObject; // saved 'object' value

// send data on click
function sendData(btnIndex) {
  // isAction clarifies whether the button is a 'task' or an 'object'
  let isAction = false;

  const button = buttons[btnIndex];
  const value = button.value;

  // check if value is a 'task' or an 'object'
  for(let i=0; i<actions.length; i++) {
    // save current action if value is a 'task'
    if(value === actions[i]) {
      isAction = true;
      currentAction = value;
      break;
    }
  }

  // send obj & act if button is an 'object'
  if(!isAction) {
    win.style.display = "flex";
    currentObject = value;
    // send empty string for query response
    return loadXMLDoc(currentObject, currentAction, "");
  }
}

// compilation of possible objects
const possibleObjects = ["Fruit", "Computer", "Cup", "Paper", "Pen", "Bottle", "Door", "Lamp", "Box", "Phone", "Charger", "Light switch", "Jar", "Bowl", "Plate"];

// list of paragraph elements in objects-detected list (6)
const objectsDetected = document.getElementsByClassName("object");

// record all objects as they are added to objects-detected list to ensure no repeats
let currentObjectsList = [];

// declare randomIndex variable to be accessed in filling objects-detected list with random objects
let randomIndex;

// fill objects-detected list with random objects
for(let i=0; i<objectsDetected.length; i++) {

  // check if random object is already listed in objects-detected list
  do {
    randomIndex = Math.floor(Math.random() * possibleObjects.length);
  } while(currentObjectsList.includes(randomIndex));

  // add object to current showing of objects-detected list
  currentObjectsList.push(randomIndex);
  
  // change objects-detected list to display object
  objectsDetected[i].innerHTML = possibleObjects[randomIndex];
}

// close query window
function closeQuery(responseID) {
  win.style.display = "none";
  let response;
  if(responseID == 1) {
    response = document.getElementById("response1").innerHTML;
  }
  else {
    response = document.getElementById("response2").innerHTML;
  }
  return loadXMLDoc(currentObject, currentAction, response);
}