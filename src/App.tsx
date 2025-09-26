import React, { useState } from 'react';
import './App.css';

// Vocabulary data
const vocabulary = [
  { japanese: "参加する", hiragana: "さんかする", english: "To participate" },
  { japanese: "提案", hiragana: "ていあん", english: "Proposal / suggestion" },
  { japanese: "会議", hiragana: "かいぎ", english: "Meeting" },
  { japanese: "打ち合わせ", hiragana: "うちあわせ", english: "Meeting / briefing" },
  { japanese: "会議資料", hiragana: "かいぎしりょう", english: "Meeting materials" },
  { japanese: "客先 / 顧客", hiragana: "きゃくさき / こきゃく", english: "Client / customer" },
  { japanese: "説明会", hiragana: "せつめいかい", english: "Briefing / orientation" },
  { japanese: "品質", hiragana: "ひんしつ", english: "Quality" },
  { japanese: "相談する / 相談", hiragana: "そうだんする / そうだん", english: "To consult / consultation" },
  { japanese: "参加者", hiragana: "さんかしゃ", english: "Participant" },
  { japanese: "予定", hiragana: "よてい", english: "Schedule / plan" },
  { japanese: "調整", hiragana: "ちょうせい", english: "Adjustment" },
  { japanese: "日程", hiragana: "にってい", english: "Schedule / timetable" },
  { japanese: "確認", hiragana: "かくにん", english: "Confirmation" },
  { japanese: "予約", hiragana: "よやく", english: "Reservation / booking" },
  { japanese: "出席", hiragana: "しゅっせき", english: "Attendance" },
  { japanese: "欠席", hiragana: "けっせき", english: "Absence" },
  { japanese: "会議室", hiragana: "かいぎしつ", english: "Meeting room" },
  { japanese: "議題", hiragana: "ぎだい", english: "Agenda / topic" },
  { japanese: "発表", hiragana: "はっぴょう", english: "Presentation" },
  { japanese: "契約", hiragana: "けいやく", english: "Contract" },
  { japanese: "契約更新", hiragana: "けいやくこうしん", english: "Contract renewal" },
  { japanese: "条件", hiragana: "じょうけん", english: "Terms / conditions" },
  { japanese: "条件交渉", hiragana: "じょうけんこうしょう", english: "Negotiation of terms" },
  { japanese: "取引先", hiragana: "とりひきさき", english: "Business partner / client company" },
  { japanese: "利益", hiragana: "りえき", english: "Profit" },
  { japanese: "費用", hiragana: "ひよう", english: "Expense / cost" },
  { japanese: "支払い", hiragana: "しはらい", english: "Payment" },
  { japanese: "請求 / 請求書", hiragana: "せいきゅう / せいきゅうしょ", english: "Billing / invoice" },
  { japanese: "領収書", hiragana: "りょうしゅうしょ", english: "Receipt" },
  { japanese: "納期", hiragana: "のうき", english: "Delivery date / due date" },
  { japanese: "納期遵守", hiragana: "のうきじゅんしゅ", english: "Meeting deadlines / punctual delivery" },
  { japanese: "遅延", hiragana: "ちえん", english: "Delay" },
  { japanese: "完了", hiragana: "かんりょう", english: "Completion" },
  { japanese: "提出", hiragana: "ていしゅつ", english: "Submission" },
  { japanese: "納品", hiragana: "のうひん", english: "Delivery of goods" },
  { japanese: "作業", hiragana: "さぎょう", english: "Work / task" },
  { japanese: "担当", hiragana: "たんとう", english: "Person in charge" },
  { japanese: "確認済み", hiragana: "かくにんずみ", english: "Confirmed" },
  { japanese: "指示", hiragana: "しじ", english: "Instructions" },
  { japanese: "書類", hiragana: "しょるい", english: "Document" },
  { japanese: "見積もり", hiragana: "みつもり", english: "Estimate / quotation" },
  { japanese: "発注", hiragana: "はっちゅう", english: "Order (placing an order)" },
  { japanese: "発注書", hiragana: "はっちゅうしょ", english: "Purchase order" },
  { japanese: "納品書", hiragana: "のうひんしょ", english: "Delivery note" },
  { japanese: "合計金額", hiragana: "ごうけいきんがく", english: "Total amount" },
  { japanese: "単価", hiragana: "たんか", english: "Unit price" },
  { japanese: "数量", hiragana: "すうりょう", english: "Quantity" },
  { japanese: "支払期限", hiragana: "しはらいきげん", english: "Payment deadline" },
  { japanese: "在庫確認", hiragana: "ざいこかくにん", english: "Stock check / inventory confirmation" },
  { japanese: "発送", hiragana: "はっそう", english: "Shipment / dispatch" },
  { japanese: "配送", hiragana: "はいそう", english: "Delivery / distribution" },
  { japanese: "配送状況", hiragana: "はいそうじょうきょう", english: "Delivery status" },
  { japanese: "荷物", hiragana: "にもつ", english: "Package / luggage" },
  { japanese: "荷物追跡", hiragana: "にもつついせき", english: "Package tracking" },
  { japanese: "輸送費", hiragana: "ゆそうひ", english: "Shipping cost" },
  { japanese: "返品", hiragana: "へんぴん", english: "Return" },
  { japanese: "返品送料", hiragana: "へんぴんそうりょう", english: "Return shipping cost" },
  { japanese: "返金", hiragana: "へんきん", english: "Refund" },
  { japanese: "不良品", hiragana: "ふりょうひん", english: "Defective product" },
  { japanese: "梱包", hiragana: "こんぽう", english: "Packing / packaging" },
  { japanese: "プロジェクター", hiragana: "ぷろじぇくたー", english: "Projector" },
  { japanese: "投影機", hiragana: "とうえいき", english: "Projector (formal word)" },
  { japanese: "音響設備", hiragana: "おんきょうせつび", english: "Audio / sound system" },
  { japanese: "マイク", hiragana: "まいく", english: "Microphone" },
  { japanese: "案内する", hiragana: "あんないする", english: "To guide / show around" },
  { japanese: "準備", hiragana: "じゅんび", english: "Preparation" },
  { japanese: "参加者リスト", hiragana: "さんかしゃりすと", english: "Participant list" },
  { japanese: "会場", hiragana: "かいじょう", english: "Venue" },
  { japanese: "会場案内", hiragana: "かいじょうあんない", english: "Venue guidance" },
  { japanese: "席順", hiragana: "せきじゅん", english: "Seating order" },
  { japanese: "お問い合わせ", hiragana: "おといあわせ", english: "Inquiry / Contact" },
  { japanese: "クレーム", hiragana: "くれーむ", english: "Complaint / Claim" },
  { japanese: "対応する", hiragana: "たいおうする", english: "To respond / handle" },
  { japanese: "サポート", hiragana: "さぽーと", english: "Support" },
  { japanese: "解決", hiragana: "かいけつ", english: "Solution / Resolution" },
  { japanese: "保証", hiragana: "ほしょう", english: "Warranty / Guarantee" },
  { japanese: "返金対応", hiragana: "へんきんたいおう", english: "Refund handling" },
  { japanese: "調査", hiragana: "ちょうさ", english: "Investigation / Research" },
  { japanese: "顧客満足", hiragana: "こきゃくまんぞく", english: "Customer satisfaction" },
  { japanese: "フォローアップ", hiragana: "ふぉろーあっぷ", english: "Follow-up" }
];

