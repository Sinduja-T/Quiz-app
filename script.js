let currentQuestion = 0;
let score = 0;
let userName = "";
let selectedLanguage = "";
let userAvatarEmoji = "";

// Sample questions
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperloop Machine Language",
      "None of these"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which tag is used to link an external CSS file?",
    options: ["<style>", "<script>", "<link>", "<css>"],
    answer: "<link>"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which language is used to make a webpage interactive?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "JavaScript"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Google", "Microsoft", "IBM"],
    answer: "Netscape"
  },
  {
    question: "What is the correct syntax to add JavaScript in an HTML page?",
    options: ["<javascript>", "<js>", "<script>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["color", "background-color", "bgcolor", "background"],
    answer: "background-color"
  },
  {
    question: "How do you make a numbered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ol>"
  },
  {
    question: "Which attribute is used to open a link in a new tab?",
    options: ["href", "target", "link", "rel"],
    answer: "target"
  },
  {
    question: "Which of the following is a semantic HTML tag?",
    options: ["<div>", "<span>", "<article>", "<br>"],
    answer: "<article>"
  },
  {
    question: "Which input type allows the user to select a file?",
    options: ["text", "file", "image", "upload"],
    answer: "file"
  },
  {
    question: "Which of the following is not a valid CSS unit?",
    options: ["px", "em", "rem", "km"],
    answer: "km"
  },
  {
    question: "How do you make text bold in CSS?",
    options: ["font-style: bold;", "font-weight: bold;", "text-weight: bold;", "bold: true;"],
    answer: "font-weight: bold;"
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onchange", "onmouseclick", "onclick", "onhover"],
    answer: "onclick"
  },
  {
    question: "Which function is used to print something in the console in JavaScript?",
    options: ["print()", "log()", "console.log()", "output()"],
    answer: "console.log()"
  },
  {
    question: "Which tag is used to define a table in HTML?",
    options: ["<table>", "<td>", "<tr>", "<tab>"],
    answer: "<table>"
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["alt", "title", "src", "description"],
    answer: "alt"
  },
  {
    question: "How can you create a checkbox in HTML?",
    options: [
      "<input type='checkbox'>",
      "<checkbox>",
      "<check>",
      "<input type='check'>"
    ],
    answer: "<input type='checkbox'>"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-size", "text-style", "font-style", "size"],
    answer: "font-size"
  }
];

// Emoji avatars
const emojiOptions = ["🐱", "🦊", "🐵", "🐼", "🦄", "🐸", "🐙", "🐥", "🦉", "🐶"];

// Auto-generate avatar
function autoGenerateAvatar() {
  const emoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
  userAvatarEmoji = emoji;
  document.getElementById("avatar-container").innerHTML = `<div class="emoji-avatar">${emoji}</div>`;
}

// Start quiz button
document.getElementById("start-btn").addEventListener("click", function () {
  const nameInput = document.getElementById("username").value.trim();
  const languageSelect = document.getElementById("language");

  if (nameInput === "") {
    alert("Please enter your name.");
    return;
  }

  userName = nameInput;
  selectedLanguage = languageSelect.value;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";

  loadQuestion();
});

// Load question and options
function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.onclick = () => selectAnswer(option);
    optionsContainer.appendChild(button);
  });

  document.getElementById("progress").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

// Option select handler
function selectAnswer(selectedOption) {
  if (selectedOption === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show result page
function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result").style.display = "block";

  const whatsappMsg = `Hey! I scored ${score} points in the Web Tech Quiz. Try it now!`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`;

  document.getElementById("result").innerHTML = `
    <div class="result-content">
      <div class="emoji-avatar">${userAvatarEmoji}</div>
      <h2>Quiz Completed!</h2>
      <p><strong>${userName}</strong>, you scored <strong>${score}</strong> points!</p>
      <p>Language: ${selectedLanguage}</p>
      <a class="whatsapp-share" href="${whatsappLink}" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width:24px; vertical-align:middle; margin-right:8px;" />
        Share on WhatsApp
      </a>
    </div>
  `;
}

// Generate avatar on input
document.getElementById("username").addEventListener("input", () => {
  autoGenerateAvatar();
});