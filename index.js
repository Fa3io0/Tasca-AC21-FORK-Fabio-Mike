const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');

let tasks = [];

form.addEventListener('submit', afegirTasca);

function afegirTasca(e) {
   e.preventDefault();
   let text = input.value;
   let task = {}
      task.id = Date.now(),
      task.text = text,
      task.completed = false

   tasks.push(task)
   renderTasks();
   input.value = '';
   input.focus();
}

function renderTasks() {
   taskList.innerHTML = '';
   tasks.forEach(task => {
      let li = document.createElement('li');
      li.id = task.id;
      if (task.completed) li.classList.add("completed");
      li.innerHTML = task.text;
      let btn = document.createElement('button');
      btn.innerHTML = 'Esborrar';
      li.append(btn);

      taskList.append(li);
   });
}

taskList.addEventListener('click', function (e) {
   let tagName = e.target.tagName;

   if (tagName === 'BUTTON') {
      let idRemove = e.target.parentElement.id;
      tasks = tasks.filter(task => task.id != idRemove);
      renderTasks();
   } else if (tagName === 'LI') {
      let idComplete = e.target.id;
      tasks = tasks.map(task => {
         if (task.id == idComplete) return {
            ...task,
            "completed": true
         } 
         else {
            return task;
         }
      })
      renderTasks();
   }
})

clearAllBtn.addEventListener('click', function () {
      tasks = [];
      renderTasks();
   })

document.addEventListener('keydown', function (e){
   if (input.value == "" && e.key == "Backspace") {
      tasks.pop();
      renderTasks();
   }
})