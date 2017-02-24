// index.js
module.exports = function(app, config) {
  app.get('/', function(req, res) {
    var Cosmic = require('cosmicjs')
    Cosmic.getObjectType(config, { type_slug: 'crons' }, function(err, response) {
      res.locals.crons = response.objects.all
      res.render('index.html')
    })
  })
}