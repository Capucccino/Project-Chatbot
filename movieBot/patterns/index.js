const patternDict = [
    {
        pattern: '\\b(?<greeting>Hi|Hello|Hey|Salut|Bonjour|Holla|Yo|Holla)\\b',
        intent: 'Hello',
        entities:
        {
            greeting: "Bonjour",
        }
    },
    {
        pattern: '\\b(bye|exit)\\b',
        intent: 'Exit'
    },
    {
        pattern: "\\b(weather)\\slike\\sin\\s\\b(?<city>[A-Za-z]+[A-Za-z]+?)\\s\\b(?<time>tomorrow|today|yesterday)",
        intent: "Current weather",
        entities:
        {
            city: "Paris",
            time: "tomorrow"
        }
    },
    {
        pattern: '\\b(all|Studio|Ghibli)\\b',
        intent: 'GetAllMovies',
    },
    {
        pattern: "\\b(description|resume|information|tell)\\sof|about|more\\s\\b(?<movie_name>From Up on Poppy Hill)",
        intent: "GetMovieDescription",
        entities:
        {
            movie_name: "Totoro",
        }
    },
    {
        pattern: '\\b(specie|species)\\b',
        intent: 'GetAllSpecies',
    },
];
module.exports = patternDict;
