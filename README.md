# Medium Backup
![Alt text](https://cosmicjs.com/uploads/5a03a090-006a-11e7-9a49-6975a5effa38-medium-backup.png "Medium Backup")
## Demo
[View Demo](https://cosmicjs.com/apps/medium-backup/demo)

Manually or automatically backup your Medium articles to any Cosmic JS Bucket.

## Get started
Add your feed URL, Cosmic JS Bucket slug and import your articles immediately.  [Read this help article from Medium](https://help.medium.com/hc/en-us/articles/214874118-RSS-Feeds-of-publications-and-profiles) to find out which URL structure to use. It can be `https://medium.com/feed/@yourusername` or if you have a custom domain `https://customdomain.com/feed`.

If you find that you are only getting partial articles, you may need to go into [your Medium account settings](https://medium.com/me/settings) and make sure RSS Feed is set to "Full".

If you add a cron job, the cron job will look for new posts every hour or whatever environment variable you set for CRON_INTERVAL.
```
git clone https://github.com/cosmicjs/medium-backup
cd medium-backup
npm install
```

### Run in production
```
COSMIC_BUCKET=your-bucket-slug npm start
```
Go to [http://localhost:3000](http://localhost:3000).
### Run in development
```
npm run development
```
Go to [http://localhost:3000](http://localhost:3000).  It will automatically restart the node server (nodemon) on updates.
