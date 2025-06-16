
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

  const searchBtn = document.getElementById('search');
  const input = document.getElementById('searchWord');
  const result = document.getElementById('meaning');

  // Search button handler
  searchBtn.addEventListener('click', () => {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      result.textContent = '単語を入力してください。';
      return;
    }

    const entry = words.find(w => w.word.toLowerCase() === query);

    if (entry) {
      result.textContent = `${entry.word}: ${entry.meaning}`;
    } else {
      result.textContent = 'その単語は見つかりません。';
    }
  });

  // Allow searching by pressing Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
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

