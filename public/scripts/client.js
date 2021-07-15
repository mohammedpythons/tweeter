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

    
        let html = `<article>
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

    return html
}
const loadTweet = () => {
  $.ajax({
    url: "/tweets",
    action: "GET"
  })
  .then((res) => {
  
    for (const user of res) {
      const $tweet = createTweetElement(user);
      const $element = $(".sec");
      $element.prepend($tweet);
    }
  })

}
loadTweet();


$('form').on("submit", (e) => {
  e.preventDefault();
  const $text = $(".tweet-text").val();
  $.ajax({
    url: "/tweet",
    method: "POST",
    data: {"text": $text}
  })
  const submit = {
    user: {
      name: "Moe",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@Moe99"
    },
    content: {
      text: $text
    },

    created_at: Date.now()

  }
  if ($text.length > 140) {
    $(".error").text("Oops! your tweet must be 140 characters maximum");
    $(".error").slideDown()
  }else if (!$text){
    $(".error").text("Oops, you have to write something!!")
    $(".error").slideDown()
  } else {
    const $tweet = createTweetElement(submit);
        const $element = $(".sec");
        $element.prepend($tweet);
        $(".error").slideUp();
  }
  
})

});




