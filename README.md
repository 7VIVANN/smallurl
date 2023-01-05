# Simple URL Shortener service written in ExpressJS

#### install using:
```
git clone https://github.com/7VIVANN/smallurl.git
```
<i> prerequisites:</i>
<ul>
<li>initialise your .env file with DB_PATH, TABLE_NAME which should contain your sqlite .db file path and table name for url storage respectively
<li> install node modules for development 
</ul> 
```
npm i
```

#### run from base dir using:
```
npx nodemon 
```
#### 
# Features

### Generation of shortUrl
Generate a shortUrl for your longUrl by 
```
post base_url/
{"longUrl":"ur webstie link"}
```
<i>incase you are running on ur PC with default settings <b>base_url</b> would be http://localhost:5678</i>


Take a look at [test.http](test.http) for examples

### Persisting data with SQLite

schema:
```
id INTEGER PRIMARY KEY AUTOINCREMENT,
longUrl text,
shortUrl char(7)
```
### Redirecting to longURL
```
get base_url/shortUrl
```

# TODO:

<ul>
<li> Enable auth module for post i.e., restrict who can post on the endpoint ( though this wouldnt be required if you arent exposing the post endpoint?)
<li> Migrate to a cloud DB instead of sqlite
<li> Enable CI/CD
<li> Optimise lookup speed for shortUrl and longUrl i.e., minimise latency 
    <ul>
    <li> composite key(id, longUrl, shortUrl)
    <li> better hash function
    </ul>
</ul>

### Looking to enable https/ deploy on production? Take a look at [stackoverflow thread](https://stackoverflow.com/questions/11744975/enabling-https-on-express-js)

