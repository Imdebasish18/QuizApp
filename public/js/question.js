let serverData = null;

function selectOption(choice) {
  var options = document.querySelectorAll(".option");
  options.forEach(function (option, index) {
    if (index + 1 === choice) {
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
    }
  });
}
function alert() {
  let message = document.querySelector(".alert");
  message.textContent = "A simple danger alert—check it out!";
}

// console.log(questionData);

// Client-side code (yourScript.js)
document.addEventListener("DOMContentLoaded", function () {
  // Access the server-side data from the hidden element
  var serverDataElement = document.getElementById("serverData");
  serverData = JSON.parse(serverDataElement.textContent);
  //   let data = document.querySelector(".viewData");
  //   data.textContent = serverData;
});
