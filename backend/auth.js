module.exports = {
    authenticateUser: (req, res, next) => {
        console.log("Authentification en cours...");
        next();
    }
};

app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Vérifier que tous les champs sont remplis
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).send("Tous les champs sont obligatoires !");
        }

        // Enregistrer l'utilisateur dans la base de données
        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();

        res.status(201).send("Inscription réussie !");
    } catch (error) {
        console.error("❌ Erreur serveur :", error);
        res.status(500).send("Erreur interne du serveur !");
    }
});
