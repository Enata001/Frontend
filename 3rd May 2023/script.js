var count = 1;
function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}
function onDrop(event) {
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}
function onDragOver(event) {
  if (event.target.className === "tasks-container") {
    event.preventDefault();
  }
}

document.addEventListener("click", (e) => {
  let button = e.target;
  var task;
  if (button.textContent === "+ Add a card") {
    task = document.createElement("div");
    task.className = "task";
    task.id = count.toString();
    task.setAttribute("draggable", "true");
    task.style.fontWeight = "bold";
    task.style.fontSize = "15px";
    button.previousElementSibling.appendChild(task);
    let textinfo = document.createElement("input");
    textinfo.type = "text";
    textinfo.placeholder = "Type a task here..";
    textinfo.id = "text-info";
    task.appendChild(textinfo);
    button.className = "add-task";
    button.textContent = "Save card";
    count++;
    task.addEventListener("dragstart", (event) => {
      onDragStart(event);
    });
  } else if (button.textContent === "Save card") {
    button.classList.remove("add-task");
    button.classList.add("add-a-card");
    button.textContent = "+ Add a card";
  }
});
