// --- Element References ---
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');

// --- State Variables ---
let shuffledQuestions, currentQuestionIndex;
let score = 0;

// --- Quiz Questions ---
const questions = [
    {
        question: 'What is `console.log` used for?',
        answers: [
            { text: 'Displaying output on the web page', correct: false },
            { text: 'Debugging and printing to the console', correct: true },
            { text: 'Creating a new variable', correct: false },
            { text: 'Styling elements', correct: false }
        ]
    },
    {
        question: 'Which symbol is used for single-line comments in JavaScript?',
        answers: [
            { text: '//', correct: true },
            { text: '/* */', correct: false },
            { text: '', correct: false },
            { text: '#', correct: false }
        ]
    },
    {
        question: 'How do you declare a constant variable?',
        answers: [
            { text: 'var', correct: false },
            { text: 'let', correct: false },
            { text: 'const', correct: true },
            { text: 'constant', correct: false }
        ]
    },
    {
        question: 'What does the `===` operator check for?',
        answers: [
            { text: 'Value equality only', correct: false },
            { text: 'Value and type equality', correct: true },
            { text: 'Assigning a value', correct: false },
            { text: 'Type equality only', correct: false }
        ]
    }
];

// --- Event Listeners ---
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startQuiz);

// --- Functions ---
function startQuiz() {
    score = 0;
    scoreContainer.classList.add('hide');
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    // Shuffle questions to make it interesting
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    // Update score if correct
    if (correct) {
        score++;
    }

    // Set visual feedback for all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    // Check if there are more questions
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        // Show score at the end
        showFinalScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showFinalScore() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
    totalQuestionsElement.innerText = questions.length;
}