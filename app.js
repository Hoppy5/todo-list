let addbutton = document.querySelector(".addbutton");
let saveButton = document.getElementById("saveButton");
let formDiv = document.querySelector(".new-task");
let taskListDiv = document.querySelector(".task-list");

if (!addbutton || !saveButton || !formDiv || !taskListDiv) {
    console.error("Les éléments nécessaires n'ont pas été trouvés dans le DOM.");
}

var tasks = [];

// Affichage du formulaire
addbutton.addEventListener("click", function () {
    formDiv.style.display = "block";
});

// Récupération des données du formulaire
saveButton.addEventListener("click", function () {
    let titlev = document.forms["FormData"]["title"].value;
    let descriptionv = document.forms["FormData"]["description"].value;

    if (titlev && descriptionv) {
        tasks.push({
            "title": titlev,
            "description": descriptionv,
            "status": "Not started"
        });

        // Mettre à jour l'affichage de la liste des tâches
        updateTaskList();

        console.log(tasks);

        // Réinitialiser le formulaire
        document.forms["FormData"].reset();

        // Masquer le formulaire après l'enregistrement
        formDiv.style.display = "none";
    } else {
        alert("Veuillez remplir tous les champs.");
    }
});

// Fonction pour mettre à jour l'affichage de la liste des tâches
function updateTaskList() {
    // Vider le contenu existant avant d'ajouter les tâches mises à jour
    taskListDiv.innerHTML = '';

    for (let [index, task] of tasks.entries()) {
        // Ajouter chaque tâche au conteneur de la liste des tâches
        taskListDiv.innerHTML += `<div class="task">
                <div class="task-title">${task.title}</div>
                <div class="description">${task.description}</div>
                <div class="status">${task.status}</div>
            </div>`;
    }
}
