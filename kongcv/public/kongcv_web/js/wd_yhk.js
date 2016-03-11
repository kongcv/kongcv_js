// JavaScript Document
	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
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
	var ul=document.getElementById('ul')
	clikback();
	var user_id=localStorage.getItem("e")
	AV.Cloud.run('kongcv_get_purse',   {"user_id":user_id,"skip":0,"limit":10,}, {
		success: function(result) {
			console.log(result)
			var arr=result[0].bank_card
			var bank=arr[0].bank
			var card1=arr[0].card
			var a=card1.substr(card1.length-4)
			
			
			var card='*** **** **** '+a
			
			//alert(card)
			var oLi=document.createElement('li')
			oLi.innerHTML='<span class="yhkli1">'+bank+'</span><span class="yhkh">'+card+'</span>'
			ul.appendChild(oLi)
			oLi.onclick=function(){
				location='wd_ggyhk.html'	
			}
			
 }
});
	
};

