// JavaScript Document
	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
	AV.initialize(appid, appkey);
	
	function bu(iNom){
		if(iNom<10){
			return '0'+iNom	
		}else{
			return iNom	
		}	
	}
	window.onload=function(){
	
	var bok=true
	
		var user_id=localStorage.getItem("e");
		var ul=document.getElementById('ul')
		var hide=0
		AV.Cloud.run('kongcv_get_park_list',{"user_id":user_id,"skip":0, "limit":4,"mode":"community", "action":"userid"}, {
			success: function(result) {
					console.log(result)
					//alert(result[0].address.split('&')[0]);
					
					
					//alert(date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate()))
					//alert(bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds()))
					//alert(end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate()))
					//alert(bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds()))
					for(var i=0;i<result.length;i++){
						var address=result[i].address.split('&')[0]
						var date=new Date(result[i].hire_start)
						var end=new Date(result[i].hire_end)
						var year=date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate())
						var mon=bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds())
						var year2=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate())
						var mon2=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds())
						var park_hide=result[i].park_hide;
						var a=ul.getElementsByClassName('ypb')
						if(park_hide==0){
							var ppp='屏蔽'
							
						}else{
							var ppp='已屏蔽'	
						}
						var oLi=document.createElement('li')	
						oLi.data=JSON.stringify(result[i])
						oLi.innerHTML='<div class="div_ww"><div class="div_cwglb"><img class="img_cwgl" src="images/icon_dingwei.png"/><h1 class="cwg_h1">'+address+'</h1><span class="ypb">'+ppp+'</span></div></div><div class="div_cw"><div class="div_mrbar"><span class="cwgl_le">起止&nbsp;&nbsp;&nbsp;:</span><span class="cwgl_co">'+year+'</span><span class="cwgl_ri">'+mon+'</span><span class="cwgl_le">结束&nbsp;&nbsp;&nbsp;:</span><span class="cwgl_co">'+year2+'</span><span class="cwgl_ri">'+mon2+'</span></div></div>'
						
						oLi.objectid=result[i].objectId
						
						ul.appendChild(oLi)
						var ot=oLi.getElementsByTagName('div')[2]
						ot.onclick=function(){
							 location='cwfbsq2.html'
						}
						oLi.onclick=function(){
							var data=this.data
							 localStorage.setItem("data",data)
							
						}
					}
				
					
					for(var i=0;i<a.length;i++){
						a[i].onclick=function(){
							if(this.innerHTML=='屏蔽'){
								hide=1
								var fu=this.parentNode
								var f2=fu.parentNode
								var f3=f2.parentNode
								var park_id=f3.objectid
								this.innerHTML='已屏蔽'	
								AV.Cloud.run('kongcv_put_park_hide', {"park_id":park_id,"hide":hide, "mode":"community"}, {
									success: function(data) {
										console.log(data)
										var date=JSON.parse(data);
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('成功')	
										}
									
									 },
									 
								 });
								
								 
								
								
							}else if(this.innerHTML=='已屏蔽'){
								var hide=0;
								var fu=this.parentNode
								var f2=fu.parentNode
								var f3=f2.parentNode
								var park_id=f3.objectid
								this.innerHTML='屏蔽'
								AV.Cloud.run('kongcv_put_park_hide', {"park_id":park_id,"hide":hide, "mode":"community"}, {
									success: function(data) {
										console.log(data)
										var date=JSON.parse(data);
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('成功')	
										}
									
									 },
									
								 });
								
								
									
							};
							
						}	
					}
				
					
	
					
					
		 	}
		 
		});		
		
	}
	var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var skip=0
