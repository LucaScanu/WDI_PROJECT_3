### Deployment Cheat Sheet

- push everything to git master 

- install npm i forever to ensure that the processes keep running and don't timeout on the server

- touch a Procfile in the main directory

- within the procifle type:

Whatever the server file is in the app, do this and it runs forever on it.

```
web: ./node_modules/.bin/forever -m 5 index.js
```

- Git add -A

- Git commit

- Git push origin master

- - - - - - - - - 
- - - - - - - - -
- - - - - - - - -

Type into terminal:

```
Heroku create [name of app]
```

When done:

To create the database on the server:

```
heroku addons:create mongolab
```

- - - - - - - - - 
- - - - - - - - -
- - - - - - - - -

Check that the config files have our ```process.env.PORT or lovalhost....``` and ```process.ENV.MONGOLAB_URI || localhost...``` so that when hosted on server the server can see the right DB address and server ports. 

- - - - - - - - - 
- - - - - - - - -
- - - - - - - - -

If you are using an external API, click on the button CONFIG VARS and this populates our keys for us instead of storing them in our ZSHRC files.

- - - - - - - - - 
- - - - - - - - -
- - - - - - - - -
Remove public from gitignore and stop bower loading.
- - - - - - - - -
- - - - - - - - - 
- - - - - - - - - 