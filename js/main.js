const button = document.getElementById("colorButton");

button.addEventListener("click", () => {
  const colors = ["#f8d7da", "#d4edda", "#d1ecf1", "#fff3cd", "#f0f2f5"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;

});