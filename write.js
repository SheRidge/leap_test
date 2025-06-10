let words = []; // JSONファイルの内容を格納する配列
let currentWord = {}; // 現在の問題の単語

// JSONファイルを読み込む関数
async function loadWords() {
  try {
    const response = await fetch('words.json'); // JSONファイルを読み込む
    if (!response.ok) {
      throw new Error('JSONファイルが読み込めませんでした。');
    }
    words = await response.json(); // JSONを配列に格納
  } catch (error) {
    console.error('エラー:', error);
  }
}

// ランダムに1問を出題する関数
function start() {
  loadWords().then(() => {
    // ランダムな単語を選ぶ
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex]; // 現在の単語をセット

    // 問題を表示
    document.getElementById('meaning').textContent = currentWord.meaning;
    document.getElementById('result').textContent = ''; // 結果をクリア
    document.getElementById('answer').value = ''; // 入力欄をクリア
  });
}

// 答え合わせをする関数
function showAnswer() {
  const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
  const correctAnswer = currentWord.word.toLowerCase();

  if (userAnswer === correctAnswer) {
    document.getElementById('result').textContent = '正解！';
    document.getElementById('result').style.color = 'green';
  } else {
    document.getElementById('result').textContent = `不正解。正解は「${currentWord.word}」です。`;
    document.getElementById('result').style.color = 'red';
  }
}

function showHint() {
  const correctAnswer = currentWord.word.toLowerCase();
  const hint = correctAnswer.charAt(0);     // 1文字目を取得

  document.getElementById('hint').textContent = `「${hint}...?」`;
}
