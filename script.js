document.addEventListener("DOMContentLoaded", function () {
  var list = document.getElementById("list");
  var add_task = document.getElementById("add_task");
  var submit_btn = document.getElementById("submit");

  submit_btn.onclick = () => {
    var div = document.createElement("div");
    div.className = "list_item";
    var li = document.createElement("li");
    li.textContent = add_task.value;
    var delete_btn = document.createElement("button");

    delete_btn.type = "button";
    delete_btn.textContent = "delete";
    delete_btn.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(li);
    div.appendChild(delete_btn);
    list.appendChild(div);
    add_task.value = "";
  };
});
