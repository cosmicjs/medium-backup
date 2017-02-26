// app.js
var express = require('express')
var async = require('async')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
var hogan = require('hogan-express')
app.engine('html', hogan)
app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/public/'))
// Config
var bucket_slug = process.env.COSMIC_BUCKET || 'medium-test'
var config = {
  bucket: {
    slug: bucket_slug,
    read_key: process.env.COSMIC_READ_KEY || '',
    write_key: process.env.COSMIC_WRITE_KEY || ''
  },
  url: process.env.URL || 'http://localhost:' + app.get('port')
}
// Routes
require('./routes/index.js')(app, config)
require('./routes/import-posts.js')(app, config, async)
require('./routes/add-crons.js')(app, config, async)
require('./routes/delete-cron.js')(app, config)
// Crons
var getCrons = require('./routes/crons.js')
setInterval(() => getCrons(app, config, async), 600000)
app.listen(app.get('port'))