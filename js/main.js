// main.js

// Load saved color and apply to body & footer
const savedColor = localStorage.getItem("bgColor");
if (savedColor) {
  document.body.style.backgroundColor = savedColor;

  const footer = document.querySelector("footer");
  if (footer) footer.style.backgroundColor = savedColor;
}

// 🎨 Select all palette buttons
const colorButtons = document.querySelectorAll(".color-btn");

colorButtons.forEach((btn) => {
  const chosenColor = btn.dataset.color;

  // Highlight the saved color on load
  if (savedColor && savedColor === chosenColor) {
    btn.classList.add("selected");
  }

  btn.addEventListener("click", () => {
    // Remove highlight from all buttons
    colorButtons.forEach((b) => b.classList.remove("selected"));

    // Highlight the clicked button
    btn.classList.add("selected");

    // Apply color
    document.body.style.backgroundColor = chosenColor;
    const footer = document.querySelector("footer");
    if (footer) footer.style.backgroundColor = chosenColor;

    // Save to localStorage
    localStorage.setItem("bgColor", chosenColor);
  });
});
