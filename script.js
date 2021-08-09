const actions = ["1", "2", "3", "4", "5", "6", "7", "8"];
var setNum = 0;

const buttons = [document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3"), document.getElementById("btn4")];

const nextButton = document.getElementById("next-btn");
nextButton.addEventListener("click", changeAction);

for (var i=0; i<buttons.length; i++) {
  buttons[i].innerHTML = actions[i];
  buttons[i].value = actions[i];
}

function changeAction() {
  setNum++;

  if (setNum > actions.length/buttons.length -1) {
    setNum = 0;
  }

  for (var e=0; e<buttons.length; e++) {
    buttons[e].innerHTML = actions[setNum*buttons.length+e];
    buttons[e].value = actions[setNum*buttons.length+e];
  }
}