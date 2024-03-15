// question variable for question display 

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Austrailia", correct: true},
            {text: "Africa", correct: false},
            {text: "Arctic", correct: false},
        ]
    },
    {
        question: "Which is the capital city of turkey?",
        answers: [
            {text: "Ankara", correct: false},
            {text: "Istanbol", correct: true},
            {text: "Sogut", correct: false},
            {text: "Malvadi", correct: false},
        ]
    },
    {
        question: "What is the most common surname in the United States?",
        answers: [
            {text: "John", correct: false},
            {text: "Denwark", correct: false},
            {text: "Hellen", correct: false},
            {text: "Smith", correct: true},
        ]
    },
    {
        question: "How many minutes are in a full week? ",
        answers: [
            {text: "11,080", correct: false},
            {text: "10,080", correct: true},
            {text: "9,999", correct: false},
            {text: "10,240", correct: false},
        ]
    },
    {
        question: "How many ghosts chase Pac-Man at the start of each game?",
        answers: [
            {text: "3", correct: false},
            {text: "7", correct: false},
            {text: "4", correct: true},
            {text: "5", correct: false},
        ]
    },
    {
        question: "Which planet in the Milky Way is the hottest?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Venus", correct: true},
            {text: "Sun", correct: false},
            {text: "Mars", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answers.correct){
            button.dataset.correct = answers.correct;
        }

        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored' + score + " " + 'out of' + " " + questions.length;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();