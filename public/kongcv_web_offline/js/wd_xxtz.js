// JavaScript Document
var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
var appkey = 'bs5tH7T0alfJyepntY5Npy37';
AV.initialize(appid, appkey);
function bu(iNom){
	if(iNom<10){
		return '0'+iNom	
	}else{
		return iNom	
	}	
}
window.onload=function(){
	var aLi=document.getElementsByTagName('li')
	$(".wd_xx1").click(function(){
		$(".wd_span1").addClass("xsxhx");
		$(".wd_span2").removeClass("xsxhx");
		$(".xxtzcon").show();
		$(".xxtzcon1").hide();
	});
	$(".wd_xx2").click(function(){
		$(".wd_span2").addClass("xsxhx");
		$(".wd_span1").removeClass("xsxhx");
		$(".xxtzcon1").show();
		$(".xxtzcon").hide();
	});
	var phone=localStorage.getItem("phone")
	var ul=document.getElementById('ul');
	var send=document.getElementById('send');
	var ul2=document.getElementById('ul2');
	var recv=document.getElementById('recv');
	
	//得到通知列表
	console.log({"mobilePhoneNumber":phone,"skip":0, "limit":6, "action":"send","mode":"community"})
	AV.Cloud.run('kongcv_get_pushmessage_list', {"mobilePhoneNumber":phone,"skip":0, "limit":6, "action":"send","mode":"community"}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.extras=JSON.stringify(data[i].extras)
				oLi.objectId=data[i].objectId
				var address=data[i].extras.address.split('&')[0]
				var date=new Date(data[i].createdAt)
				var sj=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
				var mode=data[i].extras.mode;
				if(mode=="community"){
					var m='images/dl1.png'	
				}else{
					var m='images/dl.png'
				}
				
				var state=data[i].state
				
                
				if(state==0){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="wcl1">未处理</span></div></div>'
					oLi.onclick=function(){
					var extras=this.extras
					var objectId=this.objectId
					//alert(objectId)
					//alert(extras)
					localStorage.setItem("extras",extras)
					localStorage.setItem("message_id",objectId)
					location='ddqr.html';
				}		
				};
				if(state==1){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="jsbar1">接受</span></div></div>'	
					oLi.onclick=function(){
						var extras=this.extras
						var objectId=this.objectId;
						localStorage.setItem("extras",extras)
						localStorage.setItem("message_id",objectId)
						location='iosappxz.html'
					}
				};
				if(state==2){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimgbar1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="txxx4">拒绝</span></div>'	
				}
				
				ul2.appendChild(oLi)
				
				
			}
         },
         
     });
	 
	send.onclick=function(){
		//得到通知列表
		ul2.innerHTML=''
		AV.Cloud.run('kongcv_get_pushmessage_list', {"mobilePhoneNumber":phone,"skip":0, "limit":6, "action":"send","mode":"community"}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.extras=JSON.stringify(data[i].extras)
				oLi.objectId=data[i].objectId
				var address=data[i].extras.address.split('&')[0]
				var date=new Date(data[i].createdAt)
				var sj=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
				var mode=data[i].extras.mode;
				if(mode=="community"){
					var m='images/dl1.png'	
				}else{
					var m='images/dl.png'
				}
				
				var state=data[i].state
				
                
				if(state==0){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="wcl1">未处理</span></div></div>'
					oLi.onclick=function(){
					var extras=this.extras
					var objectId=this.objectId
					//alert(objectId)
					//alert(extras)
					localStorage.setItem("extras",extras)
					localStorage.setItem("message_id",objectId)
					
					location='ddqr.html';
				}		
				};
				if(state==1){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="jsbar1">接受</span></div></div>'	
					oLi.onclick=function(){
						var extras=this.extras
						var objectId=this.objectId	;
						localStorage.setItem("extras",extras)
						localStorage.setItem("message_id",objectId)
						location='iosappxz.html'
					}
				};
				if(state==2){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimgbar1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="txxx4">拒绝</span></div>'	
				}
				
				ul2.appendChild(oLi)
				
				
			}
         },
         
     });	
	} ;
	recv.onclick=function(){
		//得到通知列表
		ul.innerHTML=''
		AV.Cloud.run('kongcv_get_pushmessage_list', {"mobilePhoneNumber":phone,"skip":0, "limit":6, "action":"recv","mode":"community"}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.extras=JSON.stringify(data[i].extras)
				oLi.objectId=data[i].objectId
				var address=data[i].extras.address.split('&')[0]
				var date=new Date(data[i].createdAt)
				var sj=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
				var mode=data[i].extras.mode;
				if(mode=="community"){
					var m='images/dl1.png'	
				}else{
					var m='images/dl.png'
				}
				
				var state=data[i].state
				if(state==0){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimgbar" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="wcl">未处理</span></div></div>'
					oLi.onclick=function(){
						var extras=this.extras
						var objectId=this.objectId
						//alert(objectId)
						//alert(extras)
						localStorage.setItem("extras",extras)
						localStorage.setItem("message_id",objectId)
						
						location='tzy2.html';
					}
						
				};
				if(state==1){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimg" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="jsbar">接受</span></div></div>'	
				};
				if(state==2){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimg" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="txxx2">拒绝</span></div></div>'	
				}
				
				ul.appendChild(oLi)
				
			}
         },
        
     });
	 	
	};
	
	
}
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var skip=0
	var skip1=0
