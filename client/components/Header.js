// src/components/Header.js
import React from 'react'
import { Link  } from 'react-router-dom'

import { withStyles  } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { grey } from 'material-ui/colors'
import Button from 'material-ui/Button'


const styles = {
   root: {
      width: '100%'
   },
   flex: {
      flex: 1
   }
};

const Header = ({ classes }) => {
   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Button component={Link} to="/" color="contrast">Home</Button>
               <div className={classes.flex}></div>
               <Button component={Link} to="/login" color="contrast">Log In</Button>
               <Button component={Link} to="/signup" color="accent">Sign Up</Button>
            </Toolbar>
         </AppBar>
      </div>
   );
}

export default withStyles(styles)(Header)
