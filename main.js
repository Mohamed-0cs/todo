
let tasks = []; // Array to hold task objects

function addTask() { // Function to add a new task
  const input = document.getElementById("taskInput");
  const name = input.value.trim();

  if (name === "") return;

  tasks.push({
    name: name,
    done: false,
  });

  input.value = "";
  renderTasks();
}

// Generate HTML for a task item
function generateTaskHTML(task, index) {
  return `
    <div class='d-flex justify-content-between align-items-start mt-2'>
      <span class='mt-2 flex-grow-1'>${task.name}</span>
      <div class='d-flex flex-column ms-3'>
        <button class='btn btn-primary d-block w-100 mb-2' onclick='toggleTaskStatus(${index})'>Toggle</button>
        <button class='btn btn-danger d-block w-100' onclick='deleteTask(${index})'>Delete</button>
      </div>
    </div>
  `;
}

function renderTasks() { // Function to render the task list
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = generateTaskHTML(task, index);

    if (task.done) {
      li.querySelector("span").style.textDecoration = "line-through";
    }

    list.appendChild(li);
  });
}

function toggleTaskStatus(index) { // Function to toggle the status of a task
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) { // Function to delete a task
  tasks = tasks.filter((_, i) => i !== index);
  renderTasks();
  console.log(tasks);
}

// Check if all tasks are done every 10 seconds
setInterval(() => {
  const allDone = tasks.length > 0 && tasks.every(task => task.done);
  if (allDone) {
    console.log("All tasks done!");
  }
}, 10000);
