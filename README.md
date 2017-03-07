# Medium Backup
##Demo
[View Demo](http://medium-backup.cosmicapp.co)
Automatically backup your Medium articles to Cosmic JS.  Includes a manually import or run a cron job to automatically import to any Cosmic JS Bucket.

[Read this help article from Medium](https://help.medium.com/hc/en-us/articles/214874118-RSS-Feeds-of-publications-and-profiles) to find out which URL structure to use. It can be https://medium.com/feed/@yourusername or if you have a custom domain https://customdomain.com/feed.

If you find that you are only getting partial articles, you may need to go into [your Medium account settings](https://medium.com/me/settings) and make sure RSS Feed is set to "Full".

If you choose the cron job option, the cron job will look for new posts every hour.

![Alt text](https://cosmicjs.com/uploads/5a03a090-006a-11e7-9a49-6975a5effa38-medium-backup.png "Medium Backup")

##Get started
```
git clone https://github.com/cosmicjs/medium-backup
cd medium-backup
npm install
```

###Run in production
```
COSMIC_BUCKET=your-bucket-slug npm start
```
Go to [http://localhost:3000](http://localhost:3000).
###Run in development
```
npm run development
```
Go to [http://localhost:3000](http://localhost:3000).  It will automatically restart the node server (nodemon) on updates.
