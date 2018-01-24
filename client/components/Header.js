// src/components/Header.js
import React from 'react'
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles  } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { grey } from 'material-ui/colors'
import Button from 'material-ui/Button'

import LoggedUser from './LoggedUser'

const styles = {
   root: {
      width: '100%'
   },
   flex: {
      flex: 1
   }
};

class Header extends React.Component {
   constructor(props) {
      super(props)
   }

   render() {
      const { classes, name } = this.props
      return (
         <div className={classes.root}>
            <AppBar position="static">
               <Toolbar>
                  <Button component={Link} to="/" color="contrast">Home</Button>
                  <div className={classes.flex}></div>
                  {this.props.isLogged ? (
                     <LoggedUser name={name.split(' ').reduce((acc,val) => { return acc + val[0]  }, '').toUpperCase()}/>
                  ) : (
                     <>
                     <Button component={Link} to="/login" color="contrast">Log In</Button>
                     <Button component={Link} to="/signup" color="accent">Sign Up</Button>
                     </>
                  )}
               </Toolbar>
            </AppBar>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      isLogged: state.login.logged,
      name: state.login.name
   }
}

export default connect(mapStateToProps)(withStyles(styles)(Header))
