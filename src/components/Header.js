import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { HiMenu } from 'react-icons/hi'
import AuthContext from '../context/AuthContext'


const navigation = [
    { name: 'Animales', href: '/animales' },
    { name: 'Dietas', href: '/dietas' },
    { name: 'Costos', href: '/costos' },
]

export default function Header(props) {
    const { user, logoutUser } = useContext(AuthContext)

    const displayMenu = () => {
        var x = document.getElementById('nav')
        if (x.className === 'nav')
            x.className += ' responsive'
        else
            x.className = 'nav'
    }

    return (
        <>
            {user ?
                <div className='header'>
                    <nav className='container-fluid nav' id='nav'>
                        <ul>
                            <li key='nav'>
                                <button className='nav-icon' onClick={displayMenu}>
                                    <HiMenu />
                                </button>
                            </li>
                            {navigation.map((item) => {
                                return (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.href}
                                            className={({ isActive }) => {
                                                return isActive ? 'nav-selected' : null
                                            }}>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                )
                            })}

                            <li key='logout'>
                                <NavLink
                                    to={'/login'}
                                    onClick={logoutUser}> Cerrar sesión </NavLink>
                            </li>
                        </ul>
                        <ul>
                            <li><strong>Bovinos</strong></li>
                        </ul>
                    </nav>
                </div>
                :
                null
            }
            {props.children}
        </>
    )
}