![logo](https://user-images.githubusercontent.com/64537874/112735427-24a4d200-8f4c-11eb-81b8-47ae3a6b6342.png)


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
Here are some screenshots showing all the questions you can ask to our API. 
We also made a [demonstration video](https://www.youtube.com/watch?v=z4e8lvSg4-Y) on youtube to show you how it works. 


__Hello__

![image](https://user-images.githubusercontent.com/64537874/112734684-97f81500-8f47-11eb-9196-94bf1f69fdb7.png)

__List of movies from studio Ghibli__

![image](https://user-images.githubusercontent.com/64537874/112734745-ec02f980-8f47-11eb-9fb4-a682788a1be3.png)

__Information about a movie :__ title - original_title - original_title_romanised - description - director - producer - release_date
![image](https://user-images.githubusercontent.com/64537874/112735140-91b76800-8f4a-11eb-81c9-c1c396e97f71.png)
![image](https://user-images.githubusercontent.com/64537874/112735166-a72c9200-8f4a-11eb-8abd-9fbc93c91d5a.png)

![image](https://user-images.githubusercontent.com/64537874/112734801-4f8d2700-8f48-11eb-9337-068c89928731.png)
![image](https://user-images.githubusercontent.com/64537874/112734859-9aa73a00-8f48-11eb-9d7c-d335f087168d.png)
![image](https://user-images.githubusercontent.com/64537874/112734972-67b17600-8f49-11eb-9a84-6d1c57df4717.png)
![image](https://user-images.githubusercontent.com/64537874/112735018-a810f400-8f49-11eb-926f-c025d2a12f80.png)

__Information about species in Ghibli movies__

![image](https://user-images.githubusercontent.com/64537874/112735049-e0b0cd80-8f49-11eb-8d84-c0710c569e8d.png)

__Information about vehicles in Ghibli movies__

![image](https://user-images.githubusercontent.com/64537874/112735091-42713780-8f4a-11eb-9722-b5c8452515bc.png)




## Anime Recommender



### How to use :

To use the recomender for our anime chatbot you have to :
* open either the python file or the .ipynb (collab works well)
* link the script to the ratings csv and the hhe csv. 
Once that is done you have to run the script and follow the guided menu. The recommendation may take quite a bit of time since we are using extremely large amounts of data.
The code asks to choose your favorite anime out of ten propositions. It does this 3 times and then it suggests 3 new animes that you could enjoy.

The script retrieves data from the 2 csv files and then links all the animes to the users ratings. Once we have a dictionary with all the users and their ratings on different animes we use collaborative filtering. We took the base from the week six project and adapte dit to our anime list. In our project we used the cosine similarity mesure wich treates missing ratings as negative. This way of mesure calculates the similarity between two vectors of an inner product space. It is measured by the cosine of the angle between two vectors and determines wheter two vectors and pointing in roughly the same direction. 

![image](https://user-images.githubusercontent.com/64537874/112736618-72bdd380-8f54-11eb-82b1-7abfc40d73c7.png)
![image](https://user-images.githubusercontent.com/64537874/112736624-7cdfd200-8f54-11eb-82ee-aae96e8a8bfd.png)
![image](https://user-images.githubusercontent.com/64537874/112736649-a1d44500-8f54-11eb-892e-190cbfedbcc2.png)
![image](https://user-images.githubusercontent.com/64537874/112736628-8406e000-8f54-11eb-885e-57e75d58e1b8.png)



