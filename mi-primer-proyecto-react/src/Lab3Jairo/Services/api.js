import.meta.env.VITE_API_URL

export const fetchPreguntas = async () => {
  try {
    const respuesta = await fetch('https://api.jsonbin.io/v3/b/69ea5b61856a6821896608dd' , {
      headers: {
        'X-Access-Key': import.meta.env.VITE_ACCESS_KEY,
      },
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
