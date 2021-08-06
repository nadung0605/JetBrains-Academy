// Click menu item function
function activeMenuItem(item) {
  // Remove active item
  let menuItem = document.getElementsByClassName("menu-item");
  for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].classList.remove("active");
  }

  // Close menu if it is opening
  if (innerWidth <= 1024) {
    changeIcon();
    closeMenu();
  }

  // Active selected item
  item.parentNode.classList.toggle("active");
}

// Show pop-up window function
function openWindow(index) {
  // Show pop-up window
  let popUp = document.getElementById("pop-up");
  popUp.style.display = "flex";

  // Show information of each project
  let h1 = popUp.querySelector(".window h1");
  let a = popUp.querySelector(".window .link a");

  h1.textContent = index === 0 ? "Flash Cards" : "Virtual Piano";
  a.textContent = index === 0 ? "flashcards" : "virtualpiano";
}

// Close pop-up window function
function closeWindow() {
  document.getElementById("pop-up").style.display = "none";
}

// Change menu icon function
function changeIcon() {
  document.querySelector(".menu").classList.toggle("change");

  // Show menu
  document.querySelector(".hamburger").style.display = openingMenu
    ? "flex"
    : "none";

  // Change state of menu
  openingMenu = openingMenu ? false : true;
}

// Close menu function
function closeMenu() {
  document.querySelector(".hamburger").style.display = "none";
}

// Set Home item is default
document.getElementById("default-item").classList.add("active");

// When user click menu icon
let openingMenu = true;
document.querySelector(".menu").addEventListener("click", changeIcon);

// When user click open project button
let openBtn = document.getElementsByClassName("open-window");

for (let i = 0; i < openBtn.length; i++) {
  openBtn[i].onclick = function () {
    openWindow(i);
  };
}

// When user click close project button
document.getElementById("close").addEventListener("click", closeWindow);
