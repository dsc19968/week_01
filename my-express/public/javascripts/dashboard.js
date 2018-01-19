$(function(){
	$(".left_nav li").on("click",function(event){
		$(this).find($(".hidden_nav")).toggle();
		event.stopPropagation();
//		return false;
	});
	function togg(){
		var toggle = true;
		$(".left_nav li").click(function(){
			if(parseInt($(this).css("height"))>50){
				$(this).find("span").text("-");
				toggle = false;
			}else{
				$(this).find("span").text("+");
				toggle = true;
			}
		});
	}
	togg();
	//商品
//	$('.hidden_nav li').click(function(){
//			$('.right iframe').eq($(this).index()).show().siblings().hide();
//		})	
	
})

