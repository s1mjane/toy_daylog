const todayButton = document.getElementById("today-button");

const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

const currentDateElement = document.getElementById("current-date");
const prevDateButton = document.getElementById("prev-date");
const nextDateButton = document.getElementById("next-date");

const promiseInput = document.getElementById("promise");
const diaryInput = document.getElementById("diary");
const memoInput = document.getElementById("memo");
const gratitudeInput = document.getElementById("gratitude");
const complimentInput = document.getElementById("compliment");
const reflectionInput = document.getElementById("reflection");
const lessonInput = document.getElementById("lesson");
const tomorrowInput = document.getElementById("tomorrow");

const calendarTitle = document.getElementById("calendar-title");
const calendar = document.getElementById("calendar");

let currentDate = new Date();

let diaryData = {
    "2026-08-25": {
        promise: "오늘은 JavaScript 공부를 열심히 하자.",
        diary: "웹개발 토이프로젝트를 시작했다.",
        memo: "Daylog 프로젝트를 만들어보고 있다.",
        gratitude: "오늘도 새로운 것을 배울 수 있어서 감사하다.",
        compliment: "모르는 것도 직접 찾아가며 공부했다.",
        reflection: "코드를 따라 치기만 하지 말고 직접 이해하자.",
        lesson: "작은 기능부터 하나씩 만드는 것이 중요하다.",
		tomorrow: "Todo 기능 만들기",
    },

    "2026-08-26": {
        promise: "오늘은 운동도 꼭 하자.",
        diary: "오늘은 JavaScript의 DOM을 공부했다.",
		memo: "DOM 조작 방법을 복습했다.",
        gratitude: "날씨가 좋아서 산책할 수 있었다.",
        compliment: "어려워도 끝까지 공부했다.",
        reflection: "집중력이 조금 부족했다.",
        lesson: "코드는 직접 작성해봐야 이해가 된다.",
		tomorrow: "localStorage 복습하기",
    }
};

let todoData = {};

const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");

const STORAGE_KEY = "daylog-data";
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
    diaryData = JSON.parse(savedData);
}

const TODO_STORAGE_KEY = "daylog-todo";
const savedTodoData = localStorage.getItem(TODO_STORAGE_KEY);

if (savedTodoData) {
	todoData = JSON.parse(savedTodoData);
}

function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function renderDate() {

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const date = currentDate.getDate();

	const weekdays = [
		"일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"
	]

	const day = weekdays[currentDate.getDay()];

	currentDateElement.textContent = `${year}년 ${month}월 ${date}일 ${day}`;
}

