
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
      question: "Supply refers to the quantity supplied at a particular price for a particular period of time",
      answers: {
        a: "true",
        b: "false"
      },
      correctAnswer: "a"
    },

    {
      question: "Increase or decrease in supply means",
      answers: {
        a: "change in supply due to change in factors other than its own price",
        b: "shift in supply curve",
        c: "movement along same supply curve",
        d: "(d) both (a) and (b)"
      },
      correctAnswer: "d"
    },

    {
      question: "A producer’s positively sloped supply curve for a commodity represents",
      answers: {
        a: "a maximum boundary of the producer’s intentions",
        b: "a minimum boundary of the producer’s intentions",
        c: "in one sense a maximum and in another sense a minimum boundary of the producer’s intentions",
        d: "none of the above"
      },
      correctAnswer: "c"
    },

    {
      question: "Expansion in supply means that the producers are willing to supply a",
      answers: {
        a: "larger quantity of the commodity at an increased price",
        b: "larger quantity of the commodity due to increased taxation on that commodity",
        c: "larger quantity of the commodity at the same price",
        d: "larger quantity of the commodity at a decreased price"
      },
      correctAnswer: "a"
    },

    {
      question: "Which of the following will NOT shift the market supply curve of good X?",
      answers: {
        a: "A change in the cost of inputs used to produce good X",
        b: "A change in the technology used to produce X",
        c: "A change number of sellers of good X",
        d: "A change in the price of good X"
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
