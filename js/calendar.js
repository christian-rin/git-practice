document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.getElementById("monthYear");
  const calendarBody = document.querySelector("#calendarBody tbody");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  function renderCalendar(month, year) {
    // Month and year label
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Clear previous cells
    calendarBody.innerHTML = "";

    // First day of the month
    const firstDay = new Date(year, month, 1).getDay();
    // Number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      // Always 6 weeks
      let row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        let cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > daysInMonth) {
          cell.textContent = "";
        } else {
          cell.textContent = date;

          // Highlight today
          if (
            date === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
          ) {
            cell.classList.add("today");
          }

          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  prevBtn.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextBtn.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  renderCalendar(currentMonth, currentYear);
});
