// src/components/Header.js
import React from 'react'
import { Link  } from 'react-router-dom'

import styles from '../css/navbar.css'
import main from '../css/main.scss'

export default class Header extends React.Component {
   render() {
      return (
         <header>
            <nav className={styles.menu}>
               <div className={main.container}>
                  <ul>
                     <li><Link to="/">Home</Link></li>
                     <li className={styles.right}><Link to="/login">Log In</Link></li>
                     <li className={styles.right}><Link to="/signup">Sign Up</Link></li>
                  </ul>
               </div>
            </nav>
         </header>
      )
   }
}
