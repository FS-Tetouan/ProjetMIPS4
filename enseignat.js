document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne le bouton et l'input de lien
    const generateBtn = document.querySelector(".btn");
    const examLinkInput = document.getElementById("examLink");

    // Fonction pour générer un lien aléatoire
    function generateExamLink() {
        const randomId = Math.random().toString(36).substr(2, 8); // Génère un ID unique
        const examURL = `https://examen-platform.com/exam/${randomId}`; // Simule un lien

        // Affiche le lien dans l'input
        examLinkInput.value = examURL;
    }

    // Ajoute l'événement de clic sur le bouton
    generateBtn.addEventListener("click", generateExamLink);
});
