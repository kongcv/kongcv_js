// JavaScript Document
	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);
	window.onload=function(){
		var objectid=localStorage.getItem("message_id")
		var extras=localStorage.getItem("extras")
		var extras=JSON.parse(extras)
		console.log(extras)
		var mode=extras.mode
		var objectid=extras.park_id
		
		var oUl=document.getElementById('ul')
		//alert(user_id)
//		alert(objectid)
//		alert(mode)
		AV.Cloud.run('kongcv_get_comment',  {"park_id" : objectid, "skip":0, "limit":10, "mode" :mode}, {
  			success: function(data) {
				console.log(data)
				for(var i=0;i<data.length;i++){
					var date=new Date(data[i].createdAt)
					var year=date.getFullYear()+'年'+date.getMonth()+1+'月'+date.getDate()+'日'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
					var user=JSON.parse(data[i].user)
					if(user.image){
						var url=user.image.url	
						var name=user.username
					}else{
					
						var url='images/Bitmap Copy.png'	
						var name=' '
					}
					
					var grade=data[i].grade;
					var comment=data[i].comment
					//alert(data[i].comment)
//					alert(data[i].grade)
					var oLi=document.createElement('li');
					oLi.innerHTML='<div class="div_mar clearfix"><div class="condiv clearfix"><img class="tximg" src="'+url+'"/><h1 class="tibh">'+name+'</h1><span class="tim_span clearfix">'+year+'</span><div class="div_info clearfix"><img class="xixi" src="images/s'+grade+'.png"/></div></div><div class="con_span"><span class="conspan">'+comment+'</span></div></div>'
					oUl.appendChild(oLi)
				}
				
			},error: function(error) {
					
			}
			
		})	
	}