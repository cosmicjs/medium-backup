# Medium Backup
Automatically backup your Medium articles to Cosmic JS.  Includes a manually import or run a cron job to automatically import to any Cosmic JS Bucket.

![Alt text](https://cosmicjs.com/uploads/5a03a090-006a-11e7-9a49-6975a5effa38-medium-backup.png "Medium Backup")

##Demo
[View Demo](http://medium-backup.cosmicapp.co)

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
```
npm run development
```
Go to [http://localhost:3000](http://localhost:3000).  It will automatically restart the node server (nodemon) on updates.