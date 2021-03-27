'use strict';
const bodyparser = require('body-parser');
const matcher = require('./matcher'); // to use the matcher module here
const Ghibli = require('./Ghibli')
const express = require('express');
const config = require('./config');
const FBeamer = require('./fbeamer');

const server = express();
const PORT = process.env.PORT || 3000;
const FB = new FBeamer(config.FB);

server.get('/', (request, response) => FB.registerHook(request, response));
server.listen(PORT, () => console.log(`FBeamer Bot Service running on Port ${PORT}`));
server.post('/', bodyparser.json({ verify: FB.verifySignature.call(FB) }));


//Return all the movies from the api inside a list 
let listofmoviesghibli = (response) => {
  let movielist = []
  for (let pas = 0; pas < response.length; pas++) {
    movielist.push(response[pas]["title"] + "\n")
  }
  return movielist
}

//Return all the species from the api inside a list
let listofspeciesghibli = (response) => {
  let specielist = []
  for (let pas = 0; pas < response.length; pas++) {
    specielist.push(response[pas]["name"] + "\n")
  }
  return specielist
}

//Return all the species from the api inside a list
let listofvehiclesghibli = (response) => {
  let specielist = []
  for (let pas = 0; pas < response.length; pas++) {
    specielist.push(response[pas]["name"] + "\n")
  }
  return specielist
}

//
let getIdmoviebymoviename = (response, movie, category) => {
  let allInfo = response
  //There is no "resume" category so we replace it with description
  if(category == "resume"){category = "description"}

  //We need the exact syntaxe to compare a user demand with the api, so we lower both
  for (let pas = 0; pas < response.length; pas++) {
    var uno = allInfo[pas]["title"].toLowerCase()
    var dos = movie.toLowerCase()

    //If the user ask for information, we return all the category at once
    if (uno == dos) {
      if (category == "information") {
        var info = []
        var key = Object.keys(allInfo[pas])

        //Last 6 informations are only URL, they are not worth it so we remove them
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
    matcher(userData.content, cb => {


      switch (cb.intent) {
        case 'Hello':
          FB.sendMessage("RESPONSE", userData.sender, "Hey, how are you today?")
          break;


        case 'Exit':
          FB.sendMessage("RESPONSE", userData.sender, "See you soon!")
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
              let parseResult_tostring = parseResult.toString().replace(/,/g, '')
              FB.sendMessage("RESPONSE", userData.sender, parseResult_tostring)
            })
          break;

        case 'GetAllVehicles':
          FB.sendMessage("RESPONSE", userData.sender, "You want to know more about the vehicles of the ghibli studio! Nothing could be easier :) ")
          Ghibli(cb.intent)
            .then(response => {
              let parseResult = listofvehiclesghibli(response);
              let parseResult_tostring = parseResult.toString().replace(/,/g, '')
              FB.sendMessage("RESPONSE", userData.sender, parseResult_tostring)
            })
          break;


        default:
          FB.sendMessage("RESPONSE", userData.sender, "Sorry, we didn't get what you mean...")
      }
    });
  });
});

