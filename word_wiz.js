document.addEventListener("DOMContentLoaded", function() {
    const displayImage = document.getElementById("displayImage");
    const questionElement = document.getElementById("question");
    const optionsForm = document.getElementById("options-form");
    const option1Label = document.getElementById("option1-label");
    const option2Label = document.getElementById("option2-label");
    const option3Label = document.getElementById("option3-label");
    const nextButton = document.getElementById("next-button");
    const scoreValue = document.getElementById("score-value");


    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }

    const quizData = [
        { imageSrc: "book_on.jpg", question: "Book is ____ the table", options: ["On", "Off", "Under"], answerIndex: 0 },
        { imageSrc: "ball_underr.png", question: "Ball is ____ the table", options: ["Upon", "Under", "Beside"], answerIndex: 1 },
        { imageSrc: "dog next.jpg", question: "Dog is ____ to the bed", options: ["Off", "Behind", "Next"], answerIndex: 2 },
        { imageSrc: "green apple.jpg", question: "What is the colour of the Apple ?", options: ["Red", "Orange", "Green"], answerIndex: 2 },
        { imageSrc: "man inside.jpg", question: "Man is ____ the house", options: ["Upon", "Inside", "Beside"], answerIndex: 1 }
    ];
    let currentQuestionIndex = 0;
    let score = 0;

    function displayQuestionAndOptions() {
        const currentQuestion = quizData[currentQuestionIndex];
        displayImage.src = currentQuestion.imageSrc;
        questionElement.textContent = currentQuestion.question;
        option1Label.textContent = currentQuestion.options[0];
        option1Label.previousElementSibling.value = 0; 
        option2Label.textContent = currentQuestion.options[1];
        option2Label.previousElementSibling.value = 1; 
        option3Label.textContent = currentQuestion.options[2];
        option3Label.previousElementSibling.value = 2;
        option3Label.textContent = currentQuestion.options[2];
        option3Label.previousElementSibling.value = 2;
        option2Label.textContent = currentQuestion.options[1];
        option2Label.previousElementSibling.value = 1;
    }

    const playAppreciationAudio = () => {
        const appreciationAudio = new Audio('success.mp3');
        appreciationAudio.play();
    };
    function checkAnswer() {
        const currentQuestion = quizData[currentQuestionIndex];
        const selectedOption = optionsForm.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            speak("Please select an option.");
            return;
        }

        const selectedOptionIndex = parseInt(selectedOption.value);
        if (!isNaN(selectedOptionIndex) && selectedOptionIndex === currentQuestion.answerIndex) {
            score++;
            scoreValue.textContent = score;
            speak("Brilliant!");
        } else {
            speak("thats wrong!.");
        }
    }

    function displayFinalScore() {
        const finalScore = `Your final score is ${score}.`;
        speak(finalScore);
    
        localStorage.setItem('finalScore', score);
        setTimeout(() => {
            score = 0;
            scoreValue.textContent = score;
            window.location.href = "final_score.html";
        }, 2000); 
    }
    
    nextButton.addEventListener("click", () => {
        checkAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex >= quizData.length) {
            displayFinalScore();
            currentQuestionIndex = 0; 
        } else {
            displayQuestionAndOptions();
            optionsForm.reset(); 
        }
    });
    
    displayQuestionAndOptions(); 
});
