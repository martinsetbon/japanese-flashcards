import React, { useState } from 'react';
import './App.css';

// Vocabulary data
const vocabulary = [
  { japanese: "参加する", english: "To participate" },
  { japanese: "提案", english: "Proposal / suggestion" },
  { japanese: "会議", english: "Meeting" },
  { japanese: "打ち合わせ", english: "Meeting / briefing" },
  { japanese: "会議資料", english: "Meeting materials" },
  { japanese: "客先 / 顧客", english: "Client / customer" },
  { japanese: "説明会", english: "Briefing / orientation" },
  { japanese: "品質", english: "Quality" },
  { japanese: "相談する / 相談", english: "To consult / consultation" },
  { japanese: "参加者", english: "Participant" },
  { japanese: "予定", english: "Schedule / plan" },
  { japanese: "調整", english: "Adjustment" },
  { japanese: "日程", english: "Schedule / timetable" },
  { japanese: "確認", english: "Confirmation" },
  { japanese: "予約", english: "Reservation / booking" },
  { japanese: "出席", english: "Attendance" },
  { japanese: "欠席", english: "Absence" },
  { japanese: "会議室", english: "Meeting room" },
  { japanese: "議題", english: "Agenda / topic" },
  { japanese: "発表", english: "Presentation" },
  { japanese: "契約", english: "Contract" },
  { japanese: "契約更新", english: "Contract renewal" },
  { japanese: "条件", english: "Terms / conditions" },
  { japanese: "条件交渉", english: "Negotiation of terms" },
  { japanese: "取引先", english: "Business partner / client company" },
  { japanese: "利益", english: "Profit" },
  { japanese: "費用", english: "Expense / cost" },
  { japanese: "支払い", english: "Payment" },
  { japanese: "請求 / 請求書", english: "Billing / invoice" },
  { japanese: "領収書", english: "Receipt" },
  { japanese: "納期", english: "Delivery date / due date" },
  { japanese: "納期遵守", english: "Meeting deadlines / punctual delivery" },
  { japanese: "遅延", english: "Delay" },
  { japanese: "完了", english: "Completion" },
  { japanese: "提出", english: "Submission" },
  { japanese: "納品", english: "Delivery of goods" },
  { japanese: "作業", english: "Work / task" },
  { japanese: "担当", english: "Person in charge" },
  { japanese: "確認済み", english: "Confirmed" },
  { japanese: "指示", english: "Instructions" },
  { japanese: "書類", english: "Document" },
  { japanese: "見積もり", english: "Estimate / quotation" },
  { japanese: "発注", english: "Order (placing an order)" },
  { japanese: "発注書", english: "Purchase order" },
  { japanese: "納品書", english: "Delivery note" },
  { japanese: "合計金額", english: "Total amount" },
  { japanese: "単価", english: "Unit price" },
  { japanese: "数量", english: "Quantity" },
  { japanese: "支払期限", english: "Payment deadline" },
  { japanese: "在庫確認", english: "Stock check / inventory confirmation" },
  { japanese: "発送", english: "Shipment / dispatch" },
  { japanese: "配送", english: "Delivery / distribution" },
  { japanese: "配送状況", english: "Delivery status" },
  { japanese: "荷物", english: "Package / luggage" },
  { japanese: "荷物追跡", english: "Package tracking" },
  { japanese: "輸送費", english: "Shipping cost" },
  { japanese: "返品", english: "Return" },
  { japanese: "返品送料", english: "Return shipping cost" },
  { japanese: "返金", english: "Refund" },
  { japanese: "不良品", english: "Defective product" },
  { japanese: "梱包", english: "Packing / packaging" },
  { japanese: "プロジェクター", english: "Projector" },
  { japanese: "投影機", english: "Projector (formal word)" },
  { japanese: "音響設備", english: "Audio / sound system" },
  { japanese: "マイク", english: "Microphone" },
  { japanese: "案内する", english: "To guide / show around" },
  { japanese: "準備", english: "Preparation" },
  { japanese: "参加者リスト", english: "Participant list" },
  { japanese: "会場", english: "Venue" },
  { japanese: "会場案内", english: "Venue guidance" },
  { japanese: "席順", english: "Seating order" }
];