function renderCalendar() {
	calendar.innerHTML= ""; // 비우기

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	calendarTitle.textContent = `${year}년 ${month+1}월`;

	const firstDay = new Date(year, month, 1).getDay(); // 이번 달 1일의 요일
	const lastDate = new Date(year, month+1, 0).getDate(); // 이번 달의 마지막 날짜

	for (let i = 0; i < firstDay; i++) { // 첫 주 빈칸
		const emptyDay = document.createElement("div");
		emptyDay.classList.add(
			"calendar-day",
			"empty"
		);
		calendar.appendChild(emptyDay);
	}

	// 날짜 생성
	for (let date = 1; date <= lastDate; date++) { 
		const day = document.createElement("div");
		day.classList.add("calendar-day");
		
		const dateNumber = document.createElement("div");
		dateNumber.classList.add("calendar-date");

		dateNumber.textContent = date;

		day.appendChild(dateNumber);

		const dateKey = `${year}-${String(month+1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

		if (dateKey === getDateKey(currentDate)) { // 선택한 날짜
			day.classList.add("selected");
		}

		const today = new Date();
		const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

		if (dateKey === todayKey) {
			day.classList.add("today");
		}

		const hasDiary = diaryData[dateKey] && Object.values(diaryData[dateKey]).some(value => value.trim() !== "");
		const hasTodo = todoData[dateKey] && todoData[dateKey].length > 0;

		if (hasDiary || hasTodo) {
			const indicators = document.createElement("div");
			indicators.classList.add("calendar-indicators");

			if (hasDiary) {
				const diaryIndicator = document.createElement("span");
				diaryIndicator.textContent = "📔"
				indicators.appendChild(diaryIndicator);
			}

			if (hasTodo) {
				const todoIndicator = document.createElement("span");
				todoIndicator.textContent = "📋";
				indicators.appendChild(todoIndicator);
			}

			day.append(indicators);
		}

		day.addEventListener("click", () => {
			currentDate = new Date(year, month, date);
			renderDate();
			renderDiary();
			renderTodo();
			renderCalendar();
		});

		calendar.appendChild(day);
	}
}

function renderDiary() {

	const dateKey = getDateKey(currentDate);
	const data = diaryData[dateKey];

	if (!data) {
		promiseInput.value = "";
		diaryInput.value = "";
		memoInput.value = "";
		gratitudeInput.value = "";
		complimentInput.value = "";
		reflectionInput.value = "";
		lessonInput.value = "";
		tomorrowInput.value = "";
		
		return;
	}

    promiseInput.value = data.promise || "";
    diaryInput.value = data.diary || "";
    memoInput.value = data.memo || "";
    gratitudeInput.value = data.gratitude || "";
    complimentInput.value = data.compliment || "";
    reflectionInput.value = data.reflection || "";
    lessonInput.value = data.lesson || "";
    tomorrowInput.value = data.tomorrow || "";
}

function saveDiary() {

	console.log("saveDiary 실행됨");

    const dateKey = getDateKey(currentDate);

    diaryData[dateKey] = {
        promise: promiseInput.value,
        diary: diaryInput.value,
		memo: memoInput.value,
        gratitude: gratitudeInput.value,
        compliment: complimentInput.value,
        reflection: reflectionInput.value,
        lesson: lessonInput.value,
		tomorrow: tomorrowInput.value,
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(diaryData)
    );
}

function renderTodo() {
	const dateKey = getDateKey(currentDate);
	const todos = todoData[dateKey] || [];
	todoList.innerHTML = "";

	todos.forEach((todo) => {
		const todoItem = document.createElement("div");
		todoItem.classList.add("todo-item");
		
		if (todo.completed) {
			todoItem.classList.add("completed");
		}

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = todo.completed;

		const todoText = document.createElement("span");
		todoText.classList.add("todo-text");
		todoText.textContent = todo.text;

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-todo");
		deleteButton.textContent = "🗑️"

		todoItem.appendChild(checkbox);
		todoItem.appendChild(todoText);
		todoItem.appendChild(deleteButton);

		todoList.appendChild(todoItem);

		checkbox.addEventListener("change", () => {
			todo.completed = checkbox.checked;
			saveTodo();
			renderTodo();
		})

		deleteButton.addEventListener("click", () => {
			deleteTodo(todo.id);
		})

	}
);
}

function addTodo() {
	const text = todoInput.value.trim();
	
	if (text === "") {
		return;
	}

	const dateKey = getDateKey(currentDate);

	if (!todoData[dateKey]) {
		todoData[dateKey] = [];
	}

	const newTodo = {
		id: Date.now(),
		text: text,
		completed: false
	};

	todoData[dateKey].push(newTodo);

	saveTodo();
	renderTodo();

	todoInput.value = "";
}

function saveTodo() {
	localStorage.setItem(
		TODO_STORAGE_KEY,
		JSON.stringify(todoData)
	);
}

function deleteTodo(id) {
	const dateKey = getDateKey(currentDate);

	if (!todoData[dateKey]) {
		return;
	}

	todoData[dateKey] = todoData[dateKey].filter((todo) => {
		return todo.id !== id;
	});

	saveTodo();
	renderTodo();
}

todayButton.addEventListener("click", () => {
	currentDate = new Date();
	renderDate();
	renderDiary();
	renderTodo();
	renderCalendar();
})

prevMonthButton.addEventListener("click", () => {
	currentDate.setMonth(currentDate.getMonth() - 1);
	renderDate();
	renderDiary();
	renderTodo();
	renderCalendar();
})

nextMonthButton.addEventListener("click", () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	renderDate();
	renderDiary();
	renderTodo();
	renderCalendar();
})

prevDateButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() - 1);
	renderDate();
	renderDiary();
	renderTodo();
	renderCalendar();
})

nextDateButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() + 1);
	renderDate();
	renderDiary();
	renderTodo();
	renderCalendar();
})

const inputs = document.querySelectorAll("textarea");

inputs.forEach((input) => {

    input.addEventListener("input", () => {
        saveDiary();

    });

});

addTodoButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		addTodo();
	}
})

renderDate();
renderDiary();
renderTodo();
renderCalendar();