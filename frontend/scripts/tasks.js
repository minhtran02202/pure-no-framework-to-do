function newTask(value, taskList) {
  const div = document.createElement("div");
  div.className = "list_item";
  const li = document.createElement("li");
  li.textContent = value;
  const delete_btn = document.createElement("button");

  delete_btn.type = "button";
  delete_btn.textContent = "Done";
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
  const listItems = document.getElementsByClassName("list_item");
  for (var i = 0; i < listItems.length; i++) {
    tasks.push(listItems[i].querySelector("li").textContent);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(taskList) {
  const saveTasks = localStorage.getItem("tasks");
  if (saveTasks) {
    const tasks = JSON.parse(saveTasks);
    for (var i = 0; i < tasks.length; i++) newTask(tasks[i], taskList);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("list");
  loadTasks(taskList);
  const add_task = document.getElementById("add_task");
  const submit_btn = document.getElementById("submit");

  submit_btn.onclick = () => {
    newTask(add_task.value, taskList);
    add_task.value = "";
  };

  add_task.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submit_btn.click();
    }
  });
});
