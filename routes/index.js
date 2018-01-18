import express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'

import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'

import routes from '../client/routes'

const router = express.Router()

router.get('*', (req, res) => {
   let context  = {}
   const content = renderToString(
      <StaticRouter location={req.url} context={context}>
         {renderRoutes(routes)}
      </StaticRouter>
   )
   if (context.status === 404) {
      res.status(404)
   }
   res.render('index', {title: 'Live Auction', data: false, content })
})

export default router