// Function to get random 10 words
const getRandomWords = () => {
  const shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

type QuizState = 'start' | 'quiz' | 'finished' | 'review';

function App() {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentWords, setCurrentWords] = useState<typeof vocabulary>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<'none' | 'correct' | 'incorrect' | 'error'>('none');

  const startQuiz = () => {
    const words = getRandomWords();
    setCurrentWords(words);
    setCurrentIndex(0);
    setCorrectCount(0);
    setUserAnswer('');
    setShowAnswer(false);
    setAnswerStatus('none');
    setQuizState('quiz');
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setAnswerStatus('none');
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      setAnswerStatus('error');
      return;
    }

    const currentWord = currentWords[currentIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentWord.english.toLowerCase().trim();
    
    if (isCorrect) {
      setAnswerStatus('correct');
      setCorrectCount(prev => prev + 1);
    } else {
      setAnswerStatus('incorrect');
    }
  };

  const clearError = () => {
    if (answerStatus === 'error') {
      setAnswerStatus('none');
    }
  };

  const nextWord = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowAnswer(false);
      setAnswerStatus('none');
    } else {
      setQuizState('finished');
    }
  };

  const resetQuiz = () => {
    setQuizState('start');
  };

  const goToReview = () => {
    setQuizState('review');
  };

  const goToStart = () => {
    setQuizState('start');
  };

  if (quizState === 'start') {
    return (
      <div className="app">
        <div className="start-screen">
          <h1>🇯🇵 Japanese Vocabulary Quiz</h1>
          <p>Test your knowledge of Japanese business vocabulary!</p>
          <div className="start-buttons">
            <button className="start-button" onClick={startQuiz}>
              Start Quiz
            </button>
            <button className="review-button" onClick={goToReview}>
              Review Vocabulary
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'finished') {
    const percentage = Math.round((correctCount / currentWords.length) * 100);
    return (
      <div className="app">
        <div className="finished-screen">
          <h1>Good Job! 🎉</h1>
          <div className="final-score">
            <h2>You have {correctCount}/{currentWords.length} good answers</h2>
            <p>{percentage}% correct</p>
          </div>
          <div className="finished-buttons">
            <button className="start-button" onClick={resetQuiz}>
              Try Again
            </button>
            <button className="review-button" onClick={goToReview}>
              Review Vocabulary
            </button>
            <button className="home-button" onClick={goToStart}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'review') {
    return (
      <div className="app">
        <div className="review-screen">
          <h1>📚 Vocabulary Review</h1>
          <p>All Japanese business vocabulary words</p>
          <div className="vocabulary-list">
            {vocabulary.map((word, index) => (
              <div key={index} className="vocabulary-item">
                <div className="japanese-text">{word.japanese}</div>
                <div className="english-text">{word.english}</div>
              </div>
            ))}
          </div>
          <button className="home-button" onClick={goToStart}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentWord = currentWords[currentIndex];
  const progress = `${correctCount}/${currentIndex + 1}(${currentWords.length})`;

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="progress-counter">
          {progress}
        </div>
        
        <div className="quiz-card">
          <div className="card-upper">
            <h2 className="japanese-word">{currentWord.japanese}</h2>
          </div>
          
          <div className="card-lower">
            {!showAnswer && (answerStatus === 'none' || answerStatus === 'error') ? (
              <div className="input-container">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    clearError();
                  }}
                  placeholder="Type your answer here..."
                  className="answer-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                />
                {answerStatus === 'error' && (
                  <div className="error-message">
                    Please type your answer
                  </div>
                )}
              </div>
            ) : (
              <div className="answer-display">
                {showAnswer ? (
                  <span className="correct-answer">{currentWord.english}</span>
                ) : answerStatus === 'correct' ? (
                  <div className="result-correct">
                    <div className="checkmark">✓</div>
                    <span>Correct!</span>
                  </div>
                ) : answerStatus === 'incorrect' ? (
                  <div className="result-incorrect">
                    <div className="cross">✗</div>
                    <span>Incorrect. Answer: {currentWord.english}</span>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="button-container">
          {!showAnswer && answerStatus === 'none' ? (
            <>
              <button className="show-answer-btn" onClick={handleShowAnswer}>
                Show Answer
              </button>
              <button className="submit-btn" onClick={handleSubmitAnswer}>
                Answer
              </button>
            </>
          ) : answerStatus === 'error' ? (
            <>
              <button className="show-answer-btn" onClick={handleShowAnswer}>
                Show Answer
              </button>
              <button className="submit-btn" onClick={handleSubmitAnswer}>
                Answer
              </button>
            </>
          ) : (
            <button className="next-btn" onClick={nextWord}>
              Next Word
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
