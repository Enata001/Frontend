let editor = document.querySelector(".editor");
let output = document.querySelector("#output-list");
let theme = document.querySelector(".theme");
var editing_console = ace.edit("editor");
var mode=["ace/theme/sqlserver", "ace/theme/cloud9_night"]
editing_console.setTheme(mode[0]);
const run = document.querySelector(".run");
const reset = document.querySelector(".reset");
const defaultMessage = 'console.log("Hello World!")';
editing_console.setValue(defaultMessage);
editing_console.getSession().setMode("ace/mode/javascript");
editing_console.setOptions({
  fontSize: "11pt",
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
});
editing_console.session.setUseWrapMode(true);
let consoleMessages = [];

function clearConsoleScreen() {
  consoleMessages.length = 0;
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }
}
function printToConsole() {
  consoleMessages.forEach((log) => {
    const newLogItem = document.createElement("li");
    const newLogText = document.createElement("pre");
    newLogText.textContent = `> ${log.message}`;
    newLogItem.appendChild(newLogText);
    output.appendChild(newLogItem);
  });
}
run.addEventListener("click", () => {
    clearConsoleScreen();
  const algorithm = editing_console.getValue();
  try {
    new Function(algorithm)();
  } catch (err) {
    console.error(err);
  }
  printToConsole()
});
reset.addEventListener("click", () => {
  editing_console.setValue(defaultMessage);
  clearConsoleScreen();
});
var buttons = document.querySelectorAll('.button');
var i;
var container = document.querySelector('.container');
var outputScreen = document.querySelector('.output');
theme.addEventListener('click', () => {
  if (theme.textContent ==="Dark Mode") {
    theme.textContent ="Light Mode"
    editing_console.setTheme(mode[1]);
  }
  else if (theme.textContent ==="Light Mode") {
    theme.textContent ="Dark Mode"
    editing_console.setTheme(mode[0]);
    
  }
  document.body.classList.toggle('dark-mode');
  for (i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('dark');
  }
  container.classList.toggle('dark')
  outputScreen.classList.toggle('dark');
})