function pullDownAction () {
	setTimeout(function () {
		skip=0
		var user_id=localStorage.getItem("e");
		var ul=document.getElementById('ul')
		var hide=0	
		ul.innerHTML=''
		AV.Cloud.run('kongcv_get_park_list',{"user_id":user_id,"skip":0, "limit":4,"mode":"community", "action":"userid"}, {
			success: function(result) {
					console.log(result)
					//alert(result[0].address.split('&')[0]);
					
					
					//alert(date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate()))
					//alert(bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds()))
					//alert(end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate()))
					//alert(bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds()))
					for(var i=0;i<result.length;i++){
						var address=result[i].address.split('&')[0]
						var date=new Date(result[i].hire_start)
						var end=new Date(result[i].hire_end)
						var year=date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate())
						var mon=bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds())
						var year2=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate())
						var mon2=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds())
						var park_hide=result[i].park_hide;
						var a=ul.getElementsByClassName('ypb')
						if(park_hide==0){
							var ppp='屏蔽'
							
						}else{
							var ppp='已屏蔽'	
						}
						var oLi=document.createElement('li')	
						oLi.data=JSON.stringify(result[i])
						oLi.innerHTML='<div class="div_ww"><div class="div_cwglb"><img class="img_cwgl" src="images/icon_dingwei.png"/><h1 class="cwg_h1">'+address+'</h1><span class="ypb">'+ppp+'</span></div></div><div class="div_cw"><div class="div_mrbar"><span class="cwgl_le">起止&nbsp;&nbsp;&nbsp;:</span><span class="cwgl_co">'+year+'</span><span class="cwgl_ri">'+mon+'</span><span class="cwgl_le">结束&nbsp;&nbsp;&nbsp;:</span><span class="cwgl_co">'+year2+'</span><span class="cwgl_ri">'+mon2+'</span></div></div>'
						
						oLi.objectid=result[i].objectId
						
						ul.appendChild(oLi)
						var ot=oLi.getElementsByTagName('div')[2]
						ot.onclick=function(){
							 location='cwfbsq2.html'
						}
						oLi.onclick=function(){
							var data=this.data
							 localStorage.setItem("data",data)
							 location='cwfbsq2.html';
						}
					}
				
					
					for(var i=0;i<a.length;i++){
						a[i].onclick=function(){
							if(this.innerHTML=='屏蔽'){
								hide=1
								var fu=this.parentNode
								var f2=fu.parentNode
								var f3=f2.parentNode
								var park_id=f3.objectid
								this.innerHTML='已屏蔽'	
								AV.Cloud.run('kongcv_put_park_hide', {"park_id":park_id,"hide":hide, "mode":"community"}, {
									success: function(data) {
										console.log(data)
										var date=JSON.parse(data);
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('成功')	
										}
									
									 }
									
								 });
								
								
							}else if(this.innerHTML=='已屏蔽'){
								var hide=0;
								var fu=this.parentNode
								var f2=fu.parentNode
								var f3=f2.parentNode
								var park_id=f3.objectid
								this.innerHTML='屏蔽'
								AV.Cloud.run('kongcv_put_park_hide', {"park_id":park_id,"hide":hide, "mode":"community"}, {
									success: function(data) {
										console.log(data)
										var date=JSON.parse(data);
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('成功')	
										}
									
									 },
									 
								 });
									
							};
							
						}	
					}
				
					
	
					
					
		 	}
		});		
	
	}, 100);
}

function pullUpAction () {
	setTimeout(function () {
		skip+=4
		//alert(skip)
		var user_id=localStorage.getItem("e");
		var ul=document.getElementById('ul')
		var hide=0	
		ul.innerHTML=''
		AV.Cloud.run('kongcv_get_park_list',{"user_id":user_id,"skip":skip, "limit":4,"mode":"community", "action":"userid"}, {
			success: function(result) {
					console.log(result)
					//alert(result[0].address.split('&')[0]);
					
					
					//alert(date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate()))
					//alert(bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds()))
					//alert(end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate()))
					//alert(bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds()))
					for(var i=0;i<result.length;i++){
						var address=result[i].address.split('&')[0]
						var date=new Date(result[i].hire_start)
						var end=new Date(result[i].hire_end)
						var year=date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate())
						var mon=bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds())
						var year2=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate())
						var mon2=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds())
						var park_hide=result[i].park_hide;
						var a=ul.getElementsByClassName('ypb')
						if(park_hide==0){
							var ppp='屏蔽'
							
						}else{
							var ppp='已屏蔽'	
						}
						var oLi=document.createElement('li')	
						oLi.data=JSON.stringify(result[i])
						oLi.innerHTML='<div class="div_ww"><div class="div_cwglb"><img class="img_cwgl" src="images/icon_dingwei.png"/><h1 class="cwg_h1">'+address+'</h1><span class="ypb">'+ppp+'</span></div></div><div class="div_cw"><div class="div_mrbar"><span class="cwgl_le">起止&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span><span class="cwgl_co">'+year+'</span><span class="cwgl_ri">'+mon+'</span><span class="cwgl_le">结束&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span><span class="cwgl_co">'+year2+'</span><span class="cwgl_ri">'+mon2+'</span></div></div>'
						
						oLi.objectid=result[i].objectId
						
						ul.appendChild(oLi)
						var ot=oLi.getElementsByTagName('div')[2]
						ot.onclick=function(){
							 location='cwfbsq2.html'
						}
						oLi.onclick=function(){
							var data=this.data
							 localStorage.setItem("data",data)
							 location='cwfbsq2.html';
						}
					}
				
					
					for(var i=0;i<a.length;i++){
						a[i].onclick=function(){
							if(this.innerHTML=='屏蔽'){
								hide=1
								var fu=this.parentNode
								var f2=fu.parentNode
								var f3=f2.parentNode
								var park_id=f3.objectid
								this.innerHTML='已屏蔽'	
								AV.Cloud.run('kongcv_put_park_hide', {"park_id":park_id,"hide":hide, "mode":"community"}, {
									success: function(data) {
										console.log(data)
										var date=JSON.parse(data);
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('成功')	
										}
									
									 },
									
								 });
								
								
							}else if(this.innerHTML=='已屏蔽'){
								var hide=0;
								var fu=this.parentNode
								var f2=fu.parentNode
								var f3=f2.parentNode
								var park_id=f3.objectid
								this.innerHTML='屏蔽'
								AV.Cloud.run('kongcv_put_park_hide', {"park_id":park_id,"hide":hide, "mode":"community"}, {
									success: function(data) {
										console.log(data)
										var date=JSON.parse(data);
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('成功')	
										}
									
									 }
								 });
									
							};
							
						}	
					}
				
					
	
					
					
		 	}
		});		
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