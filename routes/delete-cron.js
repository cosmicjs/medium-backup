// delete-cron.js
module.exports = function(app, config, async) {
  app.post('/delete-cron', function(req, res) {
    var Cosmic = require('cosmicjs')
    var slug = req.body.slug
    var params = {
      write_key: config.bucket.write_key,
      slug: slug
    }
    Cosmic.deleteObject(config, params, function(err, response) {
      res.json({
        status: "success"
      })
    })
  })
}