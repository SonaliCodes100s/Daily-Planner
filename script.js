const taskInput = document.getElementById('taskInput');
const timeInput = document.getElementById('timeInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const tabs = document.querySelectorAll('.tab');

let tasks = [];

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.tab.active').classList.remove('active');
    tab.classList.add('active');
    showTasks(tab.dataset.tab);
  });
});

function addTask() {
  if (taskInput.value.trim() === '') return;

  const task = {
    text: taskInput.value,
    completed: false,
    time: timeInput.value
  };

  tasks.push(task);
  taskInput.value = '';
  timeInput.value = '';
  showTasks('all');
  updateStats();
}

function showTasks(filter) {
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
  if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span>${task.text} ${task.time ? `<small style="font-size: 0.7rem;">(${task.time})</small>` : ''}</span>
      <div class="buttons">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateProgress();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  showTasks(document.querySelector('.tab.active').dataset.tab);
  updateStats();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks(document.querySelector('.tab.active').dataset.tab);
  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  document.getElementById('totalCount').innerText = total;
  document.getElementById('completedCount').innerText = completed;
  document.getElementById('remainingCount').innerText = remaining;
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  document.getElementById('progress').style.width = `${percentage}%`;
}
