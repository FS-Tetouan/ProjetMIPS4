document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.querySelector(".btn");
    const examLinkInput = document.getElementById("examLink");

    function generateExamLink() {
      const randomId = Math.random().toString(36).substr(2, 8);
      const examURL = `https://exam-platform.com/exam/${randomId}`;
      examLinkInput.value = examURL;
    }

    generateBtn.addEventListener("click", generateExamLink);
  });