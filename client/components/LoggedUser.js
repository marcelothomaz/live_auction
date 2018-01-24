import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles'

let styles = {}

class LoggedUser extends Component {
   constructor(props) {
      super(props)
   }

   avatarColors = () => {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);

      var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      var text = (a<0.5) ? 'white' : 'black'
      var bg = '#'+r.toString(16)+g.toString(16)+b.toString(16)

      return {text,bg}
   }

   componentWillMount() {
      const { text, bg } = this.avatarColors()

      styles = {
         avatar: {
            'backgroundColor': bg,
            'color': text }
      }
   }

   render() {
      const { classes, name } = this.props
      return (
         <Avatar className={classes.avatar}>{name}</Avatar>
      )
   }
}

export default withStyles(styles)(LoggedUser)
