	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
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
		var objectid=localStorage.getItem("f")
		var mode=localStorage.getItem("a")
		
	tijiao.onclick=function(){
		if(user_id==null){
			alert('用户未登录')
			return	
		};
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
					location='plxsy.html'	
				}else{
					alert(data.error)	
				}
			}
			
		})		
	}
}