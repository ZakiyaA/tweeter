/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function (tweet) {
  // console.log(tweet);
  const $tweetMarkUp = `
  <article class="article-tweet">
  <header class="tweet-header">
    <div >
      <span class="face">
      <img src="${tweet.user.avatars}">
      ${tweet.user.name} </span>
    </div>
    <span>${tweet.user.handle}</span>
  </header>
  <div class="middle">
    <label for="tweet-text">${tweet.content.text}</label>
    <hr>
  </div>
  <footer>
  <span class="need_to_be_rendered" datetime="2018-07-07T09:24:17Z">${timeago.format(tweet.created_at)}</span>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
  </article>
  `;

    $('#tweets-container').append($tweetMarkUp);
    return $tweetMarkUp;
  }


  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    // loops through tweets
    for(const tweet of tweets) {
      console.log(tweets.length);
      //calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $(`#tweets-container`).append($tweet);
    }
  }

  renderTweets(tweetData);
});