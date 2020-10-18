window.onresize = function resize() {
  let elementHeight = document.getElementById("windowHeight");
  let elementWidth = document.getElementById("windowWidth");
  let newHeight = window.innerHeight;
  let newWidth = window.innerWidth;
  elementHeight.textContent = "Window height: " + newHeight
  elementWidth.textContent = "Window width: " + newWidth;
  console.log("New height is " + newHeight);
  console.log("New width is " + newWidth);
}
