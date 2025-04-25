const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const selectedClass = document.getElementById("class-select").value;
        if (selectedClass) {
            window.location.href = `quiz.html?class=${selectedClass}`;
        } else {
            alert("Please select a class.");
        }
    });
}

const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("class");

if (classId && document.getElementById("quizSection")) {
    const questionsForClass = questions[classId];
    const quizArea = document.getElementById("quizSection");

    if (questionsForClass) {
        quizArea.style.display = "block";

        questionsForClass.forEach((qObj, index) => {
            const div = document.createElement("div");
            div.classList.add("quiz-question");

            div.innerHTML = `
                <p><strong>Q${index + 1}:</strong> ${qObj.q}</p>
                ${qObj.options.map(option => `
                    <label>
                        <input type="radio" name="q${index}" value="${option}">
                        ${option}
                    </label><br>
                `).join("")}
            `;

            quizArea.appendChild(div);
        });

        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit Quiz";
        submitBtn.style.marginTop = "20px";
        quizArea.appendChild(submitBtn);

        submitBtn.addEventListener("click", () => {
            let score = 0;
            questionsForClass.forEach((q, index) => {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                const options = document.querySelectorAll(`input[name="q${index}"]`);

                
        options.forEach(opt => {
            const label = opt.parentElement;
            label.style.color = "#fff"; // Reset color

            if (opt.value === q.answer) {
                label.style.color = "lime"; // ✅ Green correct answer
            }

            if (selected && opt === selected && opt.value !== q.answer) {
                label.style.color = "red"; // ❌ Red incorrect
            }
        });

                if (selected && selected.value === q.answer) {
                    score++;
                }
            });

            document.getElementById("result").innerHTML =
                `<h3>You scored ${score} out of ${questionsForClass.length}!</h3>`;
                `${getStars(score, questionsForClass.length)}    `;
                function getStars(score, total) {
                    const percent = (score / total) * 100;
                    let stars = "⭐".repeat(Math.floor(percent / 20)); // 1 star for every 20%
                    return `<div class="stars">${stars}</div>`;
                }

        });
    } else {
        quizArea.innerHTML = "<p>No questions found for this class.</p>";
    }
    function toggleHelp() {
        const helpBox = document.getElementById('helpBox');
        helpBox.style.display = (helpBox.style.display === 'none' || helpBox.style.display === '') ? 'block' : 'none';
    }
    
}

console.log(questions);
console.log(classId);
console.log(questions[classId]);
