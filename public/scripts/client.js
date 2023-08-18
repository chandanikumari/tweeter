/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1692068593373
  }
];

$(document).ready(function () {

  const renderTweets = function (tweetArr) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    const $container = $(".container");
    $.each(tweetArr, (key) => {
      $container.append(createTweetElement(tweetArr[key]));
    });
    return $container;
  };

  // let $tweet = $(`<article class="tweet">Hello world</article>`);

  const createTweetElement = function (tweet) {
    /* Your code for creating the tweet element */
    // console.log("Inside the function", tweet);
    let $tweet = `<article class="all-tweets">
          <header class="top">
            <div class='avatar'>
              <img src=${tweet.user.avatars}>
              <h4>${tweet.user.name}</h4>
            </div>
            <h5 id="username">${tweet.user.handle}"</h5>
          </header>
          <main>
            <p>${tweet.content.text}</p>
            <footer>
              <label>${tweet.created_at}</label>
              <div class="footer_icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer
        </main>
      </article>
    `;

    return $tweet;
  };

  renderTweets(tweetData);


  // Submit form
  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log("Handler for `submit` called.");
    // let str = $("form").serialize();
    // console.log(str);

    // send the POST request
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets',
      data: $("form").serialize(),
      success: function(data) {
        console.log('Request was successful:', data);
      },
      error: function(error) {
        console.log('An error occurred:', error);
      }
    });
  });

});
