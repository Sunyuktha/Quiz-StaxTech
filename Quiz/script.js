 
    const quizData = {
      "Web Development": [
        {
          question: "Which of the following is a markup language used to structure web pages?",
          options: ["CSS", "JavaScript", "HTML", "PHP"],
          answer: "HTML"
        },
        {
          question: "What is the primary purpose of CSS?",
          options: [
            "To define the structure of a web page",
            "To add interactivity to a web page",
            "To control the presentation and styling of a web page",
            "To handle server-side logic"
          ],
          answer: "To control the presentation and styling of a web page"
        },
        {
          question: "Which JavaScript method is used to display a pop-up message box?",
          options: ["alert()", "prompt()", "confirm()", "console.log()"],
          answer: "alert()"
        },
        {
          question: "What does the term 'API' stand for in the context of web development?",
          options: [
            "Application Programming Interface",
            "Advanced Programming Interface",
            "Automatic Programming Interface",
            "Advanced Programming Information"
          ],
          answer: "Application Programming Interface"
        },
        {
          question: "What is the primary purpose of a database in a web application?",
          options: [
            "To store the HTML, CSS, and JavaScript code of the website",
            "To handle the user interface and display content",
            "To store, organize, and retrieve data for the application",
            "To communicate with other servers on the web"
          ],
          answer: "To store, organize, and retrieve data for the application"
        }
      ],
      "UI/UX": [
        {
          question: "What does UX stand for?",
          options: ["User Experience", "User Example", "User Executive", "User Expansion"],
          answer: "User Experience"
        },
        {
          question: "Which principle is part of UI design?",
          options: ["Balance", "SEO", "Authentication", "Versioning"],
          answer: "Balance"
        },
        {
          question: "A wireframe is used in which phase of UI/UX design?",
          options: ["Research", "Design", "Development", "Deployment"],
          answer: "Design"
        },
        {
          question: "Which tool is popular for UI/UX prototyping?",
          options: ["Figma", "Visual Studio Code", "MySQL", "WordPress"],
          answer: "Figma"
        },
        {
          question: "What color model is used for digital design?",
          options: ["CMYK", "RGB", "HSV", "Pantone"],
          answer: "RGB"
        }
      ],
       "Software Development": [
        {
          question: "Which model is known for its iterative approach in software development?",
          options: ["Waterfall", "Spiral", "V-Model", "Big Bang"],
          answer: "Spiral"
        },
        {
          question: "What is the purpose of version control systems like Git?",
          options: [
            "To track changes in source code",
            "To debug code",
            "To deploy applications",
            "To design UI"
          ],
          answer: "To track changes in source code"
        },
        {
          question: "What is Agile methodology mainly focused on?",
          options: ["Documentation", "Customer collaboration", "Strict planning", "Testing"],
          answer: "Customer collaboration"
        },
        {
          question: "What language is primarily used for Android app development?",
          options: ["Swift", "Java", "Python", "C#"],
          answer: "Java"
        },
        {
          question: "Which testing type verifies the entire application as a whole?",
          options: ["Unit Testing", "Integration Testing", "System Testing", "Smoke Testing"],
          answer: "System Testing"
        }
      ]
    };

    let currentCategory = "";
    let currentIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const resultBox = document.getElementById("result-box");
    const scoreEl = document.getElementById("score");
    const quizBox = document.getElementById("quiz-box");
    const welcomeScreen = document.getElementById("welcome-screen");
    const timerEl = document.getElementById("time");

    function startQuiz(category) {
      currentCategory = category;
      welcomeScreen.classList.add("hide");
      quizBox.classList.remove("hide");
      showQuestion();
      startTimer();
    }

    function showQuestion() {
      const currentQuestion = quizData[currentCategory][currentIndex];
      questionEl.textContent = currentQuestion.question;
      optionsEl.innerHTML = "";

      currentQuestion.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(btn, currentQuestion.answer);
        optionsEl.appendChild(btn);
      });
    }

    function selectAnswer(selectedBtn, correctAnswer) {
      const allButtons = optionsEl.querySelectorAll("button");
      allButtons.forEach(btn => btn.disabled = true);

      if (selectedBtn.textContent === correctAnswer) {
        selectedBtn.style.backgroundColor = "#90ee90";
        score++;
      } else {
        selectedBtn.style.backgroundColor = "#f08080";
      }

      nextBtn.style.display = "inline-block";
      clearInterval(timer);
    }

    nextBtn.onclick = () => {
      currentIndex++;
      if (currentIndex < quizData[currentCategory].length) {
        timeLeft = 30;
        showQuestion();
        startTimer();
        nextBtn.style.display = "none";
      } else {
        showResult();
      }
    };

    function showResult() {
      quizBox.classList.add("hide");
      resultBox.classList.remove("hide");
      scoreEl.textContent = `${score} / ${quizData[currentCategory].length}`;
    }

    function restartQuiz() {
      currentIndex = 0;
      score = 0;
      timeLeft = 30;
      resultBox.classList.add("hide");
      welcomeScreen.classList.remove("hide");
    }

    function startTimer() {
      timerEl.textContent = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
          clearInterval(timer);
          nextBtn.click();
        }
      }, 1000);
    }
  