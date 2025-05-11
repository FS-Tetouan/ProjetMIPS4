console.log("✅ Le script inscription.js est bien chargé !");

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const messageDiv = document.getElementById("message");
    
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next");
    let currentStep = 0;
    nextButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            console.log(`➡ Bouton Next cliqué ! Étape actuelle : ${currentStep}`);
        });
    });
    
    // Masquer toutes les étapes sauf la première
    steps.forEach((step, index) => {
        step.style.display = index === 0 ? "block" : "none";
    });

    // Ajouter un écouteur d'événements pour chaque bouton "Next"
    nextButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log(`➡ Bouton Next cliqué ! Étape actuelle : ${currentStep}`);

            if (currentStep < steps.length - 1) {
                steps[currentStep].style.display = "none"; // Masquer l'étape actuelle
                currentStep++; // Passer à l'étape suivante
                steps[currentStep].style.display = "block"; // Afficher la nouvelle étape

                console.log(`✅ Nouvelle étape : ${currentStep}`);
            } else {
                console.log("🚀 Dernière étape atteinte !");
            }
        });
    });

    // Gestion de la soumission du formulaire
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const userData = {
                firstname: signupForm.firstname.value.trim(),
                lastname: signupForm.lastname.value.trim(),
                email: signupForm.email.value.trim(),
                dob: signupForm.dob.value,
                gender: signupForm.gender.value,
                institution: signupForm.institution.value.trim(),
                department: signupForm.department.value.trim(),
                role: signupForm.role.value,
                password: signupForm.password.value.trim()
            };

            console.log("🚀 Envoi des données d'inscription...", userData);

            try {
                console.log("🚀 Envoi de la requête vers :", "http://localhost:5000/signup");
                console.log("🚀 Données envoyées :", userData);

                const res = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                });

                const data = await res.json();
                console.log("Réponse du serveur :", data);

                if (res.ok) {
                    
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1000);
                } else {
                    messageDiv.innerText = "❌ " + data.message;
                    messageDiv.style.color = "red";
                }
            } catch (error) {
                console.error("❌ Erreur lors de l'inscription :", error);
                messageDiv.innerText = "❌ Une erreur est survenue. Veuillez réessayer.";
                messageDiv.style.color = "red";
            }
        });
    }
});

document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêche la soumission normale du formulaire

    const formData = new FormData(this); // Récupère les données du formulaire
    const userData = Object.fromEntries(formData.entries()); // Convertit en objet

    const response = await fetch("/register", {  
        method: "POST",  
        body: JSON.stringify(userData),  
        headers: { "Content-Type": "application/json" }  
    });  

    const data = await response.json();  
    console.log(data); // Affiche la réponse du serveur dans la console

    if (data.redirect) {  
        window.location.href = `/frontend/${data.redirect}`; // Assure l’accès au bon fichier  
    }
    
});



