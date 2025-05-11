const express = require("express");
const app = express();
app.use(express.json());

app.post("/create_exam", async (req, res) => {
    const lienUnique = `exam-${Math.random().toString(36).substr(2, 8)}`;
    
    const nouvelExamen = new Exam({
        titre: req.body.titre,
        description: req.body.description,
        public_cible: req.body.public_cible,
        lien_acces: lienUnique
    });

    await nouvelExamen.save();
    res.json({ message: "Examen créé avec succès", lien: lienUnique });
});
