// const axios = require("axios").default;

$(function () {
  //Get
  $("#get-button").on("click", function () {
    $("#namebody").empty();
    //TODO: get all users' IDs & display it
    $.get("http://localhost:3000/tweets", (data) => {
      data.forEach((user) =>
        $("#namebody").append(
          `<tr><td>${user.id}</td><td>${user.screen_name}</td><td>${user.name}</td></tr>`
        )
      );
    });
  });

  //Get tweets
  $("#get-tweets-button").on("click", function () {
    //TODO: get tweet info and display it
    $("#tweetbody").empty();
    $.get("http://localhost:3000/tweetinfo", (tweets) => {
      tweets.forEach((tweet) =>
        $("#tweetbody").append(
          `<tr><td>${tweet.id}</td><td>${tweet.text}</td><td>${tweet.created_at}</td></tr>`
        )
      );
    });
  });

  //Get searched tweets
  $("#get-searched-tweets").on("click", function () {
    //TODO: get a searched tweet(s) & display it
  });

  //CREATE
  $("#create-form").on("submit", function (event) {
    event.preventDefault();

    var createInput = $("#create-input");
    var newTweetInfo = createInput.val();
    // console.log(newTweetInfo);
    var i = newTweetInfo.indexOf(";");
    if (i == -1) {
      alert("improper tweet format, please re-enter");
    }
    let tweetId = newTweetInfo.slice(0, i);
    let tweetText = newTweetInfo.slice(i + 1);

    console.log(tweetText);
    console.log(tweetId);

    // let newtweet = { id: tweetId, text: tweetText };
    $.ajax({
      url: "/tweetinfo",
      method: "POST",
      contentType: "application/json", //must specify that the request is sending json data
      data: JSON.stringify({ id: tweetId, text: tweetText }),
      success: function (response) {
        console.log(response.status);
      },
    });

    //TODO: creat a tweet
  });

  //Create searched tweets
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    var userID = $("#search-input");

    //TODO: search a tweet and display it.
  });

  //UPDATE/PUT
  $("#update-user").on("submit", function (event) {
    event.preventDefault();
    var updateInput = $("#update-input");
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(";");

    var name = parsedStrings[0];
    var newName = parsedStrings[1];

    //TODO: update a tweet
  });

  //DELETE
  $("#delete-form").on("submit", function () {
    var id = $("#delete-input");
    event.preventDefault();

    var idText = id.val();
    $.ajax({
      url: `/tweetinfo/${idText}`,
      method: "DELETE",
      contentType: "application/json",
    });

    //TODO: delete a tweet
  });
});
