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
    movielist.push(response[pas]["title"] + "\n")
  }
  return movielist
}

let listofspeciesghibli = (response) => {
  let specielist = []
  for (let pas = 0; pas < response.length; pas++) {
    specielist.push(response[pas]["name"] + "\n")
  }
  return specielist
}

let listofvehiclesghibli = (response) => {
  let specielist = []
  for (let pas = 0; pas < response.length; pas++) {
    specielist.push(response[pas]["name"] + "\n")
  }
  return specielist
}


let getIdmoviebymoviename = (response, movie, category) => {
  let allInfo = response
  if(category == "resume"){category = "description"}
  for (let pas = 0; pas < response.length; pas++) {
    var uno = allInfo[pas]["title"].toLowerCase()
    var dos = movie.toLowerCase()

    if (uno == dos) {
      if (category == "information") {
        var info = []
        var key = Object.keys(allInfo[pas])
        for (let temp = 0; temp < key.length-6; temp++) {
          var cat = key[temp].toString()
          info.push(cat + ":\n" + allInfo[pas][cat] + "\n\n")
        }
        return info
      }

      else {
        return allInfo[pas][category]
      }

    }
  }
  return "Not found"
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
          FB.sendMessage("RESPONSE", userData.sender, "Here is a complete list of studio ghibli movies! if you want more information about a movie just ask :)")
          Ghibli(cb.intent)
            .then(response => {
              let parseResult = listofmoviesghibli(response);
              let parseResult_tostring = parseResult.toString().replace(/,/g, '')
              FB.sendMessage("RESPONSE", userData.sender, parseResult_tostring)
            })
          break;



        case 'GetMovieDescription':
          if (cb.entities.type_of_request == "information") {
            FB.sendMessage("RESPONSE", userData.sender, "Here is the complete list of informations about " + cb.entities.movie_name + " movie, enjoy :) ")
          }
          else {
            FB.sendMessage("RESPONSE", userData.sender, "Here is the " + cb.entities.type_of_request + " of " + cb.entities.movie_name)
          }
          Ghibli(cb.intent)
            .then(response => {
              var category = cb.entities.type_of_request.replace(/\s/g, "_")
              let parseResult = getIdmoviebymoviename(response, cb.entities.movie_name, category);
              let parseResult_tostring = parseResult.toString().replace(/,/g, '')
              FB.sendMessage("RESPONSE", userData.sender, parseResult_tostring)
            })
          break;



        case 'GetAllSpecies':
          FB.sendMessage("RESPONSE", userData.sender, "You want to know the species of the ghibli studio! Nothing could be easier : ")
          Ghibli(cb.intent)
            .then(response => {
              let parseResult = listofspeciesghibli(response);
              //console.log(parseResult)
              let parseResult_tostring = parseResult.toString().replace(/,/g, '')
              FB.sendMessage("RESPONSE", userData.sender, parseResult_tostring)
            })
          break;



        case 'GetAllVehicles':
          FB.sendMessage("RESPONSE", userData.sender, "You want to know the species of the ghibli studio! Nothing could be easier : ")
          Ghibli(cb.intent)
            .then(response => {
              let parseResult = listofvehiclesghibli(response);
              //console.log(parseResult)
              let parseResult_tostring = parseResult.toString().replace(/,/g, '')
              FB.sendMessage("RESPONSE", userData.sender, parseResult_tostring)
            })
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

