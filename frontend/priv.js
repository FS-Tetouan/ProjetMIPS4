// Recupérer les questions depuis localStorage
const questions = JSON.parse(localStorage.getItem("examQuestions")) || [];

const container = document.getElementById("examContainer");

questions.forEach((q, index) => {
  const qDiv = document.createElement("div");
  qDiv.className = "question";

  qDiv.innerHTML = `
    <h3>Question ${index + 1} : ${q.text}</h3>
    ${q.type === "direct" ? `
      <p><strong>Réponse attendue :</strong> ${q.answer}</p>
      <p><strong>Taux de tolérance :</strong> ${q.tolerance}%</p>
    ` : `
      <div class="options">
        <strong>Options :</strong>
        ${q.options.map((opt, i) => `
          <label>
            <input type="checkbox" disabled ${q.correct.includes(i) ? 'checked' : ''}>
            ${opt}
          </label>
        `).join('')}
      </div>
    `}
    <p><strong>Durée :</strong> ${q.duration} secondes</p>
    <p><strong>Note :</strong> ${q.points} point(s)</p>
  `;

  container.appendChild(qDiv);
});


function goBack() {
  window.location.href = "qsm.html"; 
}
