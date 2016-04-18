// JavaScript Document
	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);

//底部点击出背景图片
function clikback(){
	$(".back1").click(function(){
		 $(".back1").addClass("a_backimg1");
	});
		
	$(".back2").click(function(){
		$(".back2").addClass("a_backimg2");
	})
	$(".back3").click(function(){
		$(".back3").addClass("a_backimg3");
	})
	
	
}
$(document).ready(function(){
	clikback();
});
window.onload=function(){
	var user_id=localStorage.getItem("e")
	var money=document.getElementById('money')
	AV.Cloud.run('kongcv_get_purse',   {"user_id":user_id,"skip":0,"limit":10,}, {
		success: function(result) {
			console.log(result)
			money.innerHTML='￥'+result[0].money+'元'
		
				
  }
});
}
