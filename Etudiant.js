function changerPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function demarrerGeolocalisation() {
    navigator.geolocation.getCurrentPosition(position => {
        console.log("Coordonnées :", position.coords.latitude, position.coords.longitude);
        changerPage('questions'); 
    });
}

let questions = ["Quelle est la capitale de la France ?", "Résolvez : 5 + 3"];
let index = 0;

function suivantQuestion() {
    if (index < questions.length) {
        document.getElementById("question-text").innerText = questions[index];
        index++;
    } else {
        changerPage('score');
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const publicCible = "2e année MIP, S4"; // Adapter selon le profil étudiant

    const response = await fetch(`/examens/${encodeURIComponent(publicCible)}`);
    const examens = await response.json();

    let list = document.getElementById("exam-list");
    examens.forEach(exam => {
        let item = document.createElement("li");
        item.innerHTML = `<a href="/exam/${exam.lien_acces}">${exam.titre}</a>`;
        list.appendChild(item);
    });
});
