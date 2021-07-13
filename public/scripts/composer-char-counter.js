$(document).ready(() => {
    
  $("#tweet-text").on("input", function(e) {
    let inputLength = $(".tweet-text").val()
		$(this).siblings().children(".counter");
		if (inputLength) {
			let  counter =  141 - inputLength.length;
			$(this).siblings().children(".counter").val(counter);
			if (counter < 0) {
				$(this).siblings().children(".counter").css("color", "red");
			} else {
				$(this).siblings().children(".counter").css("color", "black");
			}
			
		}


		
  });
})
    