// Function to get random 10 words
const getRandomWords = () => {
  const shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

// Function to generate multiple choice options
const generateMultipleChoiceOptions = (correctAnswer: string, allWords: typeof vocabulary) => {
  // Get 3 random wrong answers from the vocabulary
  const wrongAnswers = allWords
    .filter(word => word.english !== correctAnswer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(word => word.english);
  
  // Combine with correct answer and shuffle
  const allOptions = [...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random());
  return allOptions;
};

type QuizState = 'start' | 'quiz' | 'multiple-choice' | 'finished' | 'review';
type QuizType = 'normal' | 'multiple-choice';

function App() {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [quizType, setQuizType] = useState<QuizType>('normal');
  const [currentWords, setCurrentWords] = useState<typeof vocabulary>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [correctCount, setCorrectCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<'none' | 'correct' | 'incorrect' | 'error'>('none');
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<string[]>([]);

  const startQuiz = (type: QuizType = 'normal') => {
    const words = getRandomWords();
    setCurrentWords(words);
    setCurrentIndex(0);
    setCorrectCount(0);
    setUserAnswer('');
    setSelectedChoice('');
    setShowAnswer(false);
    setAnswerStatus('none');
    setQuizType(type);
    
    if (type === 'multiple-choice') {
      const options = generateMultipleChoiceOptions(words[0].english, vocabulary);
      setMultipleChoiceOptions(options);
      setQuizState('multiple-choice');
    } else {
      setQuizState('quiz');
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setAnswerStatus('none');
  };

  const handleSubmitAnswer = () => {
    const currentWord = currentWords[currentIndex];
    let isCorrect = false;

    if (quizType === 'multiple-choice') {
      if (!selectedChoice) {
        setAnswerStatus('error');
        return;
      }
      isCorrect = selectedChoice === currentWord.english;
    } else {
      if (!userAnswer.trim()) {
        setAnswerStatus('error');
        return;
      }
      isCorrect = userAnswer.toLowerCase().trim() === currentWord.english.toLowerCase().trim();
    }
    
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
      setSelectedChoice('');
      setShowAnswer(false);
      setAnswerStatus('none');
      
      if (quizType === 'multiple-choice') {
        const options = generateMultipleChoiceOptions(currentWords[currentIndex + 1].english, vocabulary);
        setMultipleChoiceOptions(options);
      }
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
            <button className="start-button" onClick={() => startQuiz('normal')}>
              Normal Quiz
            </button>
            <button className="multiple-choice-button" onClick={() => startQuiz('multiple-choice')}>
              Multiple Choice Quiz
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
                <div className="japanese-section">
                  <div className="japanese-text">{word.japanese}</div>
                  <div className="hiragana-text">{word.hiragana}</div>
                </div>
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

  // Multiple Choice Quiz Component
  if (quizState === 'multiple-choice') {
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
                <div className="multiple-choice-container">
                  {multipleChoiceOptions.map((option, index) => (
                    <label key={index} className="choice-label">
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={selectedChoice === option}
                        onChange={(e) => {
                          setSelectedChoice(e.target.value);
                          clearError();
                        }}
                        className="choice-radio"
                      />
                      <span className="choice-text">{option}</span>
                    </label>
                  ))}
                  {answerStatus === 'error' && (
                    <div className="error-message">
                      Please select an answer
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

  // Normal Quiz Component
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
