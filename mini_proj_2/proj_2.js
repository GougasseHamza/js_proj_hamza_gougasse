console.log("Todo List App");

let input = document.getElementById("additems");
let filterInput = document.querySelector('input[name="search"]');
let todoList = document.getElementById("todos");

// Fonction pour ajouter une nouvelle tâche
function additem() {
    let item_to_add = input.value.trim(); 
    if (item_to_add === "") return; 

    let new_html_item = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item_to_add}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    todoList.innerHTML += new_html_item;
    input.value = "";
}


input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        additem();
    }
});

function filterTasks() {
    let searchTerm = filterInput.value.toLowerCase(); 
    let tasks = document.querySelectorAll(".list-group-item"); 
    
    console.log("Filter Term: ", searchTerm);

    tasks.forEach(function (task) {
        let taskText = task.querySelector("span").textContent.toLowerCase(); 
        
        console.log("Task Text: ", taskText); 
        
        if (taskText.includes(searchTerm)) {
            //console.log("Matching task: ", taskText); 
            task.classList.remove("hidden");
        } else {
            //console.log("Hiding task: ", taskText); 
            task.classList.add("hidden");
        }
    });
}

filterInput.addEventListener("input", filterTasks);


todoList.addEventListener("click", function (event) {
    
    if (event.target && event.target.classList.contains("delete")) {
        let li = event.target.closest("li"); 
        li.remove(); 
    }
});
