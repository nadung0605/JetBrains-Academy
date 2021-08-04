// When user click OK button
document
  .getElementById("unlock-button")
  .addEventListener("click", checkPassword);

// When user click launch button
document
  .getElementById("launch-button")
  .addEventListener("click", launchRocket);

// Check entered password function
function checkPassword() {
  // Get entered password
  let password = document.getElementById("password").value;

  // If password is accepted
  if (password === "TrustNo1") {
    // Get all input tag
    let input = document.getElementsByTagName("input");

    // Set disabled property of input to false
    // except password, OK button and Launch button
    for (let i = 2; i < 13; i++) {
      input[i].disabled = false;
    }

    // Disable password field and ok button
    document.getElementById("password").disabled = true;
    document.getElementById("unlock-button").disabled = true;
  }
}

// Check conditions to launch function
function readyToLaunch() {
  let ready = true;

  // Get all check buttons
  let checkButtons = document.getElementsByClassName("check-button");

  // Condition 1: All check-buttons are checked
  for (let i = 0; i < checkButtons.length; i++) {
    if (!checkButtons[i].checked) {
      ready = false;
      break;
    }
  }

  // Get all levers
  let levers = document.getElementsByClassName("lever");

  // Condition 2: All lever are set to the highest
  for (let i = 0; i < levers.length; i++) {
    if (Number(levers[i].value) < Number(levers[i].max)) {
      ready = false;
      break;
    }
  }

  // If all conditions are well then enable launch button
  document.getElementById("launch-button").disabled = ready ? false : true;
}

// Launch rocket function
function launchRocket() {
  // Get rocket and its position
  let rocket = document.getElementById("rocket");
  let left = 200;
  let bottom = 200;

  // Move rocket in a straight line
  let intervalId = setInterval(function () {
    // If rocket is out of space then stop moving
    if (left >= innerWidth || bottom >= innerHeight) {
      clearInterval(intervalId);
    } else {
      // Calculate bottom position base on left postion
      left++;
      bottom = 200 + Math.tan((65 * Math.PI) / 180) * (left - 200);
      rocket.style.left = left + "px";
      rocket.style.bottom = bottom + "px";
    }
  }, 10);
}
