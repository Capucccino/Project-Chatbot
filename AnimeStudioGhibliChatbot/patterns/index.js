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
        pattern: '\\b(?<type_of_request>information|resume|original\\stitle|original\\stitle\\sromanised|description|director|producer|release\\sdate)\\s(of|about|more)\\s\\b(?<movie_name>(?<=(of|about)\\s)[\\s\\S]*\\b)',
        intent: "GetMovieDescription",
        entities:
        {
            movie_name: "Totoro",
            type_of_request: "Description"
        }
    },
    {
        pattern: '\\b(specie|species)\\b',
        intent: 'GetAllSpecies',
    },
    
    {
        pattern: '\\b(vehicle|vehicles)\\b',
        intent: 'GetAllVehicles',
    },
];
module.exports = patternDict;
