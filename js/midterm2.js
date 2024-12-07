const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert("Please enter a task!");
    } else {
        createTaskElement(taskText);
        inputBox.value = '';
    }
}

function createTaskElement(taskText) {
    const li = document.createElement("li");

    const checkCircle = document.createElement("span");
    checkCircle.classList.add("check-circle");
    checkCircle.onclick = () => toggleChecked(li);

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editTask(taskSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(li);

    li.appendChild(checkCircle);
    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);
}

function toggleChecked(taskElement) {
    taskElement.classList.toggle("checked");
}

function deleteTask(taskElement) {
    listContainer.removeChild(taskElement);
}

function editTask(taskSpan) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = taskSpan.textContent;
    input.classList.add("edit-input");

    taskSpan.replaceWith(input);

    input.focus();

    input.addEventListener("blur", () => saveTask(input, taskSpan));
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveTask(input, taskSpan);
        }
    });
}

function saveTask(input, taskSpan) {
    const newText = input.value.trim();
    if (newText !== '') {
        taskSpan.textContent = newText;
        taskSpan.classList.add("task-text");

        input.replaceWith(taskSpan);
    } else {
        alert("Task text cannot be empty!");
        taskSpan.textContent = input.value;
        input.replaceWith(taskSpan);
    }
}