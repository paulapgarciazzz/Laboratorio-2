import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,

} from '@tanstack/react-router'
///////////////////////////////////////////////////////////////////////////////
///La ruta raiz es lo primero que se carga en el sitio, osea el primer componente
import SaludoJhon from './Components/SaludoJhon'
import QuizComponent from './Components/QuizComponent'
import BuscarPokemon from './Components/BuscarPokemon'
import './App.css'

const rootRoute = createRootRoute ({
    component: function RootLayout(){
        return (
        <> 
        <nav style ={{display: 'flex', gap: '1rem', padding : '1rem'}}>
            <Link to ="/" activeProps={{style: {fontWeight: 'bold'}}}>
            Inicio
            </Link>
            <Link to ="/quiz" activeProps={{style: {fontWeight: 'bold'}}}>
            Quiz
            </Link>
            <Link to ="/Pokemon" activeProps={{style: {fontWeight: 'bold'}}}>
            Pokemon
            </Link>
            </nav>
            <section id = 'center'>
                <Outlet/>
                </section>
        </>

        )
    },  
    })
    /////////////////////////////////////////////////////////////////////////////////
    const indexRoute = createRoute({
        getParentRoute:()=>rootRoute,
        path: '/',
        component: SaludoJhon,
    })

    const QuizRoute = createRoute({
        getParentRoute:()=>rootRoute,
        path: '/quiz',
        component: QuizComponent,
    })

    const pokemonRoute = createRoute({
        getParentRoute:()=>rootRoute,
        path: '/pokemon',
        component: BuscarPokemon,
    })


    const routeTree = rootRoute.addChildren([indexRoute,QuizRoute,pokemonRoute])

    export const router = createRouter({routeTree})