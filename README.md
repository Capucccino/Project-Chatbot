## Table of contents
* [Anime Studio Ghibli Chatbot](#Anime-Studio-Ghibli-Chatbot)
* [Anime Recommender](#Anime-Recommender)

## Anime Studio Ghibli Chatbot

### Setup
The Studio Ghibli Chatbot is coded in Node.js. If you want to use it just follow these steps:

* You need first to install all the packages required: 

```
$ cd ../movieBot
$ npm install i
$ npm install express
```
* Start the project with `nodemon server.js`
* Create a facebook messsenger app on facebook for developer
* Get a token and verify token then copy it in your `/development.json`
* Install ngrok
```
$ npm i ngrok
```
* Start a ngrok server in your cmd with `ngrok http 3000` then create and connect your webhook
* Send a message to your Facebook Page, try "hello"


## Anime Recommender
