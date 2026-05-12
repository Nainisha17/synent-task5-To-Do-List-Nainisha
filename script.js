const taskInput =
document.getElementById("taskInput");
const taskList =
document.getElementById("taskList")
window.onload = function(){

    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    })
};
function addTask(){
    if(taskInput.value === ""){
        alert("Please enter a task");
        return;
    }
    createTask(taskInput.value, false);
    saveTasks();
    taskInput.value = "";
}
function createTask(taskText, completed){
    const li =
    document.createElement("li");
    const span =
    document.createElement("span");
    span.innerText = taskText;
    if(completed){
        span.classList.add("completed");
    }
    li.appendChild(span);
    const buttons =
    document.createElement("div");
    buttons.classList.add("task-buttons")
    const completeBtn =
    document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = function(){
        span.classList.toggle("completed");
        saveTasks();
    };
    const deleteBtn =
    document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function(){
        li.remove();
        saveTasks();
    }
    buttons.appendChild(completeBtn);
    buttons.appendChild(deleteBtn)
    li.appendChild(buttons);
    taskList.appendChild(li);
}
function saveTasks(){
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed:
            li.querySelector("span")
            .classList.contains("completed")
        });

    });
    localStorage.setItem(
    "tasks",
    JSON.stringify(tasks));
}