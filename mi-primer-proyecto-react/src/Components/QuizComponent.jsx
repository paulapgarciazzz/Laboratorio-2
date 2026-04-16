import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./QuizComponent.css";

export default function QuizComponent() {
  const [preguntas, setPreguntas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const BotonColor = (index) => {
    if (!answered) return "";

    if (index === preguntas[currentIndex]?.correctAnswer) {
      return "correct";
    }

    if (index === selectedAnswer) {
      return "incorrect";
    }

    return "";
  };

  const heandleAnswerClick = (Index) => {
    if (answered) return;

    setSelectedAnswer(Index);
    setAnswered(true);

    if (preguntas[currentIndex]?.correctAnswer === Index) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const siguientePregunta = () => {
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  useEffect(() => {
    const headers = new Headers();

    headers.append(
     "X-Master-key" ,"$2a$10$D4GL6SynYBNAWi4ZnUh12Ol.DRAPsH6FocHOK8O4p6kdILjkWLGz6"
    );

    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/69e16b8faaba882197093524",
          { headers }
        );

        const data = await response.json();
        setPreguntas(data.record);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuiz();
  }, []);

  if (preguntas.length === 0) {
    return <h2>Cargando...</h2>;
  }

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      <div className="container">
        <div className="card">
          <h1>Quiz Component</h1>

          {currentIndex < preguntas.length ? (
            <>
              <p className="question">
                {preguntas[currentIndex]?.question}
              </p>

              <div className="answers">
                {preguntas[currentIndex]?.answers.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => heandleAnswerClick(index)}
                    className={`answer-btn ${BotonColor(index)}`}
                    disabled={answered}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <button
                  className="next-btn"
                  onClick={siguientePregunta}
                >
                  Siguiente
                </button>
              )}
            </>
          ) : (
            <h2> Quiz terminado :3 </h2>
          )}
        </div>
      </div>
    </>
  );
}