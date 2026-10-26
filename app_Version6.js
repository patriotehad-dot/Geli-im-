const STORAGE_KEY = 'advanced-taskmanager-v2';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const categorySelect = document.getElementById('todo-category');
const prioritySelect = document.getElementById('todo-priority');
const dateInput = document.getElementById('todo-date');

const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const clearCompletedBtn = document.getElementById('clear-completed');

const totalCount = document.getElementById('total-count');
const activeCount = document.getElementById('active-count');
const doneCount = document.getElementById('done-count');
const todayCount = document.getElementById('today-count');
const tomorrowCount = document.getElementById('tomorrow-count');

let todos = loadTodos();
let currentFilter = 'all';
let searchTerm = '';
let sortMode = 'newest';

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getPriorityOrder(priority) {
  const order = { low: 1, medium: 2, high: 3 };
  return order[priority] || 2;
}

function getDateLabel(dateString) {
  if (!dateString) return 'Tarih yok';
  const target = new Date(dateString + 'T00:00:00');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (target.getTime() === today.getTime()) return 'Bugün';
  if (target.getTime() === tomorrow.getTime()) return 'Yarın';
  return dateString;
}

function updateSummary() {
  const total = todos.length;
  const active = todos.filter(t => !t.done).length;
  const done = todos.filter(t => t.done).length;

  const today = todos.filter(todo => {
    if (!todo.date) return false;
    return new Date(todo.date + 'T00:00:00').toDateString() === new Date().toDateString();
  }).length;

  const tomorrow = todos.filter(todo => {
    if (!todo.date) return false;
    const d = new Date(todo.date + 'T00:00:00');
    const now = new Date();
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return d.toDateString() === t.toDateString();
  }).length;

  totalCount.textContent = total;
  activeCount.textContent = active;
  doneCount.textContent = done;
  todayCount.textContent = today;
  tomorrowCount.textContent = tomorrow;
}

function getFilteredTodos() {
  let result = [...todos];

  if (currentFilter === 'active') result = result.filter(t => !t.done);
  if (currentFilter === 'completed') result = result.filter(t => t.done);

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    result = result.filter(t => t.text.toLowerCase().includes(q));
  }

  if (sortMode === 'oldest') {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortMode === 'priority') {
    result.sort((a, b) => getPriorityOrder(b.priority) - getPriorityOrder(a.priority));
  } else {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
}

function render() {
  const visible = getFilteredTodos();

  list.innerHTML = '';

  if (!visible.length) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'Gösterilecek görev yok.';
    list.appendChild(empty);
    updateSummary();
    return;
  }

  visible.forEach(todo => {
    const item = document.createElement('li');
    item.className = `todo-item ${todo.done ? 'done' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.className = 'task-check';
    checkbox.addEventListener('change', () => {
      todo.done = !todo.done;
      saveTodos();
      render();
    });

    const main = document.createElement('div');
    main.className = 'task-main';

    const text = document.createElement('span');
    text.className = `task-text ${todo.done ? 'done' : ''}`;
    text.textContent = todo.text;
    text.addEventListener('dblclick', () => startEdit(todo.id, text));

    const meta = document.createElement('div');
    meta.className = 'task-meta';

    const category = document.createElement('span');
    category.className = `category-pill category-${todo.category}`;
    category.textContent = {
      work: 'İş',
      personal: 'Kişisel',
      study: 'Eğitim'
    }[todo.category];

    const priority = document.createElement('span');
    priority.className = `priority-pill priority-${todo.priority}`;
    priority.textContent = {
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek'
    }[todo.priority];

    const date = document.createElement('span');
    date.textContent = getDateLabel(todo.date);

    meta.appendChild(category);
    meta.appendChild(priority);
    meta.appendChild(date);

    main.appendChild(text);
    main.appendChild(meta);

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Sil';
    deleteBtn.setAttribute('aria-label', `Sil: ${todo.text}`);
    deleteBtn.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      render();
    });

    item.appendChild(checkbox);
    item.appendChild(main);
    item.appendChild(deleteBtn);

    list.appendChild(item);
  });

  updateSummary();
}

function startEdit(id, element) {
  const currentText = element.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'task-text';
  input.style.width = '100%';

  element.replaceWith(input);
  input.focus();
  input.select();

  const save = () => {
    const newValue = input.value.trim();
    if (newValue) {
      const todo = todos.find(t => t.id === id);
      if (todo) todo.text = newValue;
      saveTodos();
    }
    render();
  };

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') save();
    if (event.key === 'Escape') render();
  });

  input.addEventListener('blur', save);
}

function addTodo(text, category, priority, date) {
  const trimmed = text.trim();
  if (!trimmed) return;

  todos.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text: trimmed,
    category,
    priority,
    date,
    done: false,
    createdAt: new Date().toISOString()
  });

  saveTodos();
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(input.value, categorySelect.value, prioritySelect.value, dateInput.value);
  form.reset();
  prioritySelect.value = 'medium';
  input.focus();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    render();
  });
});

searchInput.addEventListener('input', (event) => {
  searchTerm = event.target.value.trim();
  render();
});

sortSelect.addEventListener('change', (event) => {
  sortMode = event.target.value;
  render();
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.done);
  saveTodos();
  render();
});

render();