// Retrieve tasks and nextId from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
if (!nextId) {
  nextId = 1;
}
const titleEl = $("#task-title");
const descriptionEl = $("#task-description");
const deadlineEl = $("#task-date");
const cardBodyEl = $(".card-body");
const addTaskFormEl = $("#taskForm");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  nextId++;
}

function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskCard(task) {
  const taskCard = $("<div>")
    .addClass("card task-card draggable my-3")
    .attr("data-task-id", task.id);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.description);
  const cardDueDate = $("<p>").addClass("card-text").text(task.date);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger btn-delete-task")
    .text("Delete")
    .attr("data-task-id", task.id);
  cardDeleteBtn.on("click", handleDeleteTask);

  if (task.date && task.status !== "done") {
    const now = dayjs();
    const taskDueDate = dayjs(task.date, "DD/MM/YYYY");

    if (now.isSame(taskDueDate, "day")) {
      taskCard.addClass("bg-warning text-white");
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass("bg-danger text-white");
      cardDeleteBtn.addClass("border-light");
    }
  }

  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

function renderTaskList() {
  const tasks = readTasksFromStorage();
  const todoList = $("#todo-cards");
  todoList.empty();
  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();
  const doneList = $("#done-cards");
  doneList.empty();

  for (task of tasks) {
    if (task.status === "to-do") {
      todoList.append(createTaskCard(task));
    } else if (task.status === "in-progress") {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === "done") {
      doneList.append(createTaskCard(task));
    }
  }

  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
  });
}

function handleAddTask(event) {
  event.preventDefault();
  const title = titleEl.val();
  const description = descriptionEl.val();
  const deadline = deadlineEl.val();

  const newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    deadline: deadline,
    status: "to-do",
  };

  const tasks = readTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage();
  $("#taskModal").dialog("close");
  renderTaskList();

  titleEl.val(" ");
  descriptionEl.val(" ");
  deadlineEl.val(" ");
}

function handleDeleteTask(event) {
  const taskId = $(this).attr("data-task-id");
  const tasks = readTasksFromStorage();
  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  saveTasksToStorage();
  renderTaskList();
}

function handleDrop(event, ui) {
  const tasks = readTasksFromStorage();
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;
  for (let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTaskList();
}

cardBodyEl.on("click", ".btn-delete-task", handleDeleteTask);

$(document).ready(function () {
  $("#taskModal").dialog({
    autoOpen: false,
    modal: true,
    width: 400,
  });

  // Open modal when button is clicked
  $("#formSubmit").on("click", function () {
    $("#taskModal").dialog("open");
  });
  addTaskFormEl.on("submit", handleAddTask);
  renderTaskList();

  $("#task-date").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});
