// JavaScript Document

window.onload=function(){
	
	var bok=true
	var container=document.getElementById('container')
	var paixu=document.getElementById('paixu')
	var iMg=container.getElementsByTagName('img');
	var huadong=document.getElementById('huadong');
	var huadong2=document.getElementById('huadong1');
	var oUl=document.getElementById('uul')
	var u2=document.getElementById('uu2')
	var mode=localStorage.getItem("a")
	
	var  hire_method_id=localStorage.getItem("b")
	var field=localStorage.getItem("field")
	var latitude=parseFloat(localStorage.getItem("c"))
	var longitude=parseFloat(localStorage.getItem("d"))
	var address=localStorage.getItem("add")
	var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:15,
        center: [longitude,latitude],
		 keyboardEnable: false
    });
	var hire_type=localStorage.getItem("hire_type");
	if(hire_type==2){
		
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":"", "skip":0,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;"></label><label style="float:right; width:12px;color:#979797;"></label></div></div>'
						oLi.object=stopSet1[i].objectId
						oLi.onclick=function(){
						var objectid=this.object
						
						localStorage.setItem("f",objectid)
						location='xqpl3.html'	
						return;
					}		
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;"></label><label style="float:right; width:12px;color:#979797;"></label></div></div>'
					
					oLi.object=stopSet1[i].objectId
						oLi.onclick=function(){
							var objectid=this.object
							localStorage.setItem("f",objectid)
							location='xqpl4.html'
							return;	
						}	
					}
				
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					oUl.appendChild(oLi)
					var aLi=oUl.getElementsByTagName('li') 
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
 
})
};

	AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":hire_method_id, "skip":0,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						oLi.onclick=function(){
							var objectid=this.object
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl3.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl2.html'	
								return;		
							}
							
						}
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
						
						oLi.onclick=function(){
							var objectid=this.object
							
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl4.html'	
								return;
							}
							
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl.html'	
								return		
							}
						}
					}
				
					console.log(stopSet1[i])
					
					oUl.appendChild(oLi)
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
  
});
paixu.onclick=function(){
	if(hire_type==2){
		alert('无价格，无法排序')
		return;
			
	}
	oUl.innerHTML=''
	huadong.style.display='none'
	huadong2.style.display='block'
	
	if(paixu.innerHTML=='按价格'){
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":hire_method_id,"hire_field":field, "sort":"price_asc","skip":0,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						oLi.onclick=function(){
							var objectid=this.object
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl3.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl2.html'	
								return;		
							}
							
						}
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
						
						oLi.onclick=function(){
							
							var objectid=this.object
							
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl4.html'	
								return;
							}
							
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl.html';
								return;			
							}
						}
					}
				
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					u2.appendChild(oLi)
					var aLi=u2.getElementsByTagName('li') 
					
					
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
 
});	
		paixu.innerHTML='按距离'	
	}
	else if(paixu.innerHTML=='按距离'){
		u2.innerHTML='';
		huadong2.style.display='none'
		huadong.style.display='block'
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":hire_method_id, "skip":0,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
							oLi.onclick=function(){
								
							
							var objectid=this.object
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl3.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl2.html'	
								return;		
							}
							
						}
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
					
						
						oLi.onclick=function(){
						
							var objectid=this.object
							
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl4.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl.html'
								return;			
							}
						}
					}
				
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					oUl.appendChild(oLi)
					var aLi=oUl.getElementsByTagName('li') 
					
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
  
});		
		paixu.innerHTML='按价格'
	}	
	

}


var hua2=document.getElementById('huadong2')
	var oA=document.getElementById('aaaa')
		var bok=true;
		oA.onclick=function(){
			if(bok){
				move(huadong,{top:126})	
				move(huadong2,{top:126})	
				move(hua2,{top:126})	
				bok=false	
			}
			else if(!bok){
				move(huadong,{top:0})
				move(huadong2,{top:0})	
				move(hua2,{top:0})	
				bok=true		
			}
	};
	
	
var  user_id=localStorage.getItem("e")

	
		fabu.onclick=function(){
			if(user_id==null){
				location='enroll.html'
			}else{
				location='fbsq.html'
			}
		}
		wode.onclick=function(){
			if(user_id==null){
				location='enroll.html'
			}else{
				location='wd_index.html'	
			}
		}
		
		
}

