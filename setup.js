const players = [];
    const categories = [];

    function addPlayer() {
      const name = document.getElementById('playerName').value.trim();
      if (name) {
        players.push({ name, score: 0 });
        const li = document.createElement('li');
        li.textContent = name;
        document.getElementById('playerList').appendChild(li);
        document.getElementById('playerName').value = '';
      }
    }
    function addCategory() {
        const values = ["100", "200", "300", "400", "500"];
        const container = document.getElementById('categoriesContainer');
        const categoryBox = document.createElement('div');
        const categoryInput = document.createElement('input');
        categoryInput.placeholder = `Category Name`;

        categoryBox.appendChild(categoryInput);

        values.forEach(val=>{
          const qBox = document.createElement('div');
          qBox.className = 'question-box';
          const q = document.createElement('textarea');
          q.placeholder = `Question for $${val}`;
          const a = document.createElement('textarea');
          a.placeholder = `Answer for $${val}`;

          qBox.appendChild(q);
          qBox.appendChild(a);
          categoryBox.appendChild(qBox);
        });
        container.appendChild(categoryBox);

    }

    function finalizeSetup() {
  const timer = parseInt(document.getElementById('countdown').value);
  const categoriesDOM = document.getElementById('categoriesContainer').children;
  const board = [];

  for (const catDiv of categoriesDOM) {
    const catName = catDiv.querySelector('input').value.trim();
    const qaPairs = [];
    const qBoxes = catDiv.querySelectorAll('.question-box');
    qBoxes.forEach(qb => {
      const q = qb.querySelectorAll('textarea')[0].value.trim();
      const a = qb.querySelectorAll('textarea')[1].value.trim();
      qaPairs.push({ question: q, answer: a });
    });
    board.push({ category_name: catName, questions: qaPairs });
  }

  const gameData = {
    players,
    board,
    timer
  };

  const jsonStr = JSON.stringify(gameData, null, 2); // Pretty-print JSON
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'jeopardySetup.json';
  a.click();

  URL.revokeObjectURL(url);
  alert('Setup complete! Game data saved as a local file.');
}