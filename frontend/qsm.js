let questions = [];

document.getElementById("questionType").addEventListener("change", function () {
    const type = this.value;
    document.getElementById("directSection").style.display = type === "direct" ? "block" : "none";
    document.getElementById("qcmSection").style.display = type === "qcm" ? "block" : "none";
});

function addOption() {
    const optionsList = document.getElementById("optionsList");

    const div = document.createElement("div");
    div.className = "option-item";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.title = "Réponse correcte";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => div.remove();

    div.appendChild(input);
    div.appendChild(checkbox);
    div.appendChild(deleteBtn);

    optionsList.appendChild(div);
}

function addQuestion() {
    const type = document.getElementById("questionType").value;
    const questionText = document.getElementById("questionText").value.trim();
    const media = document.getElementById("mediaFile").files[0];
    const points = parseInt(document.getElementById("points").value);
    const duration = parseInt(document.getElementById("duration").value);

    if (!questionText || isNaN(points) || isNaN(duration)) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const question = {
        type,
        questionText,
        media: media ? media.name : null,
        points,
        duration
    };

    if (type === "direct") {
        question.answer = document.getElementById("directAnswer").value;
        question.tolerance = parseInt(document.getElementById("tolerance").value) || 0;
    } else {
        const options = [];
        const correct = [];

        document.querySelectorAll("#optionsList .option-item").forEach((item, index) => {
            const text = item.querySelector("input[type='text']").value;
            const isCorrect = item.querySelector("input[type='checkbox']").checked;

            if (text) {
                options.push(text);
                if (isCorrect) correct.push(index);
            }
        });

        if (options.length === 0) {
            alert("Veuillez ajouter au moins une option.");
            return;
        }

        question.options = options;
        question.correctAnswers = correct;
    }

    questions.push(question);
    renderQuestions();
    clearForm();
}

function renderQuestions() {
    const list = document.getElementById("questionsList");
    list.innerHTML = "";

    questions.forEach((q, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. [${q.type.toUpperCase()}] ${q.questionText} (${q.points} pts, ${q.duration}s)`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.onclick = () => {
            questions.splice(i, 1);
            renderQuestions();
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function clearForm() {
    document.getElementById("questionText").value = "";
    document.getElementById("mediaFile").value = "";
    document.getElementById("directAnswer").value = "";
    document.getElementById("tolerance").value = "0";
    document.getElementById("points").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("optionsList").innerHTML = "";
}
function finishCreation() {
    if (questions.length === 0) {
        alert("Aucune question n'a été ajoutée.");
        return;
    }

   
    console.log("Questions finales :", questions);

    alert("Création terminée. Les questions sont prêtes !");
    
 
}
function finishExam() {
    if (questions.length === 0) {
      alert("Veuillez ajouter au moins une question.");
      return;
    }
  
    localStorage.setItem("examQuestions", JSON.stringify(questions));
    window.location.href = "priv.html";
  }
  

  