// src/routes.js
import IndexPage from './components/IndexPage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NotFoundPage from './components/NotFoundPage'
import Layout from './components/Layout'

const routes = [
   {
      component: Layout,
      routes: [
         {
            path: '/',
            exact: true,
            component: IndexPage
         },
         {
            path: '/login',
            component: Login
         },{
            path: '/signup',
            component: SignUp
         }
      ]
   },
   {
      path: '*',
      component: NotFoundPage
   }
]

export default routes;
