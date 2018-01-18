// src/components/Footer.js
import React from 'react'
import { Link  } from 'react-router-dom'

import main from '../css/main.scss'

export default class Footer extends React.Component {
   render() {
      return (
            <footer>
               <div className={main.container}>
                  <p>
                  This is a demo app to showcase universal rendering and routing with <strong>React</strong> and <strong>Express</strong>.
                  </p>
               </div>
            </footer>
      )
   }
}
