
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require('./User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB **only once**
connectDB();

// Ensure `mongoose.connection` handles events once
mongoose.connection.once('open', () => console.log("✅ Connecté à MongoDB"));
mongoose.connection.on('error', (error) => console.error("❌ Erreur MongoDB:", error));

// Start server **only once**
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));


// Définition du modèle utilisateur
const etudiantSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true, required: true }, // 🔍 Email doit être unique
    dob: String,
    gender: String,
    institution: String,
    department: String,
    role: String,
    password: String
});

const Etudiant = mongoose.model("Etudiant", etudiantSchema);


app.post("/signup", async (req, res) => {
    try {
        console.log("✅ Route /signup appelée avec ces données :", req.body);

        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "⚠ Tous les champs sont obligatoires !" });
        }

        console.log("📌 Connexion MongoDB active :", mongoose.connection.readyState); 
        console.log("📌 Modèle Etudiant chargé :", typeof Etudiant);

        if (!Etudiant) {
            return res.status(500).json({ message: "❌ Problème de définition du modèle Etudiant." });
        }

        // Vérifier si l'email est déjà utilisé
        const existingUser = await Etudiant.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "⚠ Cet email est déjà utilisé !" });
        }

        // Enregistrement dans MongoDB
        const nouvelEtudiant = new Etudiant(req.body);
        await nouvelEtudiant.save();

        console.log("✅ Étudiant enregistré en base !");
        res.status(201).json({ message: "✅ Inscription réussie !" });
    } catch (error) {
        console.error("❌ Erreur interne du serveur :", error.message);
        res.status(500).json({ message: `❌ Erreur interne du serveur : ${error.message}` });
    }
});

app.post('/register', async (req, res) => {
    try {
        // Traitement de l'inscription (ajout en base, hash du mot de passe, etc.)
        const user = new User(req.body);
        await user.save();

        res.status(201).json({ message: "Inscription réussie", redirect: "index.html" });
    } catch (error) {
        res.status(400).json({ error: "Erreur d'inscription" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Données reçues du frontend :", email, password); 

    const user = await Etudiant.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: "Compte introuvable !" });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
    }

    res.status(200).json({ message: "Connexion réussie", redirect: "intro.html" });
});



app.use(express.static("public"));