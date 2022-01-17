timerElement = document.getElementById('countdown');

let chosenQuestion;
let questionLogArray = [];
let maxQuestions = 5;
let penalty = 10;
let timeLeft;
let user = {
    score: 0,
    initials: '',
    date: ''
    };
let gameOver = false;
let userScores = [];

// what happens when time runs out
function timeUp () {
    alert('Time is up!');
};


// start from 60 seconds and countdown
function countdownTimer () {
    timeLeft = 60;
    let timeInterval = setInterval(function () {
        timerElement.textContent = timeLeft;
        timeLeft -= 1;
        if (timeLeft < 0) {
            clearInterval(timeInterval);
            endGame();
        }; 
        if (gameOver === true) {
                clearInterval(timeInterval);
            };
        }, 1000);
};


function startQuiz () {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    countdownTimer();
    generateQuestion();
    user.score = 0;
    gameOver = false;
};


// what happens when all questions are answered
function endGame () {
    // set gameOver to true to stop the timer and reset the questionLogArray to blank for the next game
    gameOver = true;
    questionLogArray = [];
        
    if (timeLeft <= 0) {
        user.score = 0;
        timeLeft = 0;
    } else {timeLeft += 1; user.score = timeLeft;}
    
    timerElement.textContent = timeLeft;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('end-container').style.display = 'block';
    document.getElementById('validation').style.display = 'none';
    document.getElementById('final-score').textContent = user.score;
};

function disableButtons() {
    let buttons = document.getElementsByClassName('answer');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
};

function enableButtons() {
    let buttons = document.getElementsByClassName('answer');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
};



document.querySelectorAll('.answer').forEach(element => {element.addEventListener('click', function(event) {
    let chosenAnswer = event.target.textContent;
    let answer = questions[chosenQuestion].answer;
    disableButtons();
    
    if (chosenAnswer === answer) {
        console.log('Correct!');
        document.getElementById('validation-message').textContent = 'Correct!';
        document.getElementById('validation').style.display = 'block';
        setTimeout(function() {generateQuestion();}, 1000);
                
    } else {
        console.log('Wrong!');
        document.getElementById('validation-message').textContent = 'Wrong!';
        document.getElementById('validation').style.display = 'block';
        timeLeft = timeLeft - penalty;
        setTimeout(function() {generateQuestion();}, 1000);
    };
});
});


// use the chosenQuestion variable to pull the question from the array and render it to the screen
function displayQuestion () {
    document.getElementById('validation').style.display = 'none';
    let question = questions[chosenQuestion];
    document.getElementById('question-title').textContent = question.title;
    document.getElementById('answer1').textContent = question.choices[0];
    document.getElementById('answer2').textContent = question.choices[1];
    document.getElementById('answer3').textContent = question.choices[2];
    document.getElementById('answer4').textContent = question.choices[3];
    enableButtons();
};



// call a random question from the question bank each time one is answered, but do not repeat a question
function generateQuestion() {
    // first set a limit for the number of questions asked. If reached, end the game
if (questionLogArray.length === maxQuestions) {
    endGame();
} else {
    // generate a random number corresponding to the index position of a question from the question array
    let question = Math.floor(Math.random()*questions.length);
    // check if this question has already been asked in this session
if (questionLogArray.includes(question)) {
    // if so, rerun the function
    generateQuestion();
} else {
    // if not already asked, log the question number to the questionLogArray and ask the question to the user
    questionLogArray.push(question);
    chosenQuestion = question;
    displayQuestion();
    };
}
};



// begin the game
document.getElementById('start-button').addEventListener('click', function(){
    startQuiz();
});


function saveScore() {
    user.initials = document.getElementById('user').value.toUpperCase();
  
    if (localStorage.getItem('userScores') === null) {
        userScores.unshift(user);
        localStorage.setItem('userScores', JSON.stringify(userScores));
    } else {
    let retrieveScores = localStorage.getItem('userScores') || [];
    userScores = JSON.parse(retrieveScores);
    userScores.unshift(user);
    localStorage.setItem('userScores', JSON.stringify(userScores));
    };
};

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    saveScore();
    window.location.href = "./highscores.html"
});



