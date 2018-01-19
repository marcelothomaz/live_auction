// src/components/Layout.js
import React, { Fragment } from 'react'
import { Link  } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { MuiThemeProvider,createMuiTheme } from 'material-ui/styles'
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';

import 'typeface-roboto'

import Header from './Header'
import Footer from './Footer'

import styles from '../css/navbar.css'
import main from '../css/main.scss'

const theme = createMuiTheme({
   contrastThreshold: 3,
   tonalOffset: 0.2,
   primary: indigo,
   secondary: pink,
   error: {
      main: red[500],

   },
},)

const Layout = ({ route }) => {
   return (
      <MuiThemeProvider theme={theme}>
         <div className={main.content}>
            <Header/>
            <main>{renderRoutes(route.routes)}</main>
            <Footer/>
         </div>
      </MuiThemeProvider>
   )
}

export default Layout
