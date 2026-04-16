import { useEffect, useState } from "react"
import Confetti from 'react-confetti'
export default function QuizComponent() {
const [preguntas, setPreguntas] = useState([]);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [answered, setAnswered] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);


const BotonColor = (index) => {
  if (!answered) return {};
  if (index === preguntas[0]?.correctAnswer) {
    return { backgroundColor: 'green', color: 'white' };
  }
  if (index === selectedAnswer) {
    return { backgroundColor: 'red', color: 'white' };
  }
  return {};
}

const heandleAnswerClick = (Index) => {
    setSelectedAnswer(Index);
    setAnswered(true);
    if (preguntas[0]?.correctAnswer === Index) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Oculta el confeti después de 3 segundos
    }
}
useEffect(() => {
    const headers = new Headers();
    headers.append('X-Master-Key', '$2a$10$D4GL6SynYBNAWi4ZnUh12Ol.DRAPsH6FocHOK8O4p6kdILjkWLGz6'); //Error de seguridad, muy mala practica, no se deben exponer las claves en el código fuente
    const fetchQuiz=async () => {
        try {
            const response = await fetch('https://api.jsonbin.io/v3/b/69d482fe856a68218907cf25', { headers });   
            const data = await response.json();
            setPreguntas(data.record);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    }
    fetchQuiz();
}, []);



return (  

<>
{showConfetti && <Confetti width={window.innerWidth}
    height={window.innerHeight}/>}
<div>
    <h1>Quiz Component</h1>
<p>{preguntas[0]?.question}</p> 

<div>
{preguntas[0]?.answers.map((option, index) => ( 
<button key={index} onClick={() => heandleAnswerClick(index)} style={BotonColor(index)}>
{option}
</button>
))}
</div>
</div>
</>
)}