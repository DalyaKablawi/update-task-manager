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

//sets task ID and stores to local storage
function generateTaskId() {
  nextId++;
  localStorage.setItem("ID", nextId);
  return nextId;
}

//reads tasks from local storage and creates empty array of tasks if no tasks exist
function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

//sets tasks created to local storage
function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskCard(task) {
  //creates div for task card that will store dynamically created HTML for title, description and due date
  const taskCard = $("<div>")
    .addClass("card task-card draggable my-3")
    .attr("data-task-id", task.id);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.description);
  const cardDueDate = $("<p>").addClass("card-text").text(task.date);
  //creates delete button with event listener to delete task card when clicked
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger btn-delete-task")
    .text("Delete")
    .attr("data-task-id", task.id);
  cardDeleteBtn.on("click", handleDeleteTask);

  //if task has a due date and the status is not defined as done, classes are added to tasks to render styles according to README styling
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
  //adds task card description, due date and delete button to card body and title and body to task card div.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

//renders task cards on the page by going through each task and appending the task to the appropriate swim lane.
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
  //allows tasks to be dragged from one swim lane to another
  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
  });
}

//this function reads user input to set values to task properties.
function handleAddTask(event) {
  event.preventDefault();
  const title = titleEl.val();
  const description = descriptionEl.val();
  const deadline = deadlineEl.val();

  //this object sets user input to obect properties of newTask object
  const newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    deadline: deadline,
    status: "to-do",
  };

  //this pushes the new task to the array of objects read from local storage and renders a new task list with the incremental task added
  const tasks = readTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  renderTaskList();

  //this empties the form fields in the modal
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
//deletes card body when delete button clicked
cardBodyEl.on("click", ".btn-delete-task", handleDeleteTask);

//upon page load, and clicking on the add task button, the modal form appears with the form fields for the user to input data regarding the new task.
$(document).ready(function () {
  $("#taskModal").dialog({
    autoOpen: false,
    modal: true,
    width: 400,
  });

  $("#formSubmit").on("click", function () {
    $("#taskModal").dialog("open");
  });
  //once submitted the handleAddTask function is triggered and the tasks are added and rendered on the page
  addTaskFormEl.on("submit", handleAddTask);
  renderTaskList();
  //this is the datepicker function from jquery ui which allows users to select month and year of the task due date
  $("#task-date").datepicker({
    changeMonth: true,
    changeYear: true,
  });
  //this allows anything with class lane to be droppable and accepts those with class draggable to be dropped. the handleDrop function facilitates this
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});
