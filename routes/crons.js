// crons.js
module.exports = function(app, config, async) {
  var Cosmic = require('cosmicjs')
  var request = require('request')
  var locals = {}
  async.series([
    callback => {
      Cosmic.getObjectType(config, { type_slug: 'crons' }, function(err, response) {
        locals.crons = response.objects.all
        callback()
      })
    },
    callback => {
      if (locals.crons) {
        async.eachSeries(locals.crons, (cron, callbackEach) => {
          var feed_url = cron.metadata.feed_url
          var bucket_slug = cron.metadata.bucket_slug
          var params = {
            feed_url: feed_url,
            bucket_slug: bucket_slug 
          }
          var options = {
            url: config.url + '/import-posts',
            json: params
          }
          request.post(options, (err, httpResponse, body) => {
            if (err) {
              return console.error('upload failed:', err)
            }
            console.log('Successful!  Server responded with:', body)
            callbackEach()
          });
        })
      }
    }
  ])
}