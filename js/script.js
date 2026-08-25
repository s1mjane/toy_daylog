// const currentMonthElement = document.getElementById("current-month");
// const calendarDaysElement = document.getElementById("calendar-days");

// const prevMonthButton = document.getElementById("prev-month");
// const nextMonthButton = document.getElementById("next-month");

// let currentDate = new Date();

// function renderCalendar() {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     currentMonthElement.textContent = `${year}년 ${month + 1}월`;

//     calendarDaysElement.innerHTML = "";

//     const firstDay = new Date(year, month, 1).getDay();
//     const lastDate = new Date(year, month + 1, 0).getDate();

//     // 이전 달 빈 칸
//     for (let i = 0; i < firstDay; i++) {
//         const emptyDay = document.createElement("div");
//         emptyDay.classList.add("day", "empty");

//         calendarDaysElement.appendChild(emptyDay);
//     }

//     // 현재 달 날짜
//     for (let date = 1; date <= lastDate; date++) {
//         const dayElement = document.createElement("div");

//         dayElement.classList.add("day");
//         dayElement.textContent = date;

//         calendarDaysElement.appendChild(dayElement);
//     }
// }

// prevMonthButton.addEventListener("click", () => {
//     currentDate.setMonth(currentDate.getMonth() - 1);

//     renderCalendar();
// });

// nextMonthButton.addEventListener("click", () => {
//     currentDate.setMonth(currentDate.getMonth() + 1);

//     renderCalendar();
// });

// renderCalendar();