//Troy Krupinski - UTAUS 2018
require("dotenv").config();
var fs = require('fs');
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
// var axios = require("axios");
var moment = require("moment");
var arg = process.argv;
var spotify = new Spotify(keys.spotify);
moment().format();
var input = process.argv[2];

function concertThis() {
    var artist = process.argv[3]
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, (err, response, body) => {
        if (err) {
            console.log("error!");
            return err;
            
        }
        if (response.statusCode === 200) {
          
            var json = JSON.parse(body);
            if(json[0] == null){
                console.log("They aren't playing anytime soon!")
                
            }
            else{
                
                console.log(("Venue: ") + json[0].venue.name);
                console.log(("Location: ") + json[0].venue.city);
                console.log((moment(json[0].datetime).format("MM/DD/YY")));   
            }

            
        }
    })
}
function doThis(){
    fs.readFile("random.txt", "utf8", function(err,data){
     
        if (err){ 
            console.log('Error!');
            return err;
        }
       
           data = data.split(",").map(x => x.trim())
        
          console.log(data[1].replace(/['"]+/g, ''))

            spotifyThis(data[1].replace(/['"]+/g, ''));

           
       
       
       })

}

function movieThis() {
    var movie = process.argv[3]
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(url, (err, response, body) => {
        if (err) {
            return err;
        }
        else{
            var request = JSON.parse(body);
            console.log(("Title: ") + request.Title);
            console.log(("Year Released: ") + request.Released);
            console.log(("IMDB Ratings: ") + request.imdbRating);
            console.log(("Country: ") + request.Country);
            console.log(("Language: ") + request.Language);
            console.log(("Plot: ") + request.Plot);
            console.log(("Actors: ") + request.Actors);
        }
    })
}
function spotifyThis(song) {
    var spotify = new Spotify(keys.spotify);
    if(process.argv[3] == ''){
    var song = process.argv[3];
    }
   

    spotify.search({
        type: "track",
        query: song,
    }, function (err, data) {
        if (err) {
            return err;
        }

        else {
            console.log(("Artist: ") + data.tracks.items[0].artists[0].name);
            console.log(("Song: ") + data.tracks.items[0].name);
            console.log(("Album: ") + data.tracks.items[0].album.name);
            console.log(("Preview: ") + data.tracks.items[0].preview_url);
        }
    })
}
    

switch (arg[2]) {
    case `concert-this`: concertThis(arg[3]);  break;

    case `spotify-this-song`: spotifyThis(arg[3]);  break;

    case `movie-this`: movieThis(arg[3]); break;

    case `do-what-it-says`: doThis(); break;

    default: console.log("Syntax error")
}