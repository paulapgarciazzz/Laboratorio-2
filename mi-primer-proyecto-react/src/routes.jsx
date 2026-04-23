import{
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,

} from '@tanstack/react-router'

import SaludoJairo from './Components/SaludoJairo'
import Preguntas from './Lab3Jairo/ComponentesJairo/Preguntas.jsx'
import './App.css'

const RootRoute = createRootRoute({
    component: function RootLayout(){
        return(
            <>
            <nav style={{display: 'flex', gap: '1rem', padding: '1rem'}}>
                <Link to="/" activeProps={{style: {fontWeight: 'bold'}}}>
                Inicio
                </Link>
                <Link to="/quiz" activeProps={{style: { fontWeight: 'bold'}}}> 
                Quiz
                </Link>
            </nav>
            <section id="center">
                <Outlet />
            </section>

            </>
            )
        },
})


const indexRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/',
    component: SaludoJairo ,
})

const quizRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/quiz',
    component: Preguntas ,
})



const routeTree = RootRoute.addChildren([indexRoute, quizRoute])

export const router = createRouter({
    routeTree,
})