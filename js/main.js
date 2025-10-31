// main.js

// Load header
fetch('components/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
  })
  .catch(error => console.error('Error loading header:', error));

// Load footer and then set up color palette logic
fetch('components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;

    // After footer is loaded, set color and palette logic
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
      document.body.style.backgroundColor = savedColor;
      const footer = document.querySelector("footer");
      if (footer) footer.style.backgroundColor = savedColor;
    }

    // 🎨 Select all palette buttons (now they exist)
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
  })
  .catch(error => console.error('Error loading footer:', error));
