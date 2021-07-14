$(document).ready(() => {
    
  $("#tweet-text").on("input", function(e) {
    let inputLength = $(".tweet-text").val()
		$(this).siblings().children(".counter");
		if (inputLength || inputLength === "") {
			let  counter = 140 - inputLength.length;
			$(this).siblings().children(".counter").val(counter);
			if (counter < 0) {
				$(this).siblings().children(".counter").css("color", "red");
			} else {
				$(this).siblings().children(".counter").css("color", "black");
			} 
			
		}


		
  });
})
    



