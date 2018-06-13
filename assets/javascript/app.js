let letters = ['A.', 'B.', 'C.', 'D.', 'E.'];
let currentQuestion;
let correct = null;
let score;
let runningScore = 0;
let questionsAnswered;

function start() {
    currentQuestion = 0;
    questionsAnswered = 0;
    score = 0;
    getQuestion();
    
}

function getQuestion() {
    let queryURL = `https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple`;
    if(questionsAnswered >= 10){
        start();
        return
    }

    $.ajax({url: queryURL, method: 'GET'})
        .then( response => {
            showQuestion(response.results[0]);
        });
}

function showQuestion(res) {
    currentQuestion++;
    $('#question').text(`${currentQuestion}/10`)
    console.log(res)
    correct = res.correct_answer;
    let unshuffled = [...res.incorrect_answers, res.correct_answer];
    let answers = shuffle(unshuffled);
    let answerList = $('<ul>')
    console.log(answers)
    let quizBox = $('.quizBox').empty().html("<p id=score> Score: " + score + " ")
        .append($('<p>').addClass('question').html(res.question))
        .append(answerList)
    for(let i = 0; i < answers.length; i++) {
        answerList.append($('<li>').addClass('answers').attr('data-answer', answers[i]).html(`${letters[i]} ${answers[i]}`));
    }
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function checkAnswer(answer) {
    if(answer === correct) {
        score++;
        
    }
    questionsAnswered++;
    getQuestion();
}

$(document).on('click', '.answers', handleAnswer)
function handleAnswer() {
    let answ = $(this).attr('data-answer');
    checkAnswer(answ) 
}

start();

