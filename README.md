# Assignment 05

# Third Party APIs: Task Manager

## Description

The goal of this assignment was to create a task manager that allows users to add tasks to their to-do, in progress and done swim lanes and drag and drop tasks to appropriate swim lanes based on their progress.

I did this by:

- Setting task IDs to distinctly define tasks by ID
- Reading tasks from local storage and creates empty array of tasks if no tasks exist
- Setting tasks created to local storage
- Creating tasks cards by dynamically adding data from modal form into dynamically created divs
- Usind dayjs to identify which swim lanes new tasks belong to based on their due dates
- Setting task cards to be draggable and swim lanes to be droppable to accept dragged task cards
- Calling function to add new tasks and render them on the page upon page reload with event listeners to delete tasks upon clicking delete button

## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria

```md
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## URLs

[GitHub Repo](https://github.com/DalyaKablawi/update-task-manager)

[Deployed Page](https://dalyakablawi.github.io/update-task-manager/)
