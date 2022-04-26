let knowledgeBase;

// execute after selecting object button
// determine whether to show query pop-up
function loadXMLDoc(obj, act) {
  var req = new XMLHttpRequest();

  // link to ajax
  req.open("POST", "/ajax");
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // send object and task to backend
  var postVars = '{"object":"' + obj + '", "action":"' + act + '"}';
  req.send(postVars);

  req.onreadystatechange = function () {
    if (req.readyState == 1) {
      if (req.status != 200) {
        // error handling code here
      }
    } else if (req.readyState == 4) {
      // check for empty response
      if (req.responseText != "") {
        var response = JSON.parse(req.responseText);
        console.log("SAVED RESPONSE: " + response + " > " + obj);
        win.style.display = "none";
      } else if (knowledgeBase[obj]["op1"] === "") {
        // check if additional info is needed
        const win = document.getElementById("window");
        win.style.display = "none";
        // confirm that button was selected
        console.log(obj + " was selected.");
      } else {
        // set pop-up title
        document.getElementById("query").innerHTML = obj;

        // set pop-up response options
        document.getElementById("response1").innerHTML =
          knowledgeBase[obj]["op1"];
        document.getElementById("response1").value = knowledgeBase[obj]["op1"];
        document.getElementById("response2").innerHTML =
          knowledgeBase[obj]["op2"];
        document.getElementById("response2").value = knowledgeBase[obj]["op2"];

        // show pop-up window
        const win = document.getElementById("window");
        win.style.display = "flex";
      }
    }
  };
  return false;
}

// execute after selecting query option from pop-up
// save response in knowledge base
function loadXMLDoc2(obj, response) {
  var req = new XMLHttpRequest();

  // link to ajax2
  req.open("POST", "/ajax2");
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // send object and response to backend
  var postVars = '{"object":"' + obj + '", "response":"' + response + '"}';
  req.send(postVars);

  req.onreadystatechange = function () {
    if (req.readyState == 1) {
      if (req.status != 200) {
        // error handling code here
      }
    } else if (req.readyState == 2) {
      console.log("SAVING: " + response + " > " + obj);
    }
  };
  return false;
}

// populate buttons
function loadXMLDoc3() {
  var req = new XMLHttpRequest();

  // link to ajax3
  req.open("POST", "/ajax3");
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.send();

  req.onreadystatechange = function () {
    if (req.readyState == 1) {
      if (req.status != 200) {
        // error handling code here
      }
    } else if (req.readyState == 4) {
      // receive knowledge base
      knowledgeBase = JSON.parse(req.responseText);

      // initialize empty button values
      for (let i = 0; i < 8; i++) {
        actions[i] = "-";
      }

      // array of specifications for each object in knowledgeBase
      let specifications = Object.values(knowledgeBase);
      let cIndex = 0;

      let categories = [];

      for (let i = 0; i < specifications.length; i++) {
        let cat = specifications[i]["cat"];
        categories.push(cat);
        // add category to actions list if not already present
        if (actions.includes(cat) == false) {
          actions[cIndex] = cat;
          cIndex++;
        }
      }

      let objects = Object.keys(knowledgeBase);
      possibleObjects = objects;
      fillObjectsDetected();

      // loop through category buttons
      for (let i = 0; i < actions.length; i++) {
        let cat = actions[i];
        // loop through list of all categories
        // find all objects in category
        let objNum = 0;
        for (let c = 0; c < categories.length; c++) {
          if (categories[c] === cat) {
            // add object to moreActions list
            moreActions[i][objNum] = objects[c];
            objNum++;
          }
        }
      }

      setActions();
    }
  };
  return false;
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
  ["-", "-", "-", "-", "-", "-", "-", "-"],
];

// Defines all the buttons
const buttons = [
  document.getElementById("btn1"),
  document.getElementById("btn2"),
  document.getElementById("btn3"),
  document.getElementById("btn4"),
];
const cancelButton = document.getElementById("cancel-btn");
const nextButton = document.getElementById("next-btn");

// The number of the set of 4 option the user is currently on
var setNum = 0;
// The specific sub menu the user is currently on
var subNum = 0;
// The maximum number if sets based on how many button values are available
const maxSetNum = actions.length / buttons.length - 1;

// A list consisting of one function per button. This takes the button input and converts it into its value rather than just its button number (1, 2, 3, or 4)
const convertToValues = [
  function () {
    if (buttonValues == moreActions[subNum]) {
      //console.log(buttons[0].value);
    }
    if (
      buttonValues[0 + setNum * buttons.length] ==
      actions[0 + setNum * buttons.length]
    ) {
      subNum = 0 + setNum * buttons.length;
      setMoreOptions();
    }
  },
  function () {
    if (buttonValues == moreActions[subNum]) {
      //console.log(buttons[1].value);
    }
    if (
      buttonValues[1 + setNum * buttons.length] ==
      actions[1 + setNum * buttons.length]
    ) {
      subNum = 1 + setNum * buttons.length;
      setMoreOptions();
    }
  },
  function () {
    if (buttonValues == moreActions[subNum]) {
      //console.log(buttons[2].value);
    }
    if (
      buttonValues[2 + setNum * buttons.length] ==
      actions[2 + setNum * buttons.length]
    ) {
      subNum = 2 + setNum * buttons.length;
      setMoreOptions();
    }
  },
  function () {
    if (buttonValues == moreActions[subNum]) {
      //console.log(buttons[3].value);
    }
    if (
      buttonValues[3 + setNum * buttons.length] ==
      actions[3 + setNum * buttons.length]
    ) {
      subNum = 3 + setNum * buttons.length;
      setMoreOptions();
    }
  },
];

