let knowledgeBase;

// execute after selecting object button
// determine whether to show query pop-up
function loadXMLDoc(obj, act) {
  var req = new XMLHttpRequest()
  // document.getElementById("buttons").disabled = true;
  // link to ajax
  req.open('POST', '/ajax')
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  // send object and task to backend
  var postVars = '{"object":"'+obj+'", "action":"'+act+'"}'
  req.send(postVars)

  req.onreadystatechange = function() {
    if (req.readyState == 1) {
      if (req.status != 200) {
        // error handling code here
      }
    } else if (req.readyState == 4) {
      // check for empty response
      if (req.responseText!="") {
        var response = JSON.parse(req.responseText)
        console.log("SAVED RESPONSE: " + response + " > " + obj)
        win.style.display = "none"
      } else if (knowledgeBase[obj]["op1"] === "") {
        // check if additional info is needed
        const win = document.getElementById("window")
        win.style.display = "none"
        // confirm that button was selected
        console.log(obj + " was selected.")
      } else {
        // set pop-up title
        document.getElementById("query").innerHTML = obj;

        // set pop-up response options
        document.getElementById("response1").innerHTML = knowledgeBase[obj]["op1"]
        document.getElementById("response2").innerHTML = knowledgeBase[obj]["op2"]

        // show pop-up window
        const win = document.getElementById("window")
        win.style.display = "flex"
      }
    }
  }
  // document.getElementById("buttons").disabled = false;
  return false
}

// execute after selecting query option from pop-up
// save response in knowledge base
function loadXMLDoc2(obj, response) {
  var req = new XMLHttpRequest()
  
  // link to ajax2
  req.open('POST', '/ajax2')
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  // send object and response to backend
  var postVars = '{"object":"'+obj+'", "response":"'+response+'"}'
  req.send(postVars)

  req.onreadystatechange = function() {
    if (req.readyState == 1) {
      if (req.status != 200) {
        // error handling code here
      }
    } else if (req.readyState == 2) {
      console.log("SAVING: " + response + " > " + obj)
    }
  }
  return false
}

// populate buttons
function loadXMLDoc3() {
  var req = new XMLHttpRequest()
  
  // link to ajax3
  req.open('POST', '/ajax3')
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  
  req.send()

  req.onreadystatechange = function() {
    if (req.readyState == 1) {
      if (req.status != 200) {
        // error handling code here
      }
    } else if (req.readyState == 4) {
      // receive knowledge base
      knowledgeBase = JSON.parse(req.responseText)

      // initialize empty button values
      for(let i=0; i<8; i++) {
        actions[i] = "-";
      }

      // array of specifications for each object in knowledgeBase
      let specifications = Object.values(knowledgeBase);
      let cIndex = 0;

      let categories = [];

      for(let i=0; i<specifications.length; i++) {
        let cat = specifications[i]["cat"];
        categories.push(cat);
        // add category to actions list if not already present
        if(actions.includes(cat) == false) {
          actions[cIndex] = cat;
          cIndex++;
        }
      }

      let objects = Object.keys(knowledgeBase);
      possibleObjects = objects;
      fillObjectsDetected();

      // loop through category buttons
      for(let i=0; i<actions.length; i++) {
        let cat = actions[i];
        // loop through list of all categories
        // find all objects in category
        let objNum = 0;
        for(let c=0; c<categories.length; c++) {
          if(categories[c] === cat) {
            // add object to moreActions list
            moreActions[i][objNum] = objects[c];
            objNum++;
          }
        }
      }

      setActions();
    }
  }
  return false
}

loadXMLDoc3();

// The list of actions displayed on the buttons in the main menu
let actions = ["-", "-", "-", "-", "-", "-", "-", "-"];

// The values of the buttons. This list changes depending on which menu the user is on
var buttonValues = [];

// The list of lists actions displayed on the buttons in the sub menu. Each list corresponds to a button on the main menu
const moreActions = [
  ["-", "-", "-", "-", "-", "-", "-", "-"], 
  ["-", "-", "-", "-", "-", "-", "-", "-"], 
  ["-", "-", "-", "-", "-", "-", "-", "-"], 
  ["-", "-", "-", "-", "-", "-", "-", "-"], 
  ["-", "-", "-", "-", "-", "-", "-", "-"], 
  ["-", "-", "-", "-", "-", "-", "-", "-"], 
  ["-", "-", "-", "-", "-", "-", "-", "-"], 
  ["-", "-", "-", "-", "-", "-", "-", "-"]
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
      //console.log(buttons[0].value);
    }
    if (buttonValues[0+setNum*buttons.length] == actions[0+setNum*buttons.length]) {
      subNum = 0+setNum*buttons.length;
      setMoreOptions();
    }
  },
  function() {
    if (buttonValues == moreActions[subNum]) {
      //console.log(buttons[1].value);
    }
    if (buttonValues[1+setNum*buttons.length] == actions[1+setNum*buttons.length]) {
      subNum = 1+setNum*buttons.length;
      setMoreOptions();
    }
  },
  function() {
    if (buttonValues == moreActions[subNum]) {
      //console.log(buttons[2].value);
    }
    if (buttonValues[2+setNum*buttons.length] == actions[2+setNum*buttons.length]) {
      subNum = 2+setNum*buttons.length;
      setMoreOptions();
    }
  },
  function() {
    if (buttonValues == moreActions[subNum]) {
      //console.log(buttons[3].value);
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
    //re-enables the buttons (after timeout)
    buttons[i].disabled = false;
		buttons[i].style=null;
  }
  document.querySelector('#loading').style.display = 'none';
  document.querySelector('#buttons').style.display = 'flex';
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
    
    //disables buttons (timeout)
    for (var i=0;i<buttons.length;i++){
      buttons[i].disabled = true;
    }
    document.querySelector('#loading').style.display = 'flex';
    document.querySelector('#buttons').style.display = 'none';
    buttons[btnIndex].style.backgroundColor = "#88c8e8";
    setTimeout(setActions, 10000);  

    // win.style.display = "flex";
    currentObject = value;
    return loadXMLDoc(currentObject, currentAction);
  }
}

// compilation of possible objects
let possibleObjects = [];

// list of paragraph elements in objects-detected list (6)
const objectsDetected = document.getElementsByClassName("object");

// record all objects as they are added to objects-detected list to ensure no repeats
let currentObjectsList = [];

// declare randomIndex variable to be accessed in filling objects-detected list with random objects
let randomIndex;

// fill objects-detected list with random objects
function fillObjectsDetected() {
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
  return loadXMLDoc2(currentObject, response);
}