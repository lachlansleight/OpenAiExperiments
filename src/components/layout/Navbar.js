import React from 'react'
import {Link} from 'react-router-dom'

import './navbar.css'

const Navbar = () => {
    return (
        <nav className="main-nav">
            <div className="container">
                <div className="logo">
                    <div>
                        <Link to={`/`}>Open AI Experimenter<span className="version-number">v0.0.1</span></Link>
                    </div>
                </div>
                <ul>
                    <li><Link to={`/`}>Home</Link></li>
                    <li><Link to={`/login`}>Login</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;