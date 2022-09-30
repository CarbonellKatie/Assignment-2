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
    //TODO: store loaded data into a global variable for tweet data
  }
});

//Get functions
//Shows user info

app.get("/tweets", function (req, res) {
  //TODO: send all users' IDs

  let userInfo = [];
  for (let i = 0; i < tweetinfo.length; i++) {
    userInfo.push(tweetinfo[i].user);
  }
  res.send(userInfo);
});

//Shows tweet info
app.get("/tweetinfo", function (req, res) {
  res.send(tweetinfo);
  //TODO: send tweet info
});

//Shows searched tweets
app.get("/searchinfo", function (req, res) {
  res.send(searchedTweets);
  //TODO: send searched tweets
});

//Post functions
//Posts created tweets
app.post("/tweetinfo", function (req, res) {
  let tweet = {
    id: req.body.id,
    text: req.body.text,
    created_at: new Date().toString(),
  };

  tweetinfo.push(tweet);
  res.status(200);
});

//Posts searched tweets
app.post("/searchinfo", function (req, res) {
  //array containing all tweets which have the given id
  let resultTweets = [];
  let searchId = req.body.id;
  console.log(searchId);
  //TODO: search a tweet
  tweetinfo.forEach((tweet) => {
    if (tweet.id == searchId) {
      resultTweets.push(tweet);
      //add the matching tweets to the searched tweets array to indicate we found this tweet via search
      searchedTweets.push(tweet);
    }
  });
  //respond with an array of tweets with this id
  res.send(resultTweets);
});

//Update
app.put("/tweets/:nm", function (req, res) {
  //TODO: update tweets
});

//Delete
app.delete("/tweetinfo/:tweetid", function (req, res) {
  //TODO: delete a tweet
  for (let i = 0; i < tweetinfo.length; i++) {
    let currTweet = tweetinfo[i];
    if (currTweet.id == req.params.tweetid) {
      console.log("length before: ");
      console.log(tweetinfo.length);
      tweetinfo.splice(i, 1);
      console.log("length after: ");
      console.log(tweetinfo.length);
    }
  }
});

app.listen(PORT, function () {
  console.log("Server listening on " + PORT);
});
