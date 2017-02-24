// app.js
var express = require('express')
var request = require('request')
var async = require('async')
var bodyParser = require('body-parser')
var config = {
  bucket: {
    slug: process.env.COSMIC_BUCKET || 'medium-test',
    read_key: process.env.COSMIC_READ_KEY || '',
    write_key: process.env.COSMIC_WRITE_KEY || ''
  }
}
var app = express()
app.use(bodyParser.json())
var hogan = require('hogan-express')
app.engine('html', hogan)
app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/public/'))
// Routes
require('./routes/index.js')(app, config)
require('./routes/import-posts.js')(app, config, async)
require('./routes/add-crons.js')(app, config, async)
require('./routes/delete-cron.js')(app, config)
app.listen(app.get('port'))