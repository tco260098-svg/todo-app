const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// The list of todos, loaded from the browser's storage on startup
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save the current list to the browser's storage
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Redraw the whole list on the page from the data
function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    // Clicking the task text toggles it done / not done
    const text = document.createElement("span");
    text.textContent = todo.text;
    text.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      save();
      render();
    });

    // Clicking the × deletes the task
    const del = document.createElement("span");
    del.textContent = "\u00d7";
    del.classList.add("delete");
    del.addEventListener("click", () => {
      todos.splice(index, 1);
      save();
      render();
    });

    li.append(text, del);
    list.appendChild(li);
  });
}

// Submitting the form (Add button) creates a new task
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text: text, done: false });
  input.value = "";
  save();
  render();
});

render();
