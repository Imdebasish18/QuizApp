document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Add click event listener to the button
  scrollToTopBtn.addEventListener("click", function () {
    // Scroll the document to the top position
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  });
});

let buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Show an alert dialog when the button is clicked
    alert("Join us for free and play the quize!");
  });
});
