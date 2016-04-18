	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);
$(document).ready(function(){
	$(".closs_a").focus(function(){
		$(".img_cos").attr("src", "images/btn_hjt_pressed.png");
	});
	
});
window.onload=function(){
	
	var tijiao=document.getElementById('tijiao');
	var star=document.getElementById('star')
	var aI=star.getElementsByTagName('img')
	var comment=document.getElementById('comment')
	var grade=1
	for(var i=0;i<aI.length;i++){
		aI[i].onclick=function(){
			grade=this.alt	
		}	
	}
		var  user_id=localStorage.getItem("e")
		var objectid=localStorage.getItem("message_id")
		var extras=localStorage.getItem("extras")
		var extras=JSON.parse(extras)
		console.log(extras)
		var mode=extras.mode
		var objectid=extras.park_id
			
	tijiao.onclick=function(){
		var test=comment.value
		var gra=parseFloat(grade)
		alert(objectid)
		alert(mode)
		alert(test)
		
		
		AV.Cloud.run('kongcv_insert_comment',  {"user_id" : user_id, "comment" : test, "park_id" : objectid,"grade":gra, "mode" : mode},{
  			success: function(data) {
				console.log(data)
				var data=JSON.parse(data)
				if(data.state=='error'){
					alert(data.error)	
				}else{
					alert('成功')	
				}
			},error: function(error) {
					
			}
			
		})		
	}
}