import {useState} from 'react';
import './SaludoJairo.css';

export default function SaludoJairo() {
    const [name, setName] = useState('Jairo');  

    return (
        <section className='Saludo'>
            <h2 className='saludo_title'>¡Hola {name}!    </h2>
            <p className='saludo_extra'>
            ¡buenas!    
            </p>
        </section>
    )
}