document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.querySelector(".btn");
    const examLinkInput = document.getElementById("examLink");

    // Générer un lien unique
    function generateExamLink() {
        const randomId = Math.random().toString(36).substr(2, 8);
        const examURL = `https://examen-platform.com/exam/${randomId}`;
        examLinkInput.value = examURL;
    }

    generateBtn.addEventListener("click", generateExamLink);

    // Envoi de l'examen au serveur
    document.querySelector("button[type='submit']").addEventListener("click", async function (event) {
        event.preventDefault();

        const titre = document.querySelector("input[name='title']").value;
        const description = document.querySelector("input[name='Description']").value;
        const publicCible = document.querySelector("#public").value;
        const lienAcces = examLinkInput.value;

        const response = await fetch("/create_exam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titre, description, public_cible: publicCible, lien_acces: lienAcces })
        });

        const result = await response.json();
        alert(result.message);

        // Redirection vers la liste des examens
        window.location.href = "/examens";
    });
});
