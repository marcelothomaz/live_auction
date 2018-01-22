var config = {}

switch (process.env.NODE_END) {
   case 'production':
      config = {
         SESSION_SECRET: process.env.SESSION_SECRET,
         MONGODB: 'mongodb://localhost/live_auction',
         JWT_SECRET: process.env.JWT_SECRET
      }
   default:
      config = {
         SESSION_SECRET: 'secret phrase',
         MONGODB: 'mongodb://localhost/live_auction',
         JWT_SECRET: 'jwt secret 123'
      }
}

module.exports = config
