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
      question: "The nature of the demand curve is",
      answers: {
        a: "horizontal",
        b: "vertical",
        c: "downward sloping",
        d: "upward sloping"
      },
      correctAnswer: "c"
    },

    {
      question: "Demand for a commodity refers",
      answers: {
        a: "amount of the commodity demanded at a particular price and at a particular time",
        b: "quantity demanded of that commodity",
        c: "desire for the commodity",
        d: "need for the commodity"
      },
      correctAnswer: "a"
    },

    {
      question: "In drawing an individual’s demand curve for a commodity, all but which one of the following are kept constant?",
      answers: {
        a: "The individual's money income",
        b: "the price of other commodities",
        c: "the price of the commodity under consideration",
        d: "the tastes of the individual"
      },
      correctAnswer: "c"
    },
    {
      question: "A fall in the price of a commodity, holding everything else constant, results in and is referred to as",
      answers: {
        a: "an increase in demand",
        b: "a decrease in demand",
        c: "an increase in the quantity demanded",
        d: "a decrease in the quantity demanded"
      },
      correctAnswer: "c"
    },
  ];




  // ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
