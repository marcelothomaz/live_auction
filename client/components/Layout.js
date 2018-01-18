// src/components/Layout.js
import React from 'react'
import { Link  } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import Header from './Header'
import Footer from './Footer'

import 'normalize.css'
import styles from '../css/navbar.css'

const Layout = ({ route }) => {
      return [
            <header key="Header">
               <nav className={styles.menu}>
                  <ul>
                     <li key="home"><Link to="/">Home</Link></li>
                     <li key="signin" className={styles.right}><Link to="/login">Sign In</Link></li>
                     <li key="singup" className={styles.right}><Link to="/signup">Sign Up</Link></li>
                  </ul>
               </nav>
            </header>,
            <main key="Main">{renderRoutes(route.routes)}</main>,
            <footer key="Footer">
               <p>
               This is a demo
               </p>
            </footer>
      ]
}

export default Layout
