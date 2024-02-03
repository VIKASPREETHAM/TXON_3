var tasks = [];

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  var task = {
    text: taskInput.value,
    completed: false,
  };

  tasks.push(task);

  renderTasks();
  // Clear the input field after adding a task
  taskInput.value = "";
}

function renderTasks(filteredTasks) {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  var tasksToRender = filteredTasks || tasks;

  tasksToRender.forEach(function (task, index) {
    var li = document.createElement("li");
    li.classList.add("task-item");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      updateTaskStatus(index);
    });

    var taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    li.appendChild(checkbox);
    li.appendChild(taskText);

    taskList.appendChild(li);
  });
}

function updateTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function filterTasks(filterType) {
  var filteredTasks = [];

  switch (filterType) {
    case "all":
      filteredTasks = tasks;
      break;
    case "active":
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    default:
      filteredTasks = tasks;
      break;
  }

  renderTasks(filteredTasks);
}
