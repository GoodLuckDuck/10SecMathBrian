$(document).ready(function(){
  var currentQuestion;
  var timeLeft = 20;
  var score = 0;
  var highscore= 0;
  var interval;


  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
    updateHighScore();
  };
  var updateHighScore = function () {
      if (score > highscore) {
        highscore = score;
        $('#highscore').text(highscore);
      }
  };
  

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(20);
         updateScore(-score);
        updateHighScore();
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  }

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    var operators = ['+', '-', '*', '/'];
    var selectedOperator = operators[Math.floor(Math.random() * operators.length)];
    if (selectedOperator === '+') {
      question.answer = num1 + num2;
    } else if (selectedOperator === '-') {
      question.answer = num1 - num2;
    } else if (selectedOperator === '*') {
      question.answer = num1 * num2;
    } else {
      question.answer = num1 / num2;
    }
    question.equation = String(num1) + " " + selectedOperator + " " + String(num2);

    return question;
  }

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  }

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  

  renderNewQuestion();
});