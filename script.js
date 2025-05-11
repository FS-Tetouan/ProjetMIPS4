console.log("Le fichier script.js est bien chargé !");

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    const emailInput = document.querySelector("input[name='Email']");
    const passwordInput = document.querySelector("input[type='password']");
    const signInLink = document.querySelector(".sign-in-link"); // Récupérer le lien

    // Vérifier que le lien "Créer un compte" existe
    if (signInLink) {
        signInLink.addEventListener("click", function(event) {
            event.preventDefault(); // Empêcher le comportement par défaut
            console.log("Lien 'Créer un compte' cliqué !");
            window.location.href = "inscription.html"; // Redirection
        });
    } else {
        console.log("Erreur : '.sign-in-link' introuvable !");
    }

    // Gestion du formulaire de connexion
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        if (!email.includes("@")) {
            alert("Adresse e-mail invalide !");
            return;
        }

        if (password.length < 6) {
            alert("Le mot de passe doit contenir au moins 6 caractères !");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {  
                method: "POST",  
                body: JSON.stringify({ email, password }),  
                headers: { "Content-Type": "application/json" }  
            });
            

            const data = await response.json();
            console.log("Réponse du serveur :", data);

            if (data.message === "Connexion réussie") {  
                window.location.href = "intro.html"; // ✅ Redirige vers `intro.html`
            } else {
                alert("Connexion échouée ! Vérifie tes identifiants.");
            }
        } catch (error) {
            console.error("❌ Erreur de connexion :", error);
        }
    });
});

if (signInLink) {
    signInLink.addEventListener("click", function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut
        console.log("Lien 'Créer un compte' cliqué !");
        window.location.href = "intro.html"; // Redirection
    });
} else {
    console.log("Erreur : '.sign-in-link' introuvable !");
}