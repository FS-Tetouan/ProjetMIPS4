document.querySelector("form").addEventListener("submit", function(event) {
    let email = document.querySelector("input[name='Email']").value;
    let password = document.querySelector("input[type='password']").value;

    if (!email.includes("@")) {
        alert("Adresse e-mail invalide !");
        event.preventDefault();
    }
    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères !");
        event.preventDefault();
    }
});
