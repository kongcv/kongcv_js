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
window.onload=function(){
	clikback();
	
};
