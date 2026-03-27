import {useState} from 'react';
import './SaludoPaula.css';

export default function SaludoPaula() {
    const [name, setName] = useState('Paula');  
    
    return (
        <section className='Saludo'>
            <h2 className='saludo_title'>¡Hola {name}!    </h2>
            <p className='saludo_extra'>
            ¡buenas!    
            </p>
        </section>
    )
}