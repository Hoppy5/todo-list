let addbutton = document.querySelector(".addbutton");
let saveButton = document.getElementById("saveButton");
let formDiv = document.querySelector(".new-task");
let taskListDiv = document.querySelector(".task-list");

if (!addbutton || !saveButton || !formDiv || !taskListDiv) {
    console.error("Les éléments nécessaires n'ont pas été trouvés dans le DOM.");
}

var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Afficher les tâches existantes au chargement de la page
updateTaskList();

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

        // Sauvegarder les tâches dans localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

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

    tasks.forEach(function (task, index) {
        // Créer un élément div pour la tâche
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        // Ajouter les détails de la tâche
        taskDiv.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="description">${task.description}</div>
            <div class="status">
                <select onchange="changeStatus(${index}, this.value)">
                    <option value="Not started" ${task.status === 'Not started' ? 'selected' : ''}>Not started</option>
                    <option value="In progress" ${task.status === 'In progress' ? 'selected' : ''}>In progress</option>
                    <option value="Finished" ${task.status === 'Finished' ? 'selected' : ''}>Finished</option>
                </select>
            </div>
            <button onclick="deleteTask(${index})">Supprimer</button>
        `;

        // Ajouter l'élément de tâche au conteneur de la liste
        taskListDiv.appendChild(taskDiv);
    });
}

// Fonction pour changer le statut d'une tâche
function changeStatus(index, newStatus) {
    tasks[index].status = newStatus;

    // Sauvegarder les tâches mises à jour dans localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Mettre à jour l'affichage de la liste des tâches
    updateTaskList();
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
    // Supprimer la tâche du tableau
    tasks.splice(index, 1);

    // Sauvegarder les tâches mises à jour dans localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Mettre à jour l'affichage de la liste des tâches
    updateTaskList();
}