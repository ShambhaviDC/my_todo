// ==========================================
// Job 1: Display the current date automatically
// ==========================================
function displayCurrentDate() {
    const today = new Date();
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const formattedDate = today.toLocaleDateString('en-GB', dateOptions);
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
}

// ==========================================
// Job 2: Create task list and allow user to add tasks
// ==========================================
function addNewTask() {
    const input = document.getElementById('newTaskInput');
    const taskText = input.value.trim();

    // If the user didn't type anything, do not add an empty item
    if (taskText === '') {
        return;
    }

    // 1. Create the list item <li>
    const li = document.createElement('li');
    li.className = 'task-item';

    // 2. Create the <span> element holding the task text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;

    // 3. Create the checkbox element matching our reference layout
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    // 4. Put the text and checkbox inside the <li>
    li.appendChild(span);
    li.appendChild(checkbox);

    // 5. Add the <li> into the task list on the page
    const taskList = document.getElementById('taskList');
    taskList.appendChild(li);

    // 6. Reset the input box so the user can type the next task
    input.value = '';
    input.focus();
}

// ==========================================
// Event Listeners (runs when page finishes loading)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Show today's date
    displayCurrentDate();

    // Handle "Add" button click
    const addBtn = document.getElementById('addTaskBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addNewTask);
    }

    // Allow user to press "Enter" inside input to add a task
    const input = document.getElementById('newTaskInput');
    if (input) {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                addNewTask();
            }
        });
    }
});