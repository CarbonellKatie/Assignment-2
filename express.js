var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var cors = require("cors");

app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require("fs");

//global variable for tweet data
var tweetinfo = [];
var searchedTweets = [];

//load the input file
fs.readFile("favs.json", "utf8", function readFileCallback(err, data) {
  if (err) {
    req.log.info("cannot load a file:" + fileFolder + "/" + _file_name);
    throw err;
  } else {
    tweetinfo = JSON.parse(data);
  }
});

//Get functions
//Shows user info

app.get("/tweets", function (req, res) {
  //send all users' IDs
  let userInfo = [];
  //loop through all tweets and find all user ids associated with them
  for (let i = 0; i < tweetinfo.length; i++) {
    if (tweetinfo[i].hasOwnProperty("user")) {
      userInfo.push(tweetinfo[i].user);
    }
  }
  res.send(userInfo);
});

//Shows tweet info
app.get("/tweetinfo", function (req, res) {
  //return array of all tweets
  res.send(tweetinfo);
});

//Shows searched tweets
app.get("/searchinfo", function (req, res) {
  //return array of recently searched tweets
  res.send(searchedTweets);
});

//Post functions
//Posts created tweets
app.post("/tweetinfo", function (req, res) {
  //create a new tweet object with the given data in req body
  let tweet = {
    id: req.body.id,
    text: req.body.text,
    created_at: new Date().toString(),
  };
  //add tweet to tweets array
  tweetinfo.push(tweet);
  res.status(200);
});

//Posts searched tweets
app.post("/searchinfo", function (req, res) {
  //array containing all tweets which have the given id
  let resultTweets = [];
  let searchId = req.body.id;

  //loop through all tweets and add all tweets with the given id to the response array
  tweetinfo.forEach((tweet) => {
    if (tweet.id == searchId) {
      resultTweets.push(tweet);
      //add the matching tweets to the searched tweets array to indicate we recently searched this tweet
      searchedTweets.push(tweet);
    }
  });
  //respond with an array of tweets with this id
  res.send(resultTweets);
});

//Update a screen with the user's name and set it to the new screen name
app.put("/tweets/:nm", function (req, res) {
  let username = req.params.nm;
  let newName = req.body.newName;

  //loop through all tweets and find the given screen name.
  for (let i = 0; i < tweetinfo.length; i++) {
    let currTweet = tweetinfo[i];

    //Update the given screen name when found
    if (currTweet.user?.name == username) {
      currTweet.user.screen_name = newName;
    }
  }
  res.status(200);
});

//Delete
app.delete("/tweetinfo/:tweetid", function (req, res) {
  //delete a tweet with the given ID
  //loop through tweets array and cut out the tweet with the given ID
  for (let i = 0; i < tweetinfo.length; i++) {
    let currTweet = tweetinfo[i];
    //if we find the tweet with the given ID, cut it out of the tweets array
    if (currTweet.id == req.params.tweetid) {
      tweetinfo.splice(i, 1);
    }
  }
});

app.listen(PORT, function () {
  console.log("Server listening on " + PORT);
});
