$(function () {
  //Get Users
  $("#get-button").on("click", function () {
    $("#namebody").empty();
    //get all users' IDs & display it
    $.get("http://localhost:3000/tweets", (data) => {
      data.forEach((user) =>
        $("#namebody").append(
          `<tr><td>${user.id}</td><td>${user.screen_name}</td><td>${user.name}</td></tr>`
        )
      );
    });
  });

  //Get all tweets
  $("#get-tweets-button").on("click", function () {
    //get all tweet info and put it in the tweets table
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

    //split tweet info into id and text
    var i = newTweetInfo.indexOf(";");
    if (i != -1) {
      let tweetId = newTweetInfo.slice(0, i);
      let tweetText = newTweetInfo.slice(i + 1);

      //make request to create new tweet using user input & add it to the tweets array in the backend
      $.ajax({
        url: "/tweetinfo",
        method: "POST",
        contentType: "application/json", //must specify that the request is sending json data
        data: JSON.stringify({ id: tweetId, text: tweetText }),
      });
    } else {
      //if user enters tweet info in improper format, display alert asking them  to re-enter
      alert(
        'Please enter valid tweet information. Tweet must be in format: "ID:Text"'
      );
    }
  });

  //Create searched tweets
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    var tweetId = $("#search-input").val();

    //make request to search for a tweet with this id. If tweets are found with this id, display them in table
    $.ajax({
      url: "/searchinfo",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ id: tweetId }),
      success: function (searchedTweets) {
        $("#searchbody").empty();
        searchedTweets.forEach((tweet) =>
          $("#searchbody").append(
            `<tr><td>${tweet.id}</td><td>${tweet.text}</td><td>${tweet.created_at}</td></tr>`
          )
        );
      },
    });
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

  //UPDATE/PUT
  //add event listener to update button, take username and update that user's screenname when button clicked
  $("#update-user").on("submit", function (event) {
    event.preventDefault();
    //get new screen name (via user input)
    var updateInput = $("#update-input");
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(";");

    var currName = parsedStrings[0];
    var newName = parsedStrings[1];

    //make request to backend to change this user's screen name to the new one
    $.ajax({
      url: `/tweets/${currName}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ newName: newName }),
    });
  });

  //DELETE - DONE
  //delete a tweet
  $("#delete-form").on("submit", function () {
    var id = $("#delete-input");
    event.preventDefault();

    //get tweet id from user input
    var idText = id.val();
    //make req to api to delete tweet with this id
    $.ajax({
      url: `/tweetinfo/${idText}`,
      method: "DELETE",
      contentType: "application/json",
    });
  });
});
