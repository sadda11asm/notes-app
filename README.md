# Notes-app     [![Build Status](https://travis-ci.com/sadda11asm/notes-app.svg?branch=master)](https://travis-ci.com/sadda11asm/notes-app) [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b8616af6323810e06bc6)


## Project Structure

```
.
├── bin                     # express.js app
├── server                  # di and middlewares are set up
├── .env                    # env varibles
├── .eslintrc.js            # ESlint config file
├── .babelrc.js             # Babel config file
├── .gitignore              # .gitignore file
├── .travis.yml             # Travis CI config file
├── package.json
├── package-lock.json
├── README.md               # <-- you are here
└── app.js                  # the nodejs server
```


## How to run a server

1. Install all packages:
```
npm install
```
### For a testing

2. Create Database (PostgresQL):
``` 
createdb notes_test
```
3. Run 
```
npm run test
```
### For a development

2. Create Database (PostreSQL): 
```
createdb notes_dev
```
3. Run DB migrations using Sequelize:
```
sequelize db:migrate
```
4. Run Redis server for caching
```
sudo redis-server /etc/redis/redis.conf --port 6379
```
5. Run
```
npm start:dev
```