// A function that updates the button HTML values to match its buttonValue
function setButtonValues() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = buttonValues[i + setNum * buttons.length];
    buttons[i].value = buttonValues[i + setNum * buttons.length];
    //re-enables the buttons (after timeout)
    buttons[i].disabled = false;
    buttons[i].style = null;
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
for (var i = 0; i < buttons.length; i++) {
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
  for (let i = 0; i < actions.length; i++) {
    // save current action if value is a 'task'
    if (value === actions[i]) {
      isAction = true;
      currentAction = value;
      break;
    }
  }

  // send obj & act if button is an 'object'
  if (!isAction) {
    //disables buttons (timeout)
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
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
  for (let i = 0; i < objectsDetected.length; i++) {
    // check if random object is already listed in objects-detected list
    do {
      randomIndex = Math.floor(Math.random() * possibleObjects.length);
    } while (currentObjectsList.includes(randomIndex));

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
  if (responseID == 1) {
    response = document.getElementById("response1").innerHTML;
  } else {
    response = document.getElementById("response2").innerHTML;
  }
  return loadXMLDoc2(currentObject, response);
}

/* VOICE RECOGNITION ENGINE CODE */

/*
Grammar can be used for Microsoft Edge. For Google Chrome, grammar/contexts do not work.

var voiceWords = [
  "Pick up",
  "Plug in",
  "On",
  "Off",
  "Fork",
  "Switch",
  "Fork",
  "Spoon",
  "Hinge",
  "Slide",
];
var grammar =
  "#JSGF V1.0; grammar voiceWords; public <voiceWord> = " +
  voiceWords.join(" | ") +
  " ;";

*/

if ("webkitSpeechRecognition" in window) {
  // Speech Recognition Stuff goes here

  // Reference - https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
  var para = document.getElementById("Voice_Listener");
  var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  var speechRecognition = new SpeechRecognition();
  // Adding Grammar to speech Recognition object

  // var speechRecognitionList = new SpeechGrammarList();
  // speechRecognitionList.addFromString(grammar, 1);
  // speechRecognition.grammars = speechRecognitionList;

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = "en-US";
  speechRecognition.maxAlternatives = 1;
} else {
  console.log("Speech Recognition Not Available");
}

// Similar words - To identify words close to each other and improve accuracy for Google's engine.
// Levenshtein Distance gives a count of number of characters two strings differ from.

const levenshteinDistance = (str1, str2) => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
};

// Click Script

// This function receives the recognized word and gives an appropriate DOM button to be clicked.
getValidButton = (button_id) => {
  var punctuationless = button_id.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  var finalButton = punctuationless.replace(/\s{2,}/g, " ").toLowerCase();
  var buttonValues_ = document.querySelectorAll("button");
  //console.log(buttonValues_);
  for (var buttonVal of buttonValues_) {
    buttonVal_ = buttonVal.value.toLowerCase();
    //console.log(buttonVal_);
    if (finalButton === buttonVal_ || buttonVal_.includes(finalButton)) {
      return buttonVal;
    }
  }

  var minDist = 1000; // word length not exceeds 1000
  var wantedButton = null;
  for (var buttonVal of buttonValues_) {
    buttonVal_ = buttonVal.value.toLowerCase();
    var dist = levenshteinDistance(buttonVal_, finalButton);
    if (minDist > dist) {
      minDist = dist;
      wantedButton = buttonVal;
    }
    //console.log(buttonVal_ + " : " + finalButton + " = " + dist);
  }

  if (minDist <= 3) return wantedButton;

  return null;
};

// This function is used to click on the button DOM ID it receives.
function ClickFunction(button_id) {
  //var includes = elements.includes(button_id);
  //console.log(button_id);
  var validButton = null;
  para.innerHTML = button_id;
  validButton = getValidButton(button_id);
  //console.log(validButton);
  if (validButton) {
    //validButton.click();
    //console.log("Clicked button " + validButton.value);
    validButton.click();
  }
}

function ButtonStart() {
  var start_button = document.getElementById("start");
  var stop_button = document.getElementById("stop");
  speechRecognition.start();
  start_button.hidden = true;
  stop_button.hidden = false;
}

function ButtonEnd() {
  var start_button = document.getElementById("start");
  var stop_button = document.getElementById("stop");
  speechRecognition.stop();
  start_button.hidden = false;
  stop_button.hidden = true;
}

// Speech Recognition Scripts

speechRecognition.onstart = () => {
  var para = document.getElementById("Voice_Listener");
  para.hidden = false;
  console.log("Listening to your voice");
};

speechRecognition.onend = () => {
  var para = document.getElementById("Voice_Listener");
  para.hidden = true;
  document.getElementById("stop").click();
  console.log("Stopped listening");
};

speechRecognition.onresult = (event) => {
  var interim_transcript = "";
  var final_transcript = "";
  //console.log(event);
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
      console.log(
        event.results[i][0].transcript +
          " conf: " +
          event.results[i][0].confidence
      );
      console.log(event);
      ClickFunction(event.results[i][0].transcript.trim());
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  /*
  var element = event.results[0][0].transcript;
  console.log(element + " conf: " + event.results[0][0].confidence);
  ClickFunction(element);
  */
};
