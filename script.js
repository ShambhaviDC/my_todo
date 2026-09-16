// Helper function to format today's date
function getFormattedCurrentDate() {
    const today = new Date();
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return today.toLocaleDateString('en-GB', dateOptions);
}

// Function to check and update the empty state message
function updateEmptyState() {
    const listsContainer = document.getElementById('listsContainer');
    const emptyState = document.getElementById('emptyState');
    if (listsContainer.children.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

// Function to create a complete Todo List card
function createTodoList(title = "To do List") {
    const listsContainer = document.getElementById('listsContainer');
    const formattedDate = getFormattedCurrentDate();

    // 1. Create the main card element
    const card = document.createElement('div');
    card.className = 'todo-card';

    // 2. Set the HTML structure for this card (including top-right "X" delete button)
    card.innerHTML = `
        <div class="date-header">
            <span class="current-date">${formattedDate}</span>
            <button class="delete-list-btn" type="button" title="Delete this list">&times;</button>
        </div>
        <div class="card-content">
            <h1 class="card-title">${title}</h1>
            <ul class="task-list"></ul>
            <div class="add-task-container">
                <input 
                    type="text" 
                    class="task-input" 
                    placeholder="add task ..." 
                    autocomplete="off"
                />
                <button type="button" class="add-btn">Add</button>
            </div>
        </div>
    `;

    // 3. Find the interactive elements inside this card
    const deleteBtn = card.querySelector('.delete-list-btn');
    const taskList = card.querySelector('.task-list');
    const taskInput = card.querySelector('.task-input');
    const addBtn = card.querySelector('.add-btn');

    // 4. Delete the entire list when clicking the top-right "X" button
    deleteBtn.addEventListener('click', () => {
        card.remove();
        updateEmptyState();
    });

    // Track if a task in this list is currently being edited
    let editingSpan = null;

    // 5. Function to add a new task or update an edited task
    function addOrUpdateTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        if (editingSpan) {
            // If editing an existing task, update its text directly
            editingSpan.textContent = taskText;
            editingSpan = null; // Exit edit mode
        } else {
            // Create a brand new task
            const li = document.createElement('li');
            li.className = 'task-item';

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = taskText;
            span.title = 'Click to edit task';

            // When user clicks the task text, bring it back down to the input box to edit
            span.addEventListener('click', () => {
                taskInput.value = span.textContent;
                taskInput.focus();
                editingSpan = span;
            });

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';

            // Checkbox strikethrough toggle
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    li.classList.add('completed');
                } else {
                    li.classList.remove('completed');
                }
            });

            li.appendChild(span);
            li.appendChild(checkbox);
            taskList.appendChild(li);
        }

        // Clear input box and maintain focus
        taskInput.value = '';
        taskInput.focus();
    }

    // Add or update task when clicking "Add" or pressing "Enter"
    addBtn.addEventListener('click', addOrUpdateTask);
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addOrUpdateTask();
        }
    });

    // 6. Append the card to the container and update empty state
    listsContainer.appendChild(card);
    updateEmptyState();
}

// Set up page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Create the initial Todo List card on page load
    createTodoList();

    // 2. Set up the floating "+" button to add more Todo Lists
    const addListBtn = document.getElementById('addListBtn');
    if (addListBtn) {
        addListBtn.addEventListener('click', () => {
            createTodoList();
        });
    }
});