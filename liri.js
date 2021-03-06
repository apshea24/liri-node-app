require("dotenv").config();

var request = require("request");

var moment = require("moment");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var fs = require("fs");


var serviceName = process.argv[2];
var searchItem = process.argv.slice(3).join("+");
switchStatement(serviceName, searchItem);

function switchStatement(serviceName, searchItem) {

    switch (serviceName) {
        case "concert-this":
            console.log("concert-this")
            var bandsURL = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp";
            // var eventsArr = "";
            request(bandsURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var eventArr = JSON.parse(body)
                    for (var i = 0; i < eventArr.length; i++) {
                        console.log("-------------------------------------------------------------")
                        console.log("Venue: " + eventArr[i].venue.name);
                        console.log("Location: " + eventArr[i].venue.city + ", " + eventArr[i].venue.region);
                        console.log("Datetime: " + moment("'" + eventArr[i].datetime + "'", moment.HTML5_FMT.DATETIME_LOCAL).format("L"));
                        console.log("--------------------------------------------------------------")
                    };
                };
            });
            break;

        ///////////////////////////////////////////////////////////////////////////////////////////
        case "spotify-this-song":
            spotify.search({ type: "track", query: searchItem, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log("Error Occured: " + err)
                };
                var artists = data.tracks.items[0].artists[0].name;
                var songName = data.tracks.items[0].name;
                var preview = data.tracks.items[0].href;
                var album = data.tracks.items[0].album.name;

                console.log("The Song Name Is: " + songName);
                console.log("Written and Performed by: " + artists);
                console.log("Album Name: " + album);
                console.log("A Link to the Song on Spotify: " + preview);
            });
            break;

        /////////////////////////////////////////////////////////////////////////////////////////////
        case "movie-this":
            var movieURL = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";
            request(movieURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var movieObj = JSON.parse(body);
                    console.log("Title: " + movieObj.Title);
                    console.log("Year Released: " + movieObj.Year);
                    console.log("IMDB Rating: " + movieObj.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + movieObj.Ratings[1].Value);
                    console.log("Produced In: " + movieObj.Country);
                    console.log("Language: " + movieObj.Language);
                    console.log("Plot: " + movieObj.Plot);
                    console.log("Actors/Actresses: " + movieObj.Actors);
                };
            });
            break;

        //////////////////////////////////////////////////////////////////////////
        case "do-what-it-says":

            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                };
                var dataArr = data.split(",")
                var search = dataArr[0];
                var item = dataArr[1]
                var newItem = item.split(" ").join("+");
                console.log(search);

                switchStatement(search, newItem);
            });
            break;
    };

};

// var nodeArgs = process.argv;

// console.log(nodeArgs);

// console.log(spotifyRequest);