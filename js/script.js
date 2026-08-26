const currentDateElement = document.getElementById("current-date");
const prevDateButton = document.getElementById("prev-date");
const nextDateButton = document.getElementById("next-date");

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

function getDateKey() {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
}

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

function renderDiary() {

	const dateKey = getDateKey();
	const data = diaryData[dateKey];

	if (!data) {
		document.getElementById("promise").value = "";
		document.getElementById("diary").value = "";
		document.getElementById("memo").value = "";
		document.getElementById("gratitude").value = "";
		document.getElementById("compliment").value = "";
		document.getElementById("reflection").value = "";
		document.getElementById("lesson").value = "";
		document.getElementById("tomorrow").value = "";
		
		return;
	}

    document.getElementById("promise").value = data.promise || "";
    document.getElementById("diary").value = data.diary || "";
    document.getElementById("memo").value = data.memo || "";
    document.getElementById("gratitude").value = data.gratitude || "";
    document.getElementById("compliment").value = data.compliment || "";
    document.getElementById("reflection").value = data.reflection || "";
    document.getElementById("lesson").value = data.lesson || "";
    document.getElementById("tomorrow").value = data.tomorrow || "";
}

function saveDiary() {

	console.log("saveDiary 실행됨");

    const dateKey = getDateKey();

    diaryData[dateKey] = {
        promise: document.getElementById("promise").value,
        diary: document.getElementById("diary").value,
		memo: document.getElementById("memo").value,
        gratitude: document.getElementById("gratitude").value,
        compliment: document.getElementById("compliment").value,
        reflection: document.getElementById("reflection").value,
        lesson: document.getElementById("lesson").value,
		tomorrow: document.getElementById("tomorrow").value,
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(diaryData)
    );
}

function renderTodo() {
	const dateKey = getDateKey;
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
			savedTodo();
			renderDate();
		})

		deleteButton.addEventListener("click", () => {
			deleteTodo(todo.id);
		})

	}
);
}

function addTodo() {
	const text = todoInput.value.trim();
	
	if (text == " ") {
		return;
	}

	const dateKey = getDateKey();

	if (!todoData[dateKey]) {
		todoData[dateKey] = [];
	}

	const newTodo = {
		id: Date.now(),
		text: text,
		completed: false
	};

	todoData[dateKey].push(newTodo);

	savedTodo();
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
	const dateKey = getDateKey();

	todoData[dateKey] = todoData[dateKey].filter((todo) => {
		return todo.id !== id;
	});

	saveTodo();
	renderTodo();
}

prevDateButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() - 1);
	renderDate();
	renderDiary();
	renderTodo();
})

nextDateButton.addEventListener("click", () => {
	currentDate.setDate(currentDate.getDate() + 1);
	renderDate();
	renderDiary();
	renderTodo();
})

const inputs = document.querySelectorAll("textarea");

inputs.forEach((input) => {

    input.addEventListener("input", () => {
        saveDiary();

    });

});

addTodoButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		addTodo();
	}
})

renderDate();
renderDiary();
renderTodo();