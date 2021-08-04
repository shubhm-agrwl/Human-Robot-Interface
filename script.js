const next = document.getElementById("next-btn");
next.addEventListener("click", nextPage);

function nextPage() {
	const pg1 = document.getElementById("main-options");
	const pg2 = document.getElementById("pg2-options");

	pg1.style.display = "none";
	pg2.style.display = "block";
}