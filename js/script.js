const currentDateElement = document.getElementById("current-date");
const prevDateButton = document.getElementById("prev-date");
const nextDataButton = document.getElementById("next-date");

let currentDate = new Date();

const diaryData = {
    "2026-08-25": {
        promise: "오늘은 JavaScript 공부를 열심히 하자.",
        diary: "웹개발 토이프로젝트를 시작했다.",
        gratitude: "오늘도 새로운 것을 배울 수 있어서 감사하다.",
        compliment: "모르는 것도 직접 찾아가며 공부했다.",
        reflection: "코드를 따라 치기만 하지 말고 직접 이해하자.",
        lesson: "작은 기능부터 하나씩 만드는 것이 중요하다."
    },

    "2026-08-26": {
        promise: "오늘은 운동도 꼭 하자.",
        diary: "오늘은 JavaScript의 DOM을 공부했다.",
        gratitude: "날씨가 좋아서 산책할 수 있었다.",
        compliment: "어려워도 끝까지 공부했다.",
        reflection: "집중력이 조금 부족했다.",
        lesson: "코드는 직접 작성해봐야 이해가 된다."
    }
};


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

function getDateKey() {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
}

function renderDiary() {

	const dateKey = getDateKey();
	const data = diaryData[dateKey];

	if (!data) {
		document.getElementById("promise").value = "";
		document.getElementById("diary").value = "";
		document.getElementById("gratitude").value = "";
		document.getElementById("compliment").value = "";
		document.getElementById("reflection").value = "";
		document.getElementById("lesson").value = "";

		return;
	}

	document.getElementById("promise").value = data.promise;
    document.getElementById("diary").value = data.diary;
    document.getElementById("gratitude").value = data.gratitude;
    document.getElementById("compliment").value = data.compliment;
    document.getElementById("reflection").value = data.reflection;
    document.getElementById("lesson").value = data.lesson;
}


prevDateButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() - 1);
	renderDate();
	renderDiary();
})

nextDataButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() + 1);
	renderDate();
	renderDiary();
})

renderDate();
renderDiary();