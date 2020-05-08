# REST-API for notes-taking app using Express   [![Build Status](https://travis-ci.com/sadda11asm/notes-app.svg?branch=master)](https://travis-ci.com/sadda11asm/notes-app) [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b8616af6323810e06bc6)


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

## REST API Endpoints

1. Registration
* Route: /api/user/signup
* Method: POST
* Data params: username, password
* Auth required : No
* Response: user object, token

2. Login
* Route: /api/user/login
* Method: POST
* Data params: username, password
* Auth required : No
* Response: user object, token

3. Logout
* Route: /api/user/logout
* Method: POST
* Auth required : Yes

4. Create Note
* Route: /api/note/create
* Method: POST
* Data params: title, text
* Auth required : Yes
* Response: note object

5. Get all user notes
* Route: /api/note/
* Method: GET
* Auth required : Yes
* Response: list of note objects

6. Edit Note
* Route: /api/note/edit/:id
* Method: PUT
* Path param: id
* Data params: title, text
* Auth required : Yes
* Response: note object

7. Delete Note
* Route: /api/note/delete/:id
* Method: DELETE
* Path param: id
* Auth required : Yes

8. Create sharable link
* Route: /api/note/share/:id
* Method: GET
* Path param: id
* Auth required : Yes
* Response: link

9. View the Note by sharable link
* Route: /api/note/:shared_token [included into sharable link]
* Method: GET
* Path param: shared_token
* Auth required : No
* Response: note object

**Postman Collection with all request examples are at the top of README.md**