function pullDownAction () {
	setTimeout(function () {
		skip=0
		var phone=localStorage.getItem("phone")
		var ul=document.getElementById('ul');
		var send=document.getElementById('send');
		var ul2=document.getElementById('ul2');
		var recv=document.getElementById('recv');
		ul.innerHTML=''
		AV.Cloud.run('kongcv_get_pushmessage_list', {"mobilePhoneNumber":phone,"skip":0, "limit":6, "action":"recv","mode":"community"}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.extras=JSON.stringify(data[i].extras)
				oLi.objectId=data[i].objectId
				var address=data[i].extras.address.split('&')[0]
				var date=new Date(data[i].createdAt)
				var sj=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
				var mode=data[i].extras.mode;
				if(mode=="community"){
					var m='images/dl1.png'	
				}else{
					var m='images/dl.png'
				}
				
				var state=data[i].state
				if(state==0){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimgbar" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="wcl">未处理</span></div></div>'	
					oLi.onclick=function(){
					var extras=this.extras
					var objectId=this.objectId
					//alert(objectId)
					//alert(extras)
					localStorage.setItem("extras",extras)
					localStorage.setItem("message_id",objectId)
					
					location='tzy2.html';
					
				}	
				};
				if(state==1){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimg" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="jsbar">接受</span></div></div>'	
				};
				if(state==2){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimg" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="txxx2">拒绝</span></div></div>'	
				}
				
				ul.appendChild(oLi);
				
				
			}
         },
        
     });	
	
	}, 100);
}

