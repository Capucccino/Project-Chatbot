## Table of contents
* [Anime Studio Ghibli Chatbot](#Anime-Studio-Ghibli-Chatbot)
* [Anime Recommender](#Anime-Recommender)

## Anime Studio Ghibli Chatbot
### Introduction
This chatbot is about studio Ghibli movies. It allows you to know general information on studio Ghibli like the list of their movies, what animal species or vehicles are seen in the films or the names of the characters. 
It also allows you to know specific information about each studio Ghibli movie. For example, you can ask the chatbot for the release time, length, director, original title… of each Studio Ghibli film.
This information was found on Studio Ghibli API
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
* Chatbot is ready !


## Anime Recommender
