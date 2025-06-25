let gameData;
let currentPlayerIndex = 0;
let timerInterval;
let currentTile = null;

document.getElementById('jsonLoader').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = () => {
    gameData = JSON.parse(reader.result);
    renderBoard();
    renderScoreboard();
    updateTurnDisplay();
    document.getElementById('jsonLoader').style.display = 'none';
  };
  reader.readAsText(e.target.files[0]);
});

function renderBoard(){
  const board = document.getElementById('board');
  board.innerHTML = '';

  gameData.board.forEach((category, cat_index) => {
    const categoryColumn = document.createElement('div');
    categoryColumn.classList.add('category_column');

    // Create and append the category name at the top
    const categoryHeader = document.createElement('div');
    categoryHeader.classList.add('category_name'); // optional: for styling
    categoryHeader.textContent = category.category_name;
    categoryColumn.appendChild(categoryHeader);
    
    category.questions.forEach((q, q_index) => {
        const tileButton = document.createElement('button');
        tileButton.classList.add('question_tile');
        tileButton.textContent = `${(q_index + 1) * 100}`; // 100, 200, etc.
        tileButton.dataset.cat_index = cat_index;
        tileButton.dataset.q_index = q_index;
        tileButton.addEventListener('click', questionAnswer);
        categoryColumn.appendChild(tileButton);
    });
    board.appendChild(categoryColumn);
  });
}

function renderScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '<strong>Scores:</strong><br>';
    gameData.players.forEach((player, i) => {
      scoreboard.innerHTML += `${player.name}: ${player.score}<br>`;
    });
}

function updateTurnDisplay() {
    const PlayerBanner = document.getElementById('currentPlayer');
    PlayerBanner.innerText = gameData.players[currentPlayerIndex].name;
    document.getElementById("turnDisplay").classList.remove("hidden_element");
}

async function questionAnswer(e){
    const display = document.getElementById("qa_display");
    const tile = e.target;
    tile.disabled = true;
    const cat_index = tile.dataset.cat_index
    const q_index = tile.dataset.q_index
    display.style.display = 'flex';
    currQuestionObj = gameData.board[cat_index].questions[q_index];
    console.log(currQuestionObj);
    document.getElementById('qa_question').innerText = currQuestionObj.question;
    startTimer(gameData.timer);
    currentPlayerIndex = (currentPlayerIndex + 1) % gameData.players.length;
    updateTurnDisplay();
}

function startTimer(seconds) {
  clearInterval(timerInterval); // Clear any existing timer
  const timerEl = document.getElementById("timer");
  let timeLeft = seconds;

  // Initial display
  timerEl.innerText = `Time left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerEl.innerText = "Time's up!";
      timesUP(); // Call your custom function
    } else {
      timerEl.innerText = `Time left: ${timeLeft}s`;
    }
  }, 1000);
}

function timesUP() {
  alert("Time's up! You will recieve no points!");
  closeQA();
}


function closeQA (){
  document.getElementById('qa_answer').innerText = "";
  document.getElementById('qa_question').innerText = currQuestionObj.answer;
  document.getElementById("wrong_button").style.display = 'none';
  document.getElementById("correct_button").style.display = 'none';
  document.getElementById("qa_display").style.display = 'none';
}

function showAnswer(){
  clearInterval(timerInterval); // stop timer
  document.getElementById("timer").innerText = ""; //clear timer
  document.getElementById('qa_answer').innerText = currQuestionObj.answer;
  document.getElementById("wrong_button").style.display = 'flex';
  document.getElementById("correct_button").style.display = 'flex';
}

function correctAnswer() {

}