/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// preventing crose site scripting (XSS)
$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //creating element on the fly
	const createTweetElement = (obj) => {

    
        let $html = `<article>
        <header class="header-tweeted">
          <div><img src="${obj.user.avatars}"> ${obj.user.name}</div>
          <h3>${obj.user.handle}</h3>
        </header>
        <p class="par-tweeted">
          ${escape(obj.content.text)}
        </p>
        <footer class="footer-tweeted">
          <div>${timeago.format(obj.created_at)}</div>
          <div>
            <i class="fas fa-flag icon-footer"></i>
            <i class="fas fa-heart icon-footer"></i>
            <i class="fas fa-retweet icon-footer"></i>
    
          </div>
        </footer>
      </article>`

    return $html;
}
const renderTweet = (tweet) => {
  for (const item of tweet) {
    const $tweet = createTweetElement(item);
      const $element = $(".sec");
      $element.prepend($tweet);
  }
}
const loadTweet = () => {
  $.ajax({
    url: "/tweets",
    action: "GET"
  })
  .then((res) => {

    renderTweet(res);
  })
}
$('form').on("submit", (e) => {
  e.preventDefault();
  const data = $("form").serialize()
 const $text = $("#tweet-text").val();
  if ($text.length > 140) {
    $(".error").text("Oops! your tweet must be 140 characters maximum");
    $(".error").slideDown("slow").delay(1500).slideUp("slow");
  }else if (!$text){
    $(".error").text("Oops, you have to write something!!")
    $(".error").slideDown("slow").delay(1500).slideUp("slow");
  } else {
    $.ajax({
      url: "/tweets",
      method: "POST",
      data
    })
   .then(() => {
    loadTweet()
   })

    $("#form-id").trigger("reset");
  }
})
loadTweet();

});




