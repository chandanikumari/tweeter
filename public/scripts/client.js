/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("#tweetSizeError").hide();
  $("#tweetEmptyError").hide();

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const renderTweets = function(tweetArr) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    const $container = $(".tweetContainer");
    $container.empty();
    $.each(tweetArr, (key) => {
      $container.prepend(createTweetElement(tweetArr[key]));
    });
    return $container;
  };

  // let $tweet = $(`<article class="tweet">Hello world</article>`);

  const createTweetElement = function(tweet) {
    /* Your code for creating the tweet element */
    let $tweet = `<article class="all-tweets">
          <header class="top">
            <div class='avatar'>
              <img src=${tweet.user.avatars}>
              <h4>${tweet.user.name}</h4>
            </div>
            <h5 id="username">${tweet.user.handle}</h5>
          </header>
          <main>
            <p>${escape(tweet.content.text)}</p>
            <footer>
              <label>${timeago.format(tweet.created_at)}</label>
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

  // Submit form

  $("form").on("submit", function(event) {
    event.preventDefault();
    let $tweet = $('#tweet-text').val();
    console.log("Troubleshooting ::::::::", $tweet);

    if ($tweet.length === 0) {
      // alert($tweet);
      $("#tweetEmptyError").slideDown('slow');
      $("#tweetEmptyError").hide();
      return;
    }
    if ($tweet.length > 140) {
      // alert("Sorry you have exceeded the maximum word limit of 140 characters");
      $("#tweetSizeError").slideDown('slow');
      $("#tweetSizeError").hide();
      return;
    }
    $tweet = $('<div>').text($tweet);
    console.log("Handler for `submit` called.");
    let str = $(this).serialize();
    console.log(str);

    // send the POST request

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets',
      data: str,
      success: function(data) {
        loadtweets();
        $('input, textarea').val('');
        $('.counter').text(140);
        console.log('Request was successful:', data);
      },
      error: function (error) {
        console.log('An error occurred:', error);
      }
    });
  });

  // Load tweets

  const loadtweets = function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/tweets',
      // console.log("Troubleshooting", tweet);
      success: function(tweet) {
        renderTweets(tweet);
      },
      error: function(error) {
        console.log('An error occurred:', error);
      }
    });
  };
  loadtweets();
});
