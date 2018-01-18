// src/components/Layout.js
import React, { Fragment } from 'react'
import { Link  } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import 'typeface-roboto'

import Header from './Header'
import Footer from './Footer'

import styles from '../css/navbar.css'
import main from '../css/main.scss'

const Layout = ({ route }) => {
      return (
         <div className={main.content}>
            <Header/>
            <main>{renderRoutes(route.routes)}</main>
            <Footer/>
         </div>
      )
}

export default Layout
