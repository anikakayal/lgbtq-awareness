const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const backButton = document.getElementById('back-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart' 
    backButton.innerText = 'Back'
    startButton.classList.remove('hide')
    backButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'You hear a group of classmates making jokes about someone who recently came out as gay. How would you respond in a way that promotes acceptance?',
    answers: [
      { text: 'Ignore it, so you do not get involved.', correct: false },
      { text: 'Join in on the jokes to fit in.', correct: false },
      { text: 'Kindly explain why the jokes are hurtful and educate them about LGBTQ+ identities. ', correct: true },
    ]
  },
  {
    question: 'Imagine you see a couple holding hands in public, where one person appears more masculine and the other more feminine.  What assumptions might you be making, and how can we challenge these assumptions?',
    answers: [
      { text: 'They must be a straight couple.', correct: false },
      { text: 'We can challenge assumptions by recognizing that gender expression does not define sexual orientation.', correct: true },
    ]
  },
  {
    question: 'Why might someone be hesitant to come out as LGBTQ+?',
    answers: [
      { text: 'Fear of rejection from friends and family.', correct: false },
      { text: 'Bullying and discrimination.', correct: false },
      { text: 'Lack of understanding from society.', correct: false },
      { text: ' All of the above. ', correct: true },
    ]
  },
  {
    question: 'How can we create a more inclusive environment for everyone, regardless of sexual orientation or gender identity?',
    answers: [
      { text: 'Use respectful language and avoid making assumptions.', correct: false },
      { text: 'Educate ourselves and others about LGBTQ+ identities.', correct: false },
      { text: 'Stand up against bullying and discrimination.', correct: false },
      { text: 'All of the above.', correct: true },
    ]
  },
  {
    question: 'What does it mean to be an ally for the LGBTQ+ community?',
    answers: [
      { text: 'Someone who speaks out against injustice and advocates for equality.', correct: false },
      { text: 'Someone who educates themself and challenges stereotypes.', correct: false },
      { text: ' Someone who is accepting and supportive of LGBTQ+ people.', correct: false },
      { text: 'All of the above', correct: true }
    ]
  },
  
]