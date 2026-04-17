// components/Preguntas.jsx
import React from 'react';
import Confetti from 'react-confetti';
import { useLAB } from '../hooks/useLab';
import './Preguntas.css';

const Preguntas = () => {
  const {
    preguntas,
    indice,
    seleccion,
    respondida,
    mostrarConfeti,
    preguntaActual,
    esCorrecta,
    responder,
    siguientePregunta,
    anteriorPregunta,  
    cargando,
    error
  } = useLAB();

  const letras = ['A', 'B', 'C', 'D'];

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-mensaje">
          <h3> Error al cargar las preguntas</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (cargando) {
    return (
      <div className="quiz-container">
        <div className="cargando">
          <p>Cargando preguntas...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {mostrarConfeti && <Confetti />}
      
      <div className="progreso">
        Pregunta {indice + 1} de {preguntas.length}
      </div>
      
      <div className="tarjeta">
        <h3>{preguntaActual.question}</h3>
        
        <div className="opciones">
          {preguntaActual.answers.map((opcion, index) => {
            let claseBoton = 'boton-opcion';
            
            if (respondida) {
              if (index === preguntaActual.correctAnswer) {
                claseBoton += ' correcta';
              } else if (index === seleccion && !esCorrecta) {
                claseBoton += ' incorrecta';
              }
            }
            
            return (
              <button
                key={index}
                className={claseBoton}
                data-letra={letras[index]}
                onClick={() => responder(index)}
                disabled={respondida}
              >
                {opcion}
              </button>
            );
          })}
        </div>
        
        {respondida && (
          <div className="feedback">
            <p className={esCorrecta ? 'texto-correcto' : 'texto-incorrecto'}>
              {esCorrecta 
                ? ' ¡Correcto!' 
                : ` Incorrecto. La respuesta era: ${preguntaActual.answers[preguntaActual.correctAnswer]}`}
            </p>
            
            <div className="botones-navegacion">
              {indice > 0 && (
                <button 
                  className="boton-anterior"
                  onClick={anteriorPregunta}
                >
                  ← Pregunta anterior
                </button>
              )}
              
              {indice + 1 < preguntas.length ? (
                <button 
                  className="boton-siguiente"
                  onClick={siguientePregunta}
                >
                  Siguiente pregunta →
                </button>
              ) : (
                <button 
                  className="boton-reiniciar"
                  onClick={() => window.location.reload()}
                >
                   Reiniciar quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preguntas;