require("dotenv").config();

var request = require("request");

var spotifyRequest = require("./keys.js")

// var spotify = new Spotify(keys.spotify);

// console.log(spotify);
var serviceName = process.argv[2];

switch (serviceName) {
    case "concert-this":
    console.log("concert-this")
    var artist = process.argv[3];
    var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // var eventsArr = "";
    request(bandsURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            for (var property1 in body) {
                    // eventsArr += body[property1]
                    // console.log(eventsArr);
                
            }
            
        }
    });
    break;
    case "spotify-this-song":
    console.log("spotify-this-song")
    break;
    case "movie-this":
    console.log("movie-this")
    break;
    case "do-what-it-says":
    console.log("do-what-it-says")
    break;
}

// var nodeArgs = process.argv;

// console.log(nodeArgs);

// console.log(spotifyRequest);