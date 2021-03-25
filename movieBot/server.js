'use strict';
const bodyparser = require('body-parser');
const matcher = require('./matcher'); // to use the matcher module here
const weather = require('./weather'); // to use the matcher module here
const Ghibli = require('./Ghibli')
const express = require('express');
const config = require('./config');
const FBeamer = require('./fbeamer');
const { createPublicKey } = require('crypto');
const { parse } = require('path');
const { response } = require('express');
const { title } = require('process');

const server = express();
const PORT = process.env.PORT || 3000;

const FB = new FBeamer(config.FB);

server.get('/', (request, response) => FB.registerHook(request, response));
server.listen(PORT, () => console.log(`FBeamer Bot Service running on Port ${PORT}`));
server.post('/', bodyparser.json({ verify: FB.verifySignature.call(FB) }));


let currentWeather = (response) => {
  return response.list[0].weather[0].main
};

let listofmoviesghibli = (response) => {
  let movielist = []
  for (let pas = 0; pas < response.length; pas++) {
    movielist.push(response[pas]["title"])
  }

  return movielist
}



server.post('/', (request, response, data) => {
  return FB.incoming(request, response, data => {
    const userData = FB.messageHandler(data);
    //UserData.content is the message of the user
    //console.log(userData.content)
    matcher(userData.content, cb => {


      switch (cb.intent) {
        case 'Hello':
          //console.log("oioz",cb.entities.greeting)
          FB.sendMessage("RESPONSE", userData.sender, "Hey, how are you today?")
          break;
        //console.log(cb.entities.greeting,"to you!")

        case 'Exit':
          FB.sendMessage("RESPONSE", userData.sender, "See you soon!")
          break;

        case 'Current weather':
          //console.log(cb.entities.time, ', the weather in', cb.entities.city, "is")// get weather data from an API
          weather(cb.entities.city)
            .then(response => {
              let parseResult = currentWeather(response);
              FB.sendMessage("RESPONSE", userData.sender, cb.entities.time + " the weather in " + cb.entities.city + " is " + parseResult)
              //console.log(parseResult);
            })
            .catch(error => {
              FB.sendMessage("RESPONSE", userData.sender, "There seems to be a problem connecting to the Weather service!")

            });
          break;

        case 'GetAllMovies':
          //FB.sendMessage("RESPONSE", userData.sender, "Studio Ghibli")
          Ghibli(cb.intent)
            .then(response => {
              //function get Movie
              let parseResult = listofmoviesghibli(response);
              console.log(parseResult)
              let parseResult_tostring = parseResult.toString()
              FB.sendMessage("RESPONSE", userData.sender, "Here is a complete list of studio ghibli movies! if you want more information about a movie just write its name :) \n \n " + parseResult_tostring)

            }
            )
          break;

        case 'GetMovieDescription':
          FB.sendMessage("RESPONSE", userData.sender, "foooo")
          console.log(cb.intent + "zoa" + cb.entities.movie_name)
          //console.log(cb.entities.movie_name)
          break;




        case 'GetAllSpecies':
          FB.sendMessage("RESPONSE", userData.sender, cb.intent)
          console.log(cb.intent + "zoa" + cb.entities.movie_name)
          break;





        default:
          FB.sendMessage("RESPONSE", userData.sender, "Sorry, we didn't get what you mean...")
      }
    });







    /*
    if (userData.content == 'Hey') {
      FB.sendMessage("RESPONSE", userData.sender, "Niquel")
    }
    
    else {
      FB.sendMessage("RESPONSE", userData.sender, "Mauvais")
    }
    */

  });
});

