// import-posts.js
module.exports = function(app, config, async) {
  app.post('/import-posts', function(req, res) {
    var Cosmic = require('cosmicjs')
    var request = require('request')
    var slugify = require('slug')
    var parseString = require('xml2js').parseString
    var feed_url = req.body.feed_url
    var bucket_slug = req.body.bucket_slug
    var cosmic_config = {
      bucket: {
        slug: bucket_slug,
        read_key: process.env.COSMIC_READ_KEY || '',
        write_key: process.env.COSMIC_WRITE_KEY || ''
      }
    }
    console.log(feed_url)
    request(feed_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parseString(body, function (err, result) {
          var posts = result.rss.channel[0].item
          var posts_imported = []
          async.eachSeries(posts, (post, callback) => {
            var title = 'Post'
            if (post.title)
              title = post.title[0]
            var content, published_at, modified_at, categories, created_by, medium_link;
            if (post.description)
              content = post.description[0]
            if (post['content:encoded'])
              content = post['content:encoded'][0]
            if (post['pubDate'])
              published_at = post['pubDate'][0]
            if (post['atom:updated'])
              modified_at = post['atom:updated'][0]
            if (post['category'])
              categories = post['category']
            if (post['dc:creator'])
              created_by = post['dc:creator'][0]
            if (post['link'])
              medium_link = post['link'][0]
            // Test if object available
            var slug = slugify(title).toLowerCase();
            Cosmic.getObject(cosmic_config, { slug: slug }, function(err, response) {
              if (response && response.object) {
                // already added
                return callback()
              } else {
                var params = {
                  title: title,
                  slug: slug,
                  content: content,
                  type_slug: 'posts',
                  write_key: config.bucket.write_key,
                  metafields: [
                    {
                      type: 'text',
                      key: 'published_at',
                      title: 'Published At',
                      value: published_at
                    },
                    {
                      type: 'text',
                      key: 'modified_at',
                      title: 'Modified At',
                      value: modified_at
                    },
                    {
                      type: 'text',
                      key: 'created_by',
                      title: 'Created By',
                      value: created_by
                    },
                    {
                      type: 'text',
                      key: 'medium_link',
                      title: 'Medium Link',
                      value: medium_link
                    }
                  ]
                }
                if (categories) {
                  var tags = ''
                  categories.forEach(category => {
                    tags += category + ', '
                  })
                  params.metafields.push({
                    type: 'text',
                    key: 'tags',
                    title: 'Tags',
                    value: tags
                  })
                }
                Cosmic.addObject(cosmic_config, params, function(err, response) {
                  if (response)
                    posts_imported.push(post)
                  callback()
                })
              }
            })
          }, () => {
            if (!posts_imported.length) {
              res.status(500).json({ error: 'There was an error with this request.' })
            }
            res.json({
              bucket_slug: config.bucket.slug,
              posts: posts_imported
            })
          })
        })
      } else {
        res.status(500).json({ error: 'feed_url' })
      }
    })
  })
}