var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
var skip=0
var skip2=0
function pullDownAction () {
	setTimeout(function () {
	skip=0
	var ul=document.getElementById('uul')
	ul.innerHTML=''
	var container=document.getElementById('container')
	var paixu=document.getElementById('paixu')
	var iMg=container.getElementsByTagName('img');
	
	var oUl=document.getElementById('uul')
	var mode=localStorage.getItem("a")
	
	var  hire_method_id=localStorage.getItem("b")
	var field=localStorage.getItem("field")
	var latitude=parseFloat(localStorage.getItem("c"))
	var longitude=parseFloat(localStorage.getItem("d"))
	var address=localStorage.getItem("add")
	var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:15,
        center: [longitude,latitude],
		 keyboardEnable: false
    });
	var hire_type=localStorage.getItem("hire_type");
	if(hire_type==2){
		
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":"", "skip":0,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;"></label><label style="float:right; width:12px;color:#979797;"></label></div></div>'
						oLi.object=stopSet1[i].objectId
						oLi.onclick=function(){
						var objectid=this.object
						
						localStorage.setItem("f",objectid)
						location='xqpl3.html'	
					}		
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;"></label><label style="float:right; width:12px;color:#979797;"></label></div></div>'
					
					oLi.object=stopSet1[i].objectId
					
						
						oLi.onclick=function(){
							var objectid=this.object
							
						localStorage.setItem("f",objectid)
						location='xqpl4.html'	
					}	
					}
				
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					oUl.appendChild(oLi)
					var aLi=oUl.getElementsByTagName('li') 
					
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
 
});
	}
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":hire_method_id, "skip":0,"limit":3,"mode":mode}, {
				success: function(result) {
					
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
							oLi.onclick=function(){
								
							
							var objectid=this.object
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl3.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl2.html'	
								return;		
							}
							
						}
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
						
						oLi.onclick=function(){
							
							var objectid=this.object
							
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl4.html'	
								return;
							}
							
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl.html'	
								return;		
							}
						}
					}
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					oUl.appendChild(oLi)
					var aLi=oUl.getElementsByTagName('li') 
					
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
			}
	},

});	
		
			// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 100);	// <-- Simulate network congestion, remove setTimeout
}
function pullUpAction () {
	
	skip+=3
	//alert(skip)
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
	var ul=document.getElementById('uul')
	ul.innerHTML=''
	var container=document.getElementById('container')
	var paixu=document.getElementById('paixu')
	var iMg=container.getElementsByTagName('img');
	
	var oUl=document.getElementById('uul')
	var mode=localStorage.getItem("a")
	
	var  hire_method_id=localStorage.getItem("b")
	var field=localStorage.getItem("field")
	var latitude=parseFloat(localStorage.getItem("c"))
	var longitude=parseFloat(localStorage.getItem("d"))
	var address=localStorage.getItem("add")
	var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:15,
        center: [longitude,latitude],
		 keyboardEnable: false
    });
	var hire_type=localStorage.getItem("hire_type");
	if(hire_type==2){
		
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":"", "skip":skip,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;"></label><label style="float:right; width:12px;color:#979797;"></label></div></div>'
						oLi.object=stopSet1[i].objectId
						oLi.onclick=function(){
						var objectid=this.object
						
						localStorage.setItem("f",objectid)
						location='xqpl3.html'	
					}		
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;"></label><label style="float:right; width:12px;color:#979797;"></label></div></div>'
					
					oLi.object=stopSet1[i].objectId
					
						
						oLi.onclick=function(){
							var objectid=this.object
							localStorage.setItem("f",objectid)
							location='xqpl4.html'	
						}	
					}
				
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					oUl.appendChild(oLi)
					var aLi=oUl.getElementsByTagName('li') 
					
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
  
});
	}
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":hire_method_id, "skip":skip,"limit":3,"mode":mode}, {
				success: function(result) {
					
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
							oLi.onclick=function(){
								
							
							var objectid=this.object
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl3.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl2.html'	
								return;		
							}
							
						}
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
						
						oLi.onclick=function(){
						
							var objectid=this.object
							
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl4.html'	
								return;
							}
							
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl.html'	
								return;		
							}
						}
					}
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					oUl.appendChild(oLi)
					var aLi=oUl.getElementsByTagName('li') 
					
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i].location.longitude,stopSet1[i].location.latitude],
						 icon:'images/ting.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [longitude,latitude],
						 icon: new AMap.Icon({            
							image:'images/dang.png',
						 }),
						map:map
					});
			}
	},

});	
		
			// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 100);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('huadong', {
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
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
}
function pullDownAction1() {
	setTimeout(function () {
		skip2=0
		var u2=document.getElementById('uu2')
		u2.innerHTML=''
		var container=document.getElementById('container')
		var paixu=document.getElementById('paixu')
		var iMg=container.getElementsByTagName('img');
		
		var oUl=document.getElementById('uul')
		var mode=localStorage.getItem("a")
		
		var  hire_method_id=localStorage.getItem("b")
		var field=localStorage.getItem("field")
		var latitude=parseFloat(localStorage.getItem("c"))
		var longitude=parseFloat(localStorage.getItem("d"))
		var address=localStorage.getItem("add")
		var map = new AMap.Map('container', {
			resizeEnable: true,
			zoom:15,
			center: [longitude,latitude],
			 keyboardEnable: false
		});
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":hire_method_id,"hire_field":field, "sort":"price_asc","skip":0,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
							oLi.onclick=function(){
							var objectid=this.object
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl3.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl2.html'	
								return;		
							}
							
						}
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
						
						oLi.onclick=function(){
							
							var objectid=this.object
							
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl4.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl.html'			
							}
						}
					}
				
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					u2.appendChild(oLi)
					var aLi=u2.getElementsByTagName('li') 
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[0].location.longitude,stopSet1[0].location.latitude],
						 icon:'images/dang.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i+1].location.longitude,stopSet1[i+1].location.latitude],
						 icon: new AMap.Icon({            
							image:'images/ting.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
 
});		
			// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 100);	// <-- Simulate network congestion, remove setTimeout
}
function pullUpAction1 () {
	skip2+=3
	//alert(skip2)
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var u2=document.getElementById('uu2')
		u2.innerHTML=''
		var container=document.getElementById('container')
		var paixu=document.getElementById('paixu')
		var iMg=container.getElementsByTagName('img');
		
		var oUl=document.getElementById('uul')
		var mode=localStorage.getItem("a")
		
		var  hire_method_id=localStorage.getItem("b")
		var field=localStorage.getItem("field")
		var latitude=parseFloat(localStorage.getItem("c"))
		var longitude=parseFloat(localStorage.getItem("d"))
		var address=localStorage.getItem("add")
		var map = new AMap.Map('container', {
			resizeEnable: true,
			zoom:15,
			center: [longitude,latitude],
			 keyboardEnable: false
		});
		AV.Cloud.run('kongcv_location_search',  {"address":address,"location_info":{"latitude":latitude,"longitude":longitude},	
				"hire_method_id":hire_method_id,"hire_field":field, "sort":"price_asc","skip":skip2,"limit":3,"mode":mode}, {
				success: function(result) {
					var stopve1=JSON.stringify(result);//转成string字符串 输出stopve可以弹出data里面的值
					var stopSet1=eval(stopve1);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
				
				
				for(var i=0; i<stopSet1.length; i++){
					var method=stopSet1[i].hire_method
					
					for(var j=0;j<method.length;j++){
						if(method[j].objectId==hire_method_id){
							var number=j
						}	
					}
					var oLi=document.createElement('li')
					if(stopSet1[i].park_space==0){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;">已租</label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
							oLi.onclick=function(){
								
							
							var objectid=this.object
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl3.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl2.html'	
								return;		
							}
							
						}
					};
					if(stopSet1[i].park_space==1){
					oLi.innerHTML='<div class="map_con"><div class="map_ditu"><h1>'+stopSet1[i].address.split('&')[0]+'</h1><span>'+stopSet1[i].address.split('&')[1]+'</span></div><div class="map_ditu" style=" width:34%;"><label style=" width:38px;color:#c0c0c0; font-size:16px;"></label><label style=" float:right;">'+stopSet1[i].hire_price[number]+'</label><label style="float:right; width:12px;color:#979797;">¥</label></div></div>'
						oLi.object=stopSet1[i].objectId
						
						
						oLi.onclick=function(){
							
							var objectid=this.object
							
							if(mode=='curb'){
								localStorage.setItem("f",objectid)
								location='xqpl4.html'	
								return;
							}
							if(mode=='community'){
								localStorage.setItem("f",objectid)
								location='xqpl.html'			
							}
						}
					}
				
					console.log(stopSet1[i])
					oLi.object=stopSet1[i].objectId
					u2.appendChild(oLi)
					var aLi=u2.getElementsByTagName('li') 
					
					
					
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[0].location.longitude,stopSet1[0].location.latitude],
						 icon:'images/dang.png',
						map:map
					});
					
					var marker = new AMap.Marker({
						
						position: [stopSet1[i+1].location.longitude,stopSet1[i+1].location.latitude],
						 icon: new AMap.Icon({            
							image:'images/ting.png',
						 }),
						map:map
					});
					
					
				
			}
			
							
					
	 	
		
  },
 
});		
		
			// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 100);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded1() {
	pullDownEl = document.getElementById('pullDown1');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp1');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('huadong1', {
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
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction1();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction1();	// Execute custom function (ajax call?)
			}
		}
	});
	
}
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200);setTimeout(loaded1, 200) }, false);






