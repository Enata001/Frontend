let information = document.getElementById("info");
let button = document.createElement("button");
let container = document.createElement("div");
button.textContent = "Create new note";
button.id = "button";
document.body.appendChild(button);
container.id = "container";
document.body.appendChild(container);
const colours = [
  "rgb(255, 255, 204)",
  "rgb(204, 255, 204)",
  "rgb(204, 204, 255)",
  "rgb(254, 254, 245)",
];

button.addEventListener("click", addNote);

let edit = false;
let target;


function addNote() {

  if(edit){
    target.textContent = information.value;
    button.textContent = "Create new note";
    edit = false;
    target = null;
    information.value = "";
    return
  }

  if (information.value === "") {
    alert("Please enter a note");
  } else {
    let note = document.createElement("div");
    note.className = "note ";
    let textsection = document.createElement("div");
    textsection.id = "textsection ";
    textsection.className = "textsection";
    textsection.innerText = information.value;
    note.appendChild(textsection);
    note.style.backgroundColor = colours[Math.floor(Math.random() * 4)];
    container.appendChild(note);
    let buttons_section = document.createElement("div");
    buttons_section.className = "buttons_section";
    note.appendChild(buttons_section);
    let editor = document.createElement("button");
    let deletor = document.createElement("button");
    editor.textContent = "Edit";
    editor.className = "note_buttons";
    deletor.className = "note_buttons";
    deletor.textContent = "Delete";
    buttons_section.appendChild(editor);
    buttons_section.appendChild(deletor);
    information.value = "";
    deletor.addEventListener("click", () => {
      container.removeChild(note);
    });
    editor.addEventListener("click", (e) => {
      edit = true;
      target = e.target.parentNode.previousSibling;
      information.value = textsection.innerText;
      button.textContent = "Save Edit";
    });
  }
}
