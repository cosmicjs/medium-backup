// add-cron.js
module.exports = function(app, config, async) {
  app.post('/add-crons', function(req, res) {
    var Cosmic = require('cosmicjs')
    var slug = require('slug')
    var crons = req.body
    async.eachSeries(crons, (cron, callback) => {
      var params = {
        title: cron.title,
        slug: slug(cron.title),
        type_slug: 'crons',
        write_key: config.bucket.write_key,
        metafields: [
          {
            key: 'feed_url',
            title: 'Feed URL',
            value: cron.feed_url
          },
          {
            key: 'bucket_slug',
            title: 'Bucket Slug',
            value: cron.bucket_slug
          }
        ]
      }
      Cosmic.addObject(config, params, function(err, response) {
        callback()
      })
    }, () => {
      res.json({
        status: "success"
      })
    })
  })
}