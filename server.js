const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  noCache: true,
  watch: true,
  express: app
})

app.get('/', function (req, res) {
  res.render('index.html');
})

const listener = app.listen(process.env.PORT || undefined, () => {
  let port = listener.address().port;
  console.log('listening on port', port)
  console.log(`http://localhost:${port}/`)
})
