const { httpServer, app } = require('./src/app.js')

httpServer.listen(app.get('port'), console.log(`Server running on: http://localhost:${app.get('port')}`))