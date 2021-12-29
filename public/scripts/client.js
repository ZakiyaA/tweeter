// These three lines to avoid some errors when eslint this file
/* eslint-env jquery */
/*eslint-env browser*/
/*global timeago*/
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Tweet database -----
  const tweetData = [];
  const createTweetElement = function(tweet) {
    //...Creation of HTML with JavaScript’s Template Strings
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
    <label for="tweet-text">${escape(tweet.content.text)}</label>
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
    return $tweetMarkUp;
  };
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    // loops through tweets
    for (const tweet of tweets) {
      //calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $(`#tweets-container`).prepend($tweet);
    }
  };
  renderTweets(tweetData);
  const error = document.querySelector(".error");
  //---hide error message container, so it will not show an empty container when the page starts loading
  error.style.display = 'none';
  $("form").submit(function(event) {
    // Stop form from submitting normally
    event.preventDefault();
    const textArea = ($('#textarea').val()).trim();
    const length = textArea.length;
    if (textArea === "" || textArea === null) {
      setTimeout($('.error').slideDown("slow").text('Tweets cannot be empty').prepend('<i class="fas fa-exclamation-triangle"></i>'), 100);
      setTimeout($('.error').fadeOut( 3000), 1000);
    } else if (length > 140) {
      //--- Remove the first error message to show the other one
      //-- display the second error message
      setTimeout($('.error').slideDown("slow").text('Your tweet has exceeded the 140 character limit.').prepend('<i class="fas fa-exclamation-triangle"></i>'), 100);
      setTimeout($('.error').fadeOut( 3000), 1000);
    } else {
      // Get some values from elements on the page:
      location.reload();
      const data = $(this).serialize();
      console.log("data", data);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets",
        data: $(this).serialize(),
        success: (data) => {
          console.log('this request succeeded and here\'s the data', data);
        },
        error: (error) => {
          console.log('this request failed and this was the error', error);
        }
      });
    }
  });
  // The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      method: "GET",
    }).done(function($tweet) {
      renderTweets($tweet);
    });
  };
  loadTweets();
  // ......Add scrollToUp button...........
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const rootElement = document.documentElement;
  const scrollToTop = function() {
    // Scroll to top logic
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  scrollToTopBtn.addEventListener("click", scrollToTop);
});