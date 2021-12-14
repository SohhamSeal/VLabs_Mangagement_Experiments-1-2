
// Don't touch the below code

(function () {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


  // Don't touch the above code




  // Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "The price of 1 kg apples, which was $5 last month, is $6 today. The demand curve for apples must have shifted rightward between last month and today. State True or False",
      answers: {
        a: "true",
        b: "false"
      },
      correctAnswer: "a"
    },

    {
      question: "The individual’s demand curve for a commodity represents",
      answers: {
        a: "a maximum boundary of the individual’s intentions",
        b: "a minimum boundary of the individual’s intentions",
        c: "both a maximum and a minimum boundary of the individual’s intentions",
        d: "neither a maximum nor a minimum boundary of the individual’s intentions"
      },
      correctAnswer: "a"
    },

    {
      question: "When an individual’s income rises (while everything else remains the same), that person’s demand for a normal good",
      answers: {
        a: "rises",
        b: "falls",
        c: "remains the same",
        d: "any of the above"
      },
      correctAnswer: "a"
    },

    {
      question: "When an individual’s income falls (while everything else remains the same), that person’s demand for an inferior good",
      answers: {
        a: "increases",
        b: "decreases",
        c: "remains unchanged",
        d: "we cannot say without additional information"
      },
      correctAnswer: "a"
    },

    {
      question: "When the price of a substitute of commodity X falls, the demand for X",
      answers: {
        a: "rises",
        b: "falls",
        c: "remains unchanged",
        d: "any of the above"
      },
      correctAnswer: "b"
    },

    {
      question: "When both the price of a substitute and the price of a complement of commodity X rise, the demand for X",
      answers: {
        a: "rises",
        b: "falls",
        c: "remains unchanged",
        d: "all of the above are possible"
      },
      correctAnswer: "d"
    }
  ];




  // ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
