const pg1 = document.getElementById("main-options");
const pg2 = document.getElementById("pg2-options");

// next page button
const next = document.getElementById("next-btn");
next.addEventListener("click", nextPage);

function nextPage() {
	pg1.style.display = "none";
	pg2.style.display = "block";
}

// cancel button
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", stopAction);

function stopAction() {
	pg1.style.display = "block";
	pg2.style.display = "none";
}