
// Load words from the JSON file once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  let words = [];

  // Fetch the word list
  fetch('words.json')
    .then(res => res.json())
    .then(data => {
      words = data;
    })
    .catch(err => {
      console.error('failed to load words:', err);
    });

  // Search button handler
  const searchBtn = document.getElementById('search');
  searchBtn.addEventListener('click', () => {
    const input = document.getElementById('rangeStart');
    const index = parseInt(input.value, 10);
    const result = document.getElementById('meaning');

    if (isNaN(index) || index < 1 || index > words.length) {
      result.textContent = 'その番号の単語は見つかりません。';
      return;
    }

    const wordData = words[index - 1];
    result.textContent = `${wordData.word}: ${wordData.meaning}`;
  });
});

