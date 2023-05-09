var show = document.getElementsByClassName("show");
var i;
function showInfo(e) {
  e.classList.toggle("active");
  var description = e.nextElementSibling;
  if (description.style.display === "block") {
    description.style.display = "none";

  } else {
    description.style.display = "block";
  }
}
for (i = 0; i < show.length; i++) {
  show[i].addEventListener("click", (event) => {
    showInfo(event.target);
  });
}
