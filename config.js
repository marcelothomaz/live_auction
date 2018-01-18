var config = {}

switch (process.env.NODE_END) {
   case 'production':
      config = {
         SESSION_SECRET: process.env.SESSION_SECRET
      }
   default:
      config = {
         SESSION_SECRET: 'secret phrase'
      }
}

module.exports = config
