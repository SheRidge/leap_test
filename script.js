document.addEventListener("DOMContentLoaded", () => {
  let words = [];
  let currentWord = null;
  let rangeStart = 0;
  let rangeEnd = 0;

  // JSONファイルを読み込む
  fetch('words.json')
    .then(response => response.json())
    .then(data => {
      words = data;
    });

  // 範囲指定ボタンがクリックされたとき
  document.getElementById("startQuiz").addEventListener("click", () => {
    rangeStart = parseInt(document.getElementById("rangeStart").value);
    rangeEnd = parseInt(document.getElementById("rangeEnd").value);

    // 範囲が不正な場合
    if (isNaN(rangeStart) || isNaN(rangeEnd) || rangeStart > rangeEnd || rangeStart < 1 || rangeEnd > words.length) {
      alert("正しい範囲を指定してください");
      return;
    }

    // 次の単語を出題
    startQuiz(rangeStart, rangeEnd);
  });

  // 全範囲ボタンがクリックされたとき
  document.getElementById("startAll").addEventListener("click", () => {
    startQuiz(1, words.length); // 全範囲を指定
  });

  // 学習を開始する関数
  function startQuiz(start, end) {
    rangeStart = start;
    rangeEnd = end;

    // 次の単語を出題
    getNextWord();
    document.getElementById("startQuiz").style.display = 'none'; // 範囲指定ボタンを隠す
    document.getElementById("startAll").style.display = 'none'; // 全範囲ボタンを隠す
    document.getElementById("nextWord").style.display = 'inline-block'; // 次の単語ボタンを表示
    document.getElementById("showMeaning").style.display = 'inline-block'; // 意味を見るボタンを表示
  }

  // 次の単語をランダムに取得
  function getNextWord() {
    // 範囲内の単語を抽出
    const rangeWords = words.slice(rangeStart - 1, rangeEnd);

    // ランダムに単語を選ぶ
    const randomIndex = Math.floor(Math.random() * rangeWords.length);
    currentWord = rangeWords[randomIndex];

    document.getElementById("word").textContent = currentWord.word;
    document.getElementById("meaning").textContent = ''; // 意味を非表示
    document.getElementById("showMeaning").style.display = 'inline-block'; // 意味を見るボタンを再表示
  }

  // 意味を見るボタンがクリックされたとき
  document.getElementById("showMeaning").addEventListener("click", () => {
    if (currentWord) {
      document.getElementById("meaning").textContent = currentWord.meaning; // 意味を表示
      document.getElementById("showMeaning").style.display = 'none'; // ボタンを非表示
    }
  });

  // 次の単語ボタンがクリックされたとき
  document.getElementById("nextWord").addEventListener("click", () => {
    getNextWord(); // 次の単語を出題
    document.getElementById("showMeaning").style.display = 'inline-block'; // 意味を見るボタンを再表示
  });
});