function pullUpAction () {
	setTimeout(function () {
		skip+=6
		//alert(skip)
		var phone=localStorage.getItem("phone")
		var ul=document.getElementById('ul');
		var send=document.getElementById('send');
		var ul2=document.getElementById('ul2');
		var recv=document.getElementById('recv');
		ul.innerHTML=''
		AV.Cloud.run('kongcv_get_pushmessage_list', {"mobilePhoneNumber":phone,"skip":skip, "limit":6, "action":"recv","mode":"community"}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.extras=JSON.stringify(data[i].extras)
				oLi.objectId=data[i].objectId
				var address=data[i].extras.address.split('&')[0]
				var date=new Date(data[i].createdAt)
				var sj=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
				var mode=data[i].extras.mode;
				if(mode=="community"){
					var m='images/dl1.png'	
				}else{
					var m='images/dl.png'
				}
				
				var state=data[i].state
				if(state==0){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimgbar" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="wcl">未处理</span></div></div>'	
					oLi.onclick=function(){
					var extras=this.extras
					var objectId=this.objectId
					//alert(objectId)
					//alert(extras)
					localStorage.setItem("extras",extras)
					localStorage.setItem("message_id",objectId)
					
					location='tzy2.html';
					
				}	
				};
				if(state==1){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimg" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="jsbar">接受</span></div></div>'	
				};
				if(state==2){
					oLi.innerHTML='<div class="div_xxtz"><img class="dlimg" src="'+m+'"/><div class="xitz"><h2 class="tzhbar">'+address+'</h2><span class="txxx1">'+sj+'</span><span class="txxx2">拒绝</span></div></div>'	
				}
				
				ul.appendChild(oLi);
				
				
			}
         },
        
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
function pullDownAction2 () {
	setTimeout(function () {
		skip1=0
		var phone=localStorage.getItem("phone")
		var ul=document.getElementById('ul');
		var send=document.getElementById('send');
		var ul2=document.getElementById('ul2');
		var recv=document.getElementById('recv');
		ul2.innerHTML=''
		AV.Cloud.run('kongcv_get_pushmessage_list', {"mobilePhoneNumber":phone,"skip":0, "limit":6, "action":"send","mode":"community"}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.extras=JSON.stringify(data[i].extras)
				oLi.objectId=data[i].objectId
				var address=data[i].extras.address.split('&')[0]
				var date=new Date(data[i].createdAt)
				var sj=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
				var mode=data[i].extras.mode;
				if(mode=="community"){
					var m='images/dl1.png'	
				}else{
					var m='images/dl.png'
				}
				
				var state=data[i].state
				
                
				if(state==0){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="wcl1">未处理</span></div></div>'
					oLi.onclick=function(){
					var extras=this.extras
					var objectId=this.objectId
					//alert(objectId)
					//alert(extras)
					localStorage.setItem("extras",extras)
					localStorage.setItem("message_id",objectId)
					
					location='ddqr.html';
				}		
				};
				if(state==1){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="jsbar1">接受</span></div></div>'	
					oLi.onclick=function(){
						var extras=this.extras
						var objectId=this.objectId	;
						localStorage.setItem("extras",extras)
						localStorage.setItem("message_id",objectId)
						location='iosappxz.html'
					}
				};
				if(state==2){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimgbar1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="txxx4">拒绝</span></div>'	
				}
				
				ul2.appendChild(oLi)
				
				
			}
         },
         
     });	
	
	}, 100);
}

function pullUpAction2 () {
	setTimeout(function () {
		skip1+=6
		//alert(skip2)
		var phone=localStorage.getItem("phone")
		var ul=document.getElementById('ul');
		var send=document.getElementById('send');
		var ul2=document.getElementById('ul2');
		var recv=document.getElementById('recv');
		ul2.innerHTML=''
		AV.Cloud.run('kongcv_get_pushmessage_list', {"mobilePhoneNumber":phone,"skip":skip1, "limit":6, "action":"send","mode":"community"}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.extras=JSON.stringify(data[i].extras)
				oLi.objectId=data[i].objectId
				var address=data[i].extras.address.split('&')[0]
				var date=new Date(data[i].createdAt)
				var sj=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
				var mode=data[i].extras.mode;
				if(mode=="community"){
					var m='images/dl1.png'	
				}else{
					var m='images/dl.png'
				}
				
				var state=data[i].state
				
                
				if(state==0){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="wcl1">未处理</span></div></div>'
					oLi.onclick=function(){
					var extras=this.extras
					var objectId=this.objectId
					//alert(objectId)
					//alert(extras)
					localStorage.setItem("extras",extras)
					localStorage.setItem("message_id",objectId)
					
					location='ddqr.html';
				}		
				};
				if(state==1){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimg1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="jsbar1">接受</span></div></div>'	
					oLi.onclick=function(){
						var extras=this.extras
						var objectId=this.objectId	;
						localStorage.setItem("extras",extras)
						localStorage.setItem("message_id",objectId)
						location='iosappxz.html'
					}
				};
				if(state==2){
					oLi.innerHTML='<div class="div_xxtz1"><img class="dlimgbar1" src="'+m+'"/><div class="xitz1"><h2 class="tzhbar1">'+address+'</h2><span class="txxx3">'+sj+'</span><span class="txxx4">拒绝</span></div>'	
				}
				
				ul2.appendChild(oLi)
				
				
			}
         },
        
     });	
			
			
	}, 100);	
}

function loaded2() {
	pullDownEl = document.getElementById('pullDown2');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp2');	

	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper2', {
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
							
				pullDownAction2();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction2();	// Execute custom function (ajax call?)
			}
		}
	});
	

}

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200);setTimeout(loaded2, 200); }, false);