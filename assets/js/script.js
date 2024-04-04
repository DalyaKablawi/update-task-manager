// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $(
    <div class="card text-center">
      <div class="card-header" id="task-id">
        ${task.id}
      </div>
      <div class="card-body">
        <h4 class="card-title" id="task-title">
          ${task.title}
        </h4>
        <p class="card-text" id="task-description">
          ${task.description}
        </p>
        <p class="card-text" id="task-date">
          ${task.date}
        </p>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
  );
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $("#todo-cards").empty();
  $("#in-progress-cards").empty();
  $("done-cards").empty();

  taskList.forEach((task) => {
    const card = createTaskCard(task);
    $(`#${task.status}-cards`).append(card);
  });

  $(".card").draggable({});
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
