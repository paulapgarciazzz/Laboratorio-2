// hooks/useLab.js
import { useState, useEffect } from 'react';
import { fetchPreguntas } from '../Services/api';

export const useLAB = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [respondida, setRespondida] = useState(false);
  const [mostrarConfeti, setMostrarConfeti] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        setError(null);
        const data = await fetchPreguntas();
        setPreguntas(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    cargarPreguntas();
  }, []);

  const preguntaActual = preguntas[indice];
  const esCorrecta = seleccion === preguntaActual?.correctAnswer;

  const responder = (Opcion) => {
    if (respondida) return;
    
    setSeleccion(Opcion);
    setRespondida(true);
    
    if (Opcion === preguntaActual.correctAnswer) {
      setMostrarConfeti(true);
      setTimeout(() => setMostrarConfeti(false), 10000);
    }
  };

  const siguientePregunta = () => {
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
      setSeleccion(null);
      setRespondida(false);
      setMostrarConfeti(false);
    }
  };

  const anteriorPregunta = () => {
    if (indice - 1 >= 0) {
      setIndice(indice - 1);
      setSeleccion(null);
      setRespondida(false);
      setMostrarConfeti(false);
    }
  };

  return {
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
    cargando: preguntas.length === 0 && !error,
    error
  };
};