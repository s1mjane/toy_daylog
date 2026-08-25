const currentDateElement = document.getElementById("current-date");
const prevDateButton = document.getElementById("prev-date");
const nextDataButton = document.getElementById("next-date");

let currentDate = new Date();

function renderDate() {

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1; // +1 이유?
	const date = currentDate.getDate();

	const weekdays = [
		"일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"
	]

	const day = weekdays[currentDate.getDay()];

	currentDateElement.textContent = `${year}년 ${month}월 ${date}일 ${day}`;
}

prevDateButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() - 1);
	renderDate();
})

nextDataButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() + 1);
	renderDate();
})

renderDate();