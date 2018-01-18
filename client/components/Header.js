// src/components/Header.js
import React from 'react'
import { Link  } from 'react-router-dom'

import styles from '../css/navbar.css'

export default class Header extends React.Component {
   render() {
      return (
            <header>
               <nav className={styles.menu}>
                  <ul>
                     <li><Link to="/">Home</Link></li>
                     <li className={styles.right}><Link to="/login">Log In</Link></li>
                     <li className={styles.right}><Link to="/signup">Sign Up</Link></li>
                  </ul>
               </nav>
            </header>
      )
   }
}
