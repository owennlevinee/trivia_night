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
  };
  reader.readAsText(e.target.files[0]);
});

function renderBoard(){
  const board = document.getElementById('board');
  board.innerHTML = '';

  gameData.board.forEach(category => {
    const categoryColumn = document.createElement('div');
    categoryColumn.classList.add('category_column');

    // Create and append the category name at the top
    const categoryHeader = document.createElement('div');
    categoryHeader.classList.add('category_name'); // optional: for styling
    categoryHeader.textContent = category.category_name;
    categoryColumn.appendChild(categoryHeader);
    
    category.questions.forEach((q, index) => {
        const tileButton = document.createElement('button');
        tileButton.classList.add('question_tile');
        tileButton.textContent = `${(index + 1) * 100}`; // 100, 200, etc.
        tileButton.dataset.category = category.category_name;
        tileButton.dataset.index = index;
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

function questionAnswer(e){
    const tile = e.target;
    tile.disabled = true;




    currentPlayerIndex = (currentPlayerIndex + 1) % gameData.players.length;
    updateTurnDisplay();
}
