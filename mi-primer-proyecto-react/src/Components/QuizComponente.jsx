
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function QuizComponente() {

    const [preguntas , setPreguntas] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [selectedClick, setSelectedClick] = useState(null);
    const [preguntaActual, setPreguntaActual] = useState(0);

    const handleAnswerClick = (index) => {
        setSelectedClick(index);
        if(preguntas[preguntaActual]?.correctAnswer === index){
            setShowConfetti(true);
            
            setTimeout(()=>{
                setShowConfetti(false);
            }, 3000);

          

        }
    }
    useEffect(() => {
        const fetchquiz= async () => {
            const headers = new Headers();
            headers.append("X-Master-Key","$2a$10$3FJS/N2fx/4MX8S6D4g8b.3WmRIS5.uqt5eWOxoibP8FMTxEs.NQK");
            try {
                const response = await fetch("https://api.jsonbin.io/v3/b/69d85d4a856a6821891942f5", { headers });
                const data = await response.json();
                setPreguntas(data.record);
            }catch(error){
                console.error("Error fetching quiz data:", error);
            }
        }

        fetchquiz();
    },[])
    return (
        <>
            {showConfetti && <Confetti />}
            <div>
                <h2> Quiz Component</h2>
                <p>{preguntas[preguntaActual]?.question}</p>
                {preguntas[preguntaActual]?.img && (
                    <img src={preguntas[preguntaActual].img} alt= "imagen de la pregunta" className= "question-image"/>
                )}
                <div>
                    {preguntas[preguntaActual]?.answers.map((option, index) => (
                        <button key={index} className="answer-button" onClick={() =>handleAnswerClick(index)} disabled={selectedClick !== null} 
                        style={{ 
                            backgroundColor: selectedClick === index 
                            ?(preguntas[preguntaActual]?.correctAnswer === index ? "green" : "red")  
                            : "beige", color: selectedClick === index && preguntas[preguntaActual]?.correctAnswer === index ? "white" : "black"}
                        }> {option}</button>
                        
                    ))}
                </div>
                <div>
                    <button key="previous" className="previous-button" onClick={() => {setSelectedClick(null); setPreguntaActual(preguntaActual - 1)}} disabled={preguntaActual === 0}>
                        Pregunta Anterior
                    </button>
                    <button key="next" className="next-button" onClick={() => {setSelectedClick(null); setPreguntaActual(preguntaActual + 1)}} disabled={preguntaActual === preguntas.length - 1}>
                        Siguiente Pregunta
                    </button>
                </div>
            </div>
        </>
    )
}