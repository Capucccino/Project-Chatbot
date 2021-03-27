## Table of contents
* [Anime Studio Ghibli Chatbot](#Anime-Studio-Ghibli-Chatbot)
* [Anime Recommender](#Anime-Recommender)

## Anime Studio Ghibli Chatbot

### Introduction
This chatbot is about studio Ghibli movies. It allows you to know general information on studio Ghibli like the list of their movies, what animal species or vehicles are seen in the films or the names of the characters. 
It also allows you to know specific information about each studio Ghibli movie. For example, you can ask the chatbot for the release time, length, director, original title… of each Studio Ghibli film.
This information was found on [Studio Ghibli API](https://ghibliapi.herokuapp.com/)

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
Chatbot is ready !

### Demonstration
Here are some screenshots showing all the questions you can ask to our API
Hello

![image](https://user-images.githubusercontent.com/64537874/112734684-97f81500-8f47-11eb-9196-94bf1f69fdb7.png)

List of movies from studio Ghibli

![image](https://user-images.githubusercontent.com/64537874/112734745-ec02f980-8f47-11eb-9fb4-a682788a1be3.png)

Information from a movie `title - original_title - original_title_romanised - description - director - producer - release_date`

![image](https://user-images.githubusercontent.com/64537874/112734801-4f8d2700-8f48-11eb-9337-068c89928731.png)
![image](https://user-images.githubusercontent.com/64537874/112734859-9aa73a00-8f48-11eb-9d7c-d335f087168d.png)
![image](https://user-images.githubusercontent.com/64537874/112734972-67b17600-8f49-11eb-9a84-6d1c57df4717.png)










## Anime Recommender
