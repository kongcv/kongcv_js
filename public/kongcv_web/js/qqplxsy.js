// JavaScript Document
	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);
	window.onload=function(){
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
		var objectid=park_community.objectId
		
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
					var user=JSON.parse(data[i].user)
					if(user){
						var name=user.username	
					}else{
						var name=' '
					};
					if(user.image){
						var url=user.image.url	
						
					}else{
					
						var url='images/Bitmap Copy.png'	
						
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
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var skip=10
	
function pullDownAction () {
		var ddgl=localStorage.getItem("ddgl");
		var mode=localStorage.getItem("modes");
		var data=JSON.parse(ddgl)
		
		if(mode=='curb'){
			var park_community=JSON.parse(data.park_curb)		
		}
		if(mode=='community'){
			var park_community=JSON.parse(data.park_community)		
		}
			
		var hire_method=JSON.parse(data.hire_method)
		var objectid=park_community.objectId
		var oUl=document.getElementById('ul')
		setTimeout(function () {
			oUl.innerHTML='<li style="border-top:none;"><div class="div_mar clearfix"><span class="pl">评论</span></div></li>'
			skip=10
			//alert('刷新')	
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
	}, 100);
}

function pullUpAction () {
	var ddgl=localStorage.getItem("ddgl");
		var mode=localStorage.getItem("modes");
		var data=JSON.parse(ddgl)
		
		if(mode=='curb'){
			var park_community=JSON.parse(data.park_curb)		
		}
		if(mode=='community'){
			var park_community=JSON.parse(data.park_community)		
		}
			
		var hire_method=JSON.parse(data.hire_method)
		var objectid=park_community.objectId
		var oUl=document.getElementById('ul')
	setTimeout(function () {
		skip+=10
		//alert(skip)
		oUl.innerHTML='<li style="border-top:none;"><div class="div_mar clearfix"><span class="pl">评论</span></div></li>'
		AV.Cloud.run('kongcv_get_comment',  {"park_id" : objectid, "skip":skip, "limit":10, "mode" :mode}, {
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
			
	}, 100);	
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	

	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
							
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	

}
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);	