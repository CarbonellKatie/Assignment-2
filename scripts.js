// const axios = require("axios").default;

$(function () {
  //Get Users - DONE
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

  //Get tweets- DONE
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

  //CREATE - DONE
  $("#create-form").on("submit", function (event) {
    event.preventDefault();

    var createInput = $("#create-input");
    var newTweetInfo = createInput.val();

    var i = newTweetInfo.indexOf(";");
    if (i != -1) {
      let tweetId = newTweetInfo.slice(0, i);
      let tweetText = newTweetInfo.slice(i + 1);

      $.ajax({
        url: "/tweetinfo",
        method: "POST",
        contentType: "application/json", //must specify that the request is sending json data
        data: JSON.stringify({ id: tweetId, text: tweetText }),
      });
    } else {
      alert(
        'Please enter valid tweet information. Tweet must be in format: "ID:Text"'
      );
    }
  });

  //Create searched tweets
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    var tweetId = $("#search-input").val();

    $.ajax({
      url: "/searchinfo",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ id: tweetId }),
      success: function (searchedTweets) {
        $("#searchbody").empty();
        console.log(searchedTweets);
        searchedTweets.forEach((tweet) =>
          $("#searchbody").append(
            `<tr><td>${tweet.id}</td><td>${tweet.text}</td><td>${tweet.created_at}</td></tr>`
          )
        );
      },
    });
    //TODO: search a tweet and display it.
  });

  //Get searched tweets
  $("#get-searched-tweets").on("click", function () {
    //TODO: get a searched tweet(s) & display it
    $("#searchbody").empty();
    $.get("/searchinfo", function (searchedTweets) {
      console.log(searchedTweets);
      searchedTweets.forEach((tweet) =>
        $("#searchbody").append(
          `<tr><td>${tweet.id}</td><td>${tweet.text}</td><td>${tweet.created_at}</td></tr>`
        )
      );
    });
  });

  //UPDATE/PUT -TODO
  $("#update-user").on("submit", function (event) {
    event.preventDefault();
    var updateInput = $("#update-input");
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(";");

    var currName = parsedStrings[0];
    var newName = parsedStrings[1];

    console.log(newName);
    $.ajax({
      url: `/tweets/${currName}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ newName: newName }),
    });
    //TODO: update a tweet
  });

  //DELETE - DONE
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
