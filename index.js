import { saveTasks, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')

let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async () => {
  onGetTasks((querySnapshot) => {

    let html = ''

    querySnapshot.forEach(doc => {
      const task = doc.data()
      html += `
            <div class="task-container">
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <div>
              <button class='btn-delete' data-id='${doc.id}'>Delete</button>
              <button class='btn-edit' data-id='${doc.id}'>Edit</button>
              </div>
            </div>
          `
    })

    taskContainer.innerHTML = html

    const btnsDlete = taskContainer.querySelectorAll('.btn-delete')
    btnsDlete.forEach(btn => {
      btn.addEventListener('click', (e) => {
        deleteTask(e.target.dataset.id)
      })
    })

    const btnsEdit = document.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id)
        const task = doc.data()

        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description

        editStatus = true
        id = e.target.dataset.id

        taskForm['btn-task-save'].innerText = 'Update'
      })
    })

  })
})




taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  if (!editStatus) {
    saveTasks(title.value, description.value)
  } else {
    updateTask(id, {
      title: title.value,
      description: description.value
    })

    editStatus = false
  }

  taskForm.reset()
  taskForm.focus()
}) 