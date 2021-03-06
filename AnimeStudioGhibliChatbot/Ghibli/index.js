"use strict ";
const axios = require("axios");
//const apikey = "86659dd4361cc4c9af8c572a494ac06f"; // your api key to the api generated by the website

const getGhibli = intent => {
    return new Promise(async (resolve, reject) => {
        try {
            switch (intent) {
                case "GetAllMovies":
                    const allmovieInformation = await axios.get(
                        "https://ghibliapi.herokuapp.com/films",
                    );
                    resolve(allmovieInformation.data) // returns back the results to the chatbot
                    break;


                case "GetMovieDescription":
                    const movieInformation = await axios.get(
                        "https://ghibliapi.herokuapp.com/films",
                    );
                    resolve(movieInformation.data) // returns back the results to the chatbot
                    break;



                case "GetAllSpecies":
                    const speciesInformation = await axios.get(
                        "https://ghibliapi.herokuapp.com/species",
                    );
                    resolve(speciesInformation.data) // returns back the results to the chatbot
                    break;

                case "GetAllVehicles":
                    const vehiclesInformation = await axios.get(
                        "https://ghibliapi.herokuapp.com/vehicles",
                    );
                    resolve(vehiclesInformation.data) // returns back the results to the chatbot
                    break;
            }
        }
        catch (error) {
            reject(error);

        }

    });
    
}

module.exports = getGhibli;