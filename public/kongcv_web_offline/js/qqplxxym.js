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
	var grade=0
	for(var i=0;i<aI.length;i++){
		aI[i].onclick=function(){
			grade=this.alt	
		}	
	}
		var  user_id=localStorage.getItem("e")
		var ddgl=localStorage.getItem("ddgl");
		var mode=localStorage.getItem("modes");
		var data=JSON.parse(ddgl)
		console.log(data)
		if(mode=='curb'){
			var park_community=JSON.parse(data.park_curb)		
		}
		if(mode=='community'){
			var park_community=JSON.parse(data.park_community)		
		}
			
		
		
		var hire_method=JSON.parse(data.hire_method)
		var objectid=park_community.objectId;
		
	tijiao.onclick=function(){
		var test=comment.value
		var gra=parseFloat(grade)
		//alert(objectid)
		//alert(mode)
		//alert(test)
		
		
		AV.Cloud.run('kongcv_insert_comment',  {"user_id" : user_id, "comment" : test, "park_id" : objectid,"grade":gra, "mode" : mode},{
  			success: function(data) {
				var data=JSON.parse(data)
				console.log(data)
				if(data.state=='ok'){
					alert('成功')	
				}else{
					alert(data.error)	
				}
			},error: function(error) {
					
			}
			
		})		
	}
}