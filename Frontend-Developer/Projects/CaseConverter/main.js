// Get value of textarea
let value = document.querySelector("textarea").value.toString();

// Convert to upper case function
const upperCase = (value) => value.toUpperCase();

// Convert to lower case function
const lowerCase = (value) => value.toLowerCase();

// Convert to proper case function
const properCase = (value) => {
  let arr = value.split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = upperCase(arr[i].charAt(0)).concat(arr[i].slice(1));
  }

  return arr.join(" ");
};

// Convert to sentence case function
const sentenceCase = (value) => {
  let newValue = "";

  for (let i = 0; i < value.length; i++) {
    if (i === 0 || (i >= 2 && [".", "?", "!"].includes(value[i - 2]))) {
      newValue = newValue + upperCase(value[i]);
    } else {
      newValue = newValue + lowerCase(value[i]);
    }
  }

  return newValue;
};

// Get value of textarea function
const getValue = () => document.querySelector("textarea").value.toString();

// Set value for textarea function
function setValue(value) {
  document.querySelector("textarea").value = value;
}

// Download text file function
function download(filename, value) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(value)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// When user click upper-case button
document.getElementById("upper-case").addEventListener("click", function () {
  let value = getValue();
  setValue(upperCase(value));
});

// When user click lower-case button
document.getElementById("lower-case").addEventListener("click", function () {
  let value = getValue();
  setValue(lowerCase(value));
});

// When user click proper-case button
document.getElementById("proper-case").addEventListener("click", function () {
  let value = getValue();
  setValue(properCase(value));
});

// When user click sentence-case button
document.getElementById("sentence-case").addEventListener("click", function () {
  let value = getValue();
  setValue(sentenceCase(value));
});

// When user click save-text-file button
document
  .getElementById("save-text-file")
  .addEventListener("click", function () {
    let value = getValue();
    let filename = "text.txt";
    download(filename, value);
  });
