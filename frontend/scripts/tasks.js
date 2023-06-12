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

function apiCall(method, route, data) {
  const apiUrl = `https://localhost:3000 ${route}`;

  fetch(apiUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
}

function saveTasks() {
  var tasks = [];
  const listItems = document.getElementsByClassName("list_item");
  for (var i = 0; i < listItems.length; i++) {
    tasks.push(listItems[i].querySelector("li").textContent);
  }
  apiCall("POST", "tasks/save_tasks", tasks);
}

//console.log(username);

function loadTasks(taskList) {
  const saveTasks = localStorage.getItem("tasks");
  if (saveTasks) {
    const tasks = JSON.parse(saveTasks);
    for (var i = 0; i < tasks.length; i++) newTask(tasks[i], taskList);
  }

  /*
    fetch backend to get user tasks

    //backend
    const temp = User.findOne({username: req.body.username})
    res.send(name.Tasks)

    //frontend
    .then(data)=>{
      if(data){
        const tasks = JSON.parse(data)
        for (var i = 0; i < tasks.length; i++) newTask(tasks[i], taskList);
      }
    }


  */
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
