// services/api.js
const API_URL = 'https://api.jsonbin.io/v3/b/69e0241736566621a8ba0f4e';
const MASTER_KEY = '$2a$10$J5SIxPIQVH8WJm4rRnOdC.18exFab9Plpvidq/psoYVhTKoZZBZe.';

export const fetchPreguntas = async () => {
  try {
    const respuesta = await fetch(API_URL, {
      headers: {
        'X-Master-Key': MASTER_KEY
      }
    });
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();
    return datos.record;
    
  } catch (error) {
    console.error('Error en fetchPreguntas:', error);
    throw error;
  }
};