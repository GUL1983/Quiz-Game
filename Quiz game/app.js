// DOM Elements
const startScreen = document.getElementById ("start-screen");
const quizScreen = document.getElementById ("quiz-screen");
const resultScreen = document.getElementById ("result-screen");
const startButton = document.getElementById ("start-btn");
const restartButton = document.getElementById ("restart-btn");
const questionText = document.getElementById ("question-text");
const answerContainer = document.getElementById ("answers-container");
const currectQuestionSpan =  document.getElementById ("current-question");
const totalQuestionSpan = document.getElementById ("total-question");
const scoreSpan = document.getElementById ("score");
const finalScoreSpan = document.getElementById ("final-score");
const maxScoreSpan = document.getElementById ("max-score");
const resultMessage = document.getElementById ("result-message");
const resultButton = document.getElementById ("result-btn");
const progressBar = document.getElementById ("progress");

const quizQuestion = [
    {
        question: "What is the capital of France ?",
        answer: [
            {text: "Londen", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false},
        ]
    },
    {
        question: "Which planet is know as the Red Planet ?",
        answer: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false},
        ]
    },
        {
        question: "Which of these is not a Programming Language?",
        answer: [
            {text: "Java", correct: false},
            {text: "C++", correct: false},
            {text: "Python", correct: false},
            {text: "Mango", correct: true},
        ]
    },
    {
        question: "What is the largest Ocean on the Earth?",
        answer: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific  Ocean", correct: true},
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answer: [
            {text: "Go", correct: false},
            {text: "Gd", correct: false},
            {text: "Ag", correct: false},
            {text: "Au", correct: true},
        ]
    }
]

// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answerDisable = false;

totalQuestionSpan.textContent = quizQuestion.length;
maxScoreSpan.textContent = quizQuestion.length;

// event listeners

startButton.addEventListener("click" , startQuiz)
restartButton.addEventListener("click" , restartQuiz)

function startQuiz() {
    // console.log ("start quiz")
    // reset vars
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}
function showQuestion() {
    // reset state
    answerDisable = false
    const currectQuestion = quizQuestion[currentQuestionIndex]
    currectQuestionSpan.textContent = currentQuestionIndex + 1

    const progresspercent =[currentQuestionIndex / quizQuestion.length] * 100;
    progressBar.style.width = progresspercent + "%"
    questionText.textContent = currectQuestion.question
    // todo: explain this in a sce

    answerContainer.innerText = "";

    currectQuestion.answer.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add ("answer-btn")

        // What is dataset? its a propertyof the button element that allows you to store a custom data. 

        button.dataset.correct = answer.correct

        button.addEventListener ("click", selectAnswer)

        answerContainer.appendChild(button)
    })
}

function selectAnswer(event) {
    // optimization check
    if (answerDisable) return

    answerDisable = true

    const selectedButton  = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // todo: explain this in a sec
    Array.from(answerContainer.children).forEach ((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add ("correct");
        } else {
            button.classList.add ("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout (() => {
        currentQuestionIndex++;
        
        // check if there are more question or if quiz is over
        if (currentQuestionIndex < quizQuestion.length) {
            showQuestion()
        } else {
            showResults()
        }
    } ,1000)
}
function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestion.length) + 100

    if (percentage == 100) {
        resultMessage.textContent = "Perfect you're a genius"
    } else if (percentage >= 80){
        resultMessage.textContent = "Great job you know your stuff"
    } else if (percentage >= 60){
        resultMessage.textContent = "Good Effort keep learning"
    } else if (percentage >= 40){
        resultMessage.textContent = "Not bad Try again to improve"
    } else {
        resultMessage.textContent = "Keep studying! you will be butter"
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active")

    startQuiz()
}