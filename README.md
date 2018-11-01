# liri-node-app

## The LIRI Node App will use the Spotify-Node-API, the Bands In Town API, and the OMDB API to return respective information, based on initial user input in the command line.

####When running the liri.js file using node, the first input will define which service the user would like to employ

------------------------

    -spotify-this-song
    -concert-this
    -movie-this
    -do-what-it-says

------------------------

#### Once you have defined a service name, you can define a search item. For instance, try running


*A switch statement is used to run code based on what the user inputs first, once this is defined, the search item is used to search the various api and return specific information. i.e. venue, location, and date for an artists upcoming concerts*

### if you run node liri.js concert-this panic at the disco it will return the image below

![concert-this-return](images\concert-this_return.png)


-----------------------------------------------------------

### if you run node liri.js movie-this smokin aces it will return the image below

![movie-this-return](images\movie-this_return.png)


-----------------------------------------------------------

### if you run node liri.js spotify-this-song dream on it will return the image below

![spotify-this-song-return](images\spotify-this-song_return.png)


-----------------------------------------------------------


#### If the user chooses the fourth option, do-what-it-says, the program will read what is in the random.txt file, and use what is written in there to define the search parameters, for instance it is taking *spotify-this-song,"What is Love"*, and will run a search for that song using spotify.If I change random.txt to use a different service command, it will search the correct API. I achieved this with the use of a recurive function which triggers the switch statement again, this time using what is written in the random text file as the arguments for the function.

```js
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
```

