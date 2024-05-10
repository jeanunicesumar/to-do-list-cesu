function enviarForm(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const task = formData.get('title');
  const description = formData.get('description');

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const objectTask = { title: task, description: description };
  tasks.push(objectTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  form.reset();
  showListTask();
}

function showListTask() {

  
  const divList = document.getElementById("list-task");
  divList.textContent = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    
    const div = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = task.title

    const p = document.createElement('p');
    p.textContent = task.description

    div.appendChild(title);
    div.appendChild(p);

    divList.appendChild(div);

  });

}

document.addEventListener('DOMContentLoaded', function () {
  showListTask();
})