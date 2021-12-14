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
        `<div class=question> ${currentQuestion.question} </div>
        <div class=answers> ${answers.join("")} </div>`
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
      question: "The nature of the supply curve for normal goods is",
      answers: {
        a: "horizontal",
        b: "vertical",
        c: "downward sloping",
        d: "upward sloping"
      },
      correctAnswer: "d"
    },

    {
      question: "The supply of a commodity refers to",
      answers: {
        a: "total stock in the warehouse",
        b: "stock available for use",
        c: "actual production of the commodity",
        d: "Quantity of the good offered for sale at a particular price per unit of time"
      },
      correctAnswer: "d"
    },

    {
      question: "In drawing a farmer’s supply curve for a commodity, all but which one of the following are kept constant?",
      answers: {
        a: "technology",
        b: "the price of inputs",
        c: "features of nature such as climate and weather conditions",
        d: "the price of the commodity under consideration"
      },
      correctAnswer: "d"
    },
    {
      question: "If the number of customers in the market increases suddenly, the supply will",
      answers: {
        a: "increase",
        b: "decrease",
        c: "not affected",
        d: "will depend on the number of customers"
      },
      correctAnswer: "c"
    }
  ];




  // ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
