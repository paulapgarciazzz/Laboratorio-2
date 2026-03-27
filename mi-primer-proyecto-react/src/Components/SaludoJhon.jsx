import {useState} from 'react';
import './SaludoJhon.css';

export default function SaludoJhon() {
    const [name, setName] = useState('Jhon');  

    return (
        <section className='Saludo'>
            <h2 className='saludo_title'>¡Hola {name}!    </h2>
            <p className='saludo_extra'>
            ¡buenas!    
            </p>
        </section>
    )
}