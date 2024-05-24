const taskKey = '@tasks'

function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  appendTasksLi();
  form.reset()
}

window.addEventListener('DOMContentLoaded', () => {
  appendTasksLi();
})

function appendTasksLi() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `<li id="${task.id}">
                      <h2>${task.title}</h2><p>${task.description}</p>
                      <button class="button-edit" title="Editar tarefa">✏️</button>
                    </li>`)
    .join('');

  insertEventsInButtons();
}

function insertEventsInButtons() {
  document.querySelectorAll('.button-edit').forEach(button => {
    button.addEventListener('click', () => openModalEdit(button.parentElement.id));
});
}

function openModalEdit(id) {
  const dialog = document.querySelector('.dialog');

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  let task = tasks.filter(task => task.id == id);

  if (task.length === 0) {
    return;
  }
  
  task = task[0];

  const titleEdit = document.querySelector('#title-edit');
  titleEdit.value = task.title;
  const descriptionEdit = document.querySelector('#description-edit');
  descriptionEdit.value = task.description;

  dialog.id = id;
  dialog.showModal();

}

function resetDialog(event) {
  event.preventDefault();

  const dialog = document.querySelector('.dialog');
  dialog.close();
}

function editTask(event) {
  event.preventDefault();

  const dialog = document.querySelector('.dialog');

  const form = document.querySelector('#taskFormEdit')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  let task = tasks.filter(task => task.id == dialog.id);

  if (task.length === 0) {
    return;
  }
  
  task = task[0];
  task.title = taskTitle;
  task.description = taskDescription;

  localStorage.setItem(taskKey, JSON.stringify(tasks));
  appendTasksLi();

  dialog.removeAttribute('id');
  dialog.close();
}
