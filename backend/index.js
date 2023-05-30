const app = require('./app')
const config = require('./util/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
