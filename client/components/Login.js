import React, { Component } from 'react';

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment  } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel  } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { withStyles } from 'material-ui/styles'

const styles = {
   form_wrapper: {
      display: 'grid',
      justifyContent: 'center',
      gridGap: '12px',
      gridTemplateColumns: '300px',
      marginTop: '7vh',
   },
   form_class: {
      display: 'grid',
   },
}

class Login extends Component {
   state = {
      showPassword: false,
      password: '',
      name: '',
      rememberMe: false
   }

   handleChange = prop => event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({ [prop]: value });

   };

   handleClickShowPasssword = () => {
      this.setState({ showPassword: !this.state.showPassword  });

   };

   handleMouseDownPassword = event => {
      event.preventDefault();

   };

   render() {
      const { classes } = this.props

      return (
         <div className={classes.form_wrapper}>
            <form id="signin" autoComplete="off" className={classes.form_class}>
               <FormControl>
                  <InputLabel htmlFor="email">
                     Email
                  </InputLabel>
                  <Input id="email" onChange={this.handleChange('email')} />
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                     id="adornment-password"
                     type={this.state.showPassword ? 'text' : 'password'}
                     value={this.state.password}
                     onChange={this.handleChange('password')}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={this.handleClickShowPasssword}
                              onMouseDown={this.handleMouseDownPassword}
                           >
                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>

                     }
                  />
               </FormControl>
               <FormControl>
                  <FormControlLabel
                     control={
                        <Checkbox 
                           checked={this.state.rememberMe} 
                           onChange={this.handleChange('rememberMe')}
                           value='rememberMe'
                           />
                     }
                     label='Remember me'
                  />
               </FormControl>
            </form>
            <a href="/signup">Sign up</a>
            <a href="/recover">Forgot your password?</a>
         </div>
      )
   }
}

export default withStyles(styles)(Login)
