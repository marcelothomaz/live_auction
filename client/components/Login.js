import React, { Component } from 'react';

class Login extends Component {
   render() {
      return (
         <main>
            <form id="signin">
               <legend>Sign In</legend>
               <label htmlFor="email">Email</label>
               <input type="email" name="email" id="email"/>
               <label htmlFor="pass">Password</label>
               <input type="password" name="pass" id="pass"/>
               <label><input type="checkbox"/>Remember me</label>
               <button type="submit" value="Sign in"/>
         </form>
         <a href="/signup">Sign up</a>
         <a href="/recover">Forgot your password?</a>
         </main>
      )
   }
}

export default Login
