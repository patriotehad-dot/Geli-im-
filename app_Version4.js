const STORAGE_KEY = 'pro-task-manager-v1';

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

const totalCount = document.getElementById('count-total');
const activeCount = document.getElementById('count-active');
const doneCount = document.getElementById('count-done');

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

function updateSummary() {
  const total = todos.length;
  const active = todos.filter(t => !t.done).length;
  const done = todos.filter(t => t.done).length;

  totalCount.textContent = total;
  activeCount.textContent = active;
  doneCount.textContent = done;
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
    result.sort((a, b) => {
      const order = { low: 1, medium: 2, high: 3 };
      return order[b.priority] - order[a.priority];
    });
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

    const title = document.createElement('span');
    title.className = 'task-text';
    title.textContent = todo.text;

    const meta = document.createElement('div');
    meta.className = 'task-meta';

    const category = document.createElement('span');
    category.className = `category-pill category-${todo.category}`;
    category.textContent = {
      work: 'İş',
      personal: 'Kişisel',
      study: 'Eğitim'
    }[todo.category] || 'Genel';

    const priority = document.createElement('span');
    priority.className = `priority-pill priority-${todo.priority}`;
    priority.textContent = {
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek'
    }[todo.priority];

    const date = document.createElement('span');
    date.textContent = todo.date ? `📅 ${todo.date}` : '📅 Tarih yok';

    meta.appendChild(category);
    meta.appendChild(priority);
    if (todo.date) meta.appendChild(date);

    main.appendChild(title);
    main.appendChild(meta);

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Sil';
    deleteBtn.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      render();
    });

    title.addEventListener('dblclick', () => startEdit(todo.id, title));

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