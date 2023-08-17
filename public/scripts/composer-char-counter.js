$(document).ready(function() {
  // --- our code goes here ---
  const $tweet = $('#tweet-text');
  $tweet.on('keyup', function() {
    let charLeftOut = (140 - (this.value.length));
    let $charCount = $('.counter');
    $charCount.text(charLeftOut);
    if (charLeftOut < 0) {
      $charCount.css('color', 'red');
    } else {
      $charCount.css('color', '#545149');
    }
  });
});