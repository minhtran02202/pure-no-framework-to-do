function newTask(value, taskList) {
  var div = document.createElement("div");
  div.className = "list_item";
  var li = document.createElement("li");
  li.textContent = value;
  var delete_btn = document.createElement("button");

  delete_btn.type = "button";
  delete_btn.textContent = "done";
  delete_btn.addEventListener("click", () => {
    div.remove();
    saveTasks();
  });

  div.appendChild(li);
  div.appendChild(delete_btn);
  taskList.appendChild(div);
  value = "";

  saveTasks();
}

function saveTasks() {
  var tasks = [];
  var listItems = document.getElementsByClassName("list_item");
  for (var i = 0; i < listItems.length; i++) {
    tasks.push(listItems[i].querySelector("li").textContent);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(taskList) {
  var saveTasks = localStorage.getItem("tasks");
  if (saveTasks) {
    var tasks = JSON.parse(saveTasks);
    for (var i = 0; i < tasks.length; i++) newTask(tasks[i], taskList);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  var taskList = document.getElementById("list");
  var add_task = document.getElementById("add_task");
  var submit_btn = document.getElementById("submit");

  submit_btn.onclick = () => {
    newTask(add_task.value, taskList);
    add_task.value = "";
  };

  loadTasks(taskList);
});
