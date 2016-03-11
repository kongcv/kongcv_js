// JavaScript Document
//底部点击出背景图片
	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
	AV.initialize(appid, appkey);
	

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
function bu(iNom){
		if(iNom<10){
			return '0'+iNom	
		}else{
			return iNom	
		}	
	}
window.onload=function(){
	var parkid=''
	$(".zydd1").click(function(){
		$(".zydd1").addClass("showxss");
		$(".zydd2").removeClass("showxss");
		$(".ddglsq").show();
		$(".ddglsq1").hide();
	});
	$(".zydd2").click(function(){
		$(".zydd2").addClass("showxss");
		$(".zydd1").removeClass("showxss");
		$(".ddglsq1").show();
		$(".ddglsq").hide();
	});
	$(".sqa1").click(function(){
		$(".sqa1").addClass("borbom");
		$(".sqa2").removeClass("borbom");
		$(".ddgb_div").show();
		$(".ddgb_div2").hide();
	});
	$(".sqa2").click(function(){
		$(".sqa2").addClass("borbom");
		$(".sqa1").removeClass("borbom");
		$(".ddgb_div2").show();
		$(".ddgb_div").hide();
	});
	$(".sqa3").click(function(){
		$(".sqa3").addClass("borbom1");
		$(".sqa4").removeClass("borbom1");
		$(".ddgb_div3").show();
		$(".ddgb_div4").hide();
	});
	$(".sqa4").click(function(){
		$(".sqa4").addClass("borbom1");
		$(".sqa3").removeClass("borbom1");
		$(".ddgb_div4").show();
		$(".ddgb_div3").hide();
	});
	clikback();
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4')
	var shequ=document.getElementById('shequ')
	var shequ2=document.getElementById('shequ2')
	AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"customer","trade_state":3, "skip":0, "limit":2,"mode":"curb"}, {
			success: function(result) {
				console.log(result)
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					var park_curb=JSON.parse(result[i].park_curb)
					var address=park_curb.address.split('&')[0];
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  
					oLi.objectId=result[i].objectId
					var ddgl=JSON.stringify(result[i]);
					oLi.ddgl=ddgl
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg2"><div class="ddcor2"><img class="indin2" src="images/icon_dingwei.png"/><h1 class="h1_ddg2">'+address+'</h1><h2 class="h2_ddg2">未完成</h2></div></div><div class="div_zydd2"><div class="div_zyddbar2"><span class="zdddle2">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle2">结束&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle2">订单号：</span><span class="zdddwid2">'+objectid+'</span><span class="zdddle2">价格&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq2">￥'+jiage+'</span></div></div>'
						oLi.onclick=function(){
							var ddgl=this.ddgl
							//alert(ddgl)
							 localStorage.setItem("ddgl",ddgl)
							localStorage.setItem("modes",'curb');
							
							location='iosappxz.html'
						}		
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddg2"><div class="ddcor2"><img class="indin2" src="images/icon_dingwei.png"/><h1 class="h1_ddg2">'+address+'</h1><h2 class="h2_ddgbys2">已完成</h2></div></div><div class="div_zydd2"><div class="div_zyddbar2"><span class="zdddle2">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle2">结束&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle2">订单号：</span><span class="zdddwid2">'+objectid+'</span><span class="zdddle2">价格&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq2">￥'+jiage+'</span></div></div>'		
					}
					
					ul2.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});	
		shequ.onclick=function(){
			ul.innerHTML=''
			AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"customer","trade_state":3, "skip":0, "limit":2,"mode":"community"}, {
			success: function(result) {
				console.log(result)
				
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					var park_community=JSON.parse(result[i].park_community)
					console.log(park_community)
					var address=park_community.address.split('&')[0];
					//alert(address)
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price
					var ddgl=JSON.stringify(result[i]);
					oLi.ddgl=ddgl
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddgl"><div class="ddcor"><img class="indin" src="images/icon_dingwei.png"/><h1 class="h1_ddgl">'+address+'</h1><h2 class="h2_ddgl">未完成</h2></div></div><div class="div_zydd"><div class="div_zyddbar"><span class="zdddle">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle">订单号：</span><span class="zdddwid">'+objectid+'</span><span class="zdddle">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq">￥'+jiage+'</span></div></div>'
						oLi.onclick=function(){
						var ddgl=this.ddgl
						
						localStorage.setItem("ddgl",ddgl)
						localStorage.setItem("modes",'community');
						
						location='iosappxz.html'
					}	
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddgl"><div class="ddcor"><img class="indin" src="images/icon_dingwei.png"/><h1 class="h1_ddgl">'+address+'</h1><h2 class="h2_ddgbys">已完成</h2></div></div><div class="div_zydd"><div class="div_zyddbar"><span class="zdddle">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle">订单号：</span><span class="zdddwid">'+objectid+'</span><span class="zdddle">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq">￥'+jiage+'</span></div></div>'		
					}
					
					ul.appendChild(oLi)	
			
					
				}
				
		},
		error: function(error) {
		  
		}
		});
		};
		hirer.onclick=function(){
			ul4.innerHTML=''
			AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"hirer","trade_state":3, "skip":0, "limit":2,"mode":"curb"}, {
			success: function(result) {
				console.log(result)
				
			
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					
					var user=JSON.parse(result[i].user)
					
					
					number=user.mobilePhoneNumber;
					
						
					if(user.image){
						var img=user.image.url	
					}else{
						var img='images/Bitmap Copy.png'	
					};
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  	
					oLi.objectId=result[i].objectId
					if(result[i].trade_state==1){
					oLi.innerHTML='<div class="div_ddg4"><div class="ddcor4"><img class="indin4" src="'+img+'"/><h1 class="h1_ddg4">'+number+'</h1><h2 class="h2_ddgbys4">已完成</h2></div></div><div class="div_zydd4"><div class="div_zyddbar4"><span class="zdddle4">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle4">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle4">订单号：</span><span class="zdddwid4">'+objectid+'</span><span class="zdddle4">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq4">￥'+jiage+'</span></div><a class="ddh4" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh4" src="images/dh.png"/></a></div>'	
					};
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg4"><div class="ddcor4"><img class="indin4" src="'+img+'"/><h1 class="h1_ddg4">'+number+'</h1><h2 class="h2_ddg4">未完成</h2></div></div><div class="div_zydd4"><div class="div_zyddbar4"><span class="zdddle4">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle4">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle4">订单号：</span><span class="zdddwid4">'+objectid+'</span><span class="zdddle4">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq4">￥'+jiage+'</span></div><a class="ddh4" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh4" src="images/dh.png"/></a></div>'		
					}
					
					ul4.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});			
		};
		shequ2.onclick=function(){
			ul3.innerHTML=''
			AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"hirer","trade_state":3, "skip":0, "limit":2,"mode":"community"}, {
			success: function(result) {
				console.log(result)
				
			
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					
					var user=JSON.parse(result[i].user)
			
					
					number=user.mobilePhoneNumber;
					
						
					if(user.image){
						var img=user.image.url	
					}else{
						var img='images/Bitmap Copy.png'	
					};
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  	
					oLi.objectId=result[i].objectId
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg3"><div class="ddcor3"><img class="indin3" src="'+img+'"/><h1 class="h1_ddg3">'+number+'</h1><h2 class="h2_ddg3">未完成</h2></div></div><div class="div_zydd3" ><div class="div_zyddbar3"><span class="zdddle3">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle3">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle3">订单号：</span><span class="zdddwid3">'+objectid+'</span><span class="zdddle3">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq3">￥'+jiage+'</span></div><a class="ddh" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh" src="images/dh.png"/></a></div>'		
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddg3"><div class="ddcor3"><img class="indin3" src="'+img+'"/><h1 class="h1_ddg3">'+number+'</h1><h2 class="h2_ddgbys3">已完成</h2></div></div><div class="div_zydd3" ><div class="div_zyddbar3"><span class="zdddle3">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle3">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle3">订单号：</span><span class="zdddwid3">'+objectid+'</span><span class="zdddle3">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq3">￥'+jiage+'</span></div><a class="ddh" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh" src="images/dh.png"/></a></div>'		
					}
					
					ul3.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});		
		}
	
		
	
};
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var skip=0
	var skip1=0
	var skip2=0
	var skip3=0
function pullDownAction () {
	setTimeout(function () {
		//alert('下拉1')
		skip=0
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"customer","trade_state":3, "skip":0, "limit":2,"mode":"community"}, {
			success: function(result) {
				console.log(result)
				
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					var park_community=JSON.parse(result[i].park_community)
					console.log(park_community)
					var address=park_community.address.split('&')[0];
					//alert(address)
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price
					var ddgl=JSON.stringify(result[i]);
					oLi.ddgl=ddgl
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddgl"><div class="ddcor"><img class="indin" src="images/icon_dingwei.png"/><h1 class="h1_ddgl">'+address+'</h1><h2 class="h2_ddgl">未完成</h2></div></div><div class="div_zydd"><div class="div_zyddbar"><span class="zdddle">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle">订单号：</span><span class="zdddwid">'+objectid+'</span><span class="zdddle">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq">￥'+jiage+'</span></div></div>'
						oLi.onclick=function(){
						var ddgl=this.ddgl
						
						localStorage.setItem("ddgl",ddgl)
						localStorage.setItem("modes",'community');
						
						location='iosappxz.html'
					}	
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddgl"><div class="ddcor"><img class="indin" src="images/icon_dingwei.png"/><h1 class="h1_ddgl">'+address+'</h1><h2 class="h2_ddgbys">已完成</h2></div></div><div class="div_zydd"><div class="div_zyddbar"><span class="zdddle">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle">订单号：</span><span class="zdddwid">'+objectid+'</span><span class="zdddle">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq">￥'+jiage+'</span></div></div>'		
					}
					
					ul.appendChild(oLi)	
			
					
				}
				
		},
		});
	},100)
		
}

function pullUpAction () {
	setTimeout(function () {
		skip+=2
		//alert(skip)
		//alert('上拉1')
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"customer","trade_state":3, "skip":skip, "limit":2,"mode":"community"}, {
			success: function(result) {
				console.log(result)
				
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					var park_community=JSON.parse(result[i].park_community)
					console.log(park_community)
					var address=park_community.address.split('&')[0];
					//alert(address)
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price
					var ddgl=JSON.stringify(result[i]);
					oLi.ddgl=ddgl
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddgl"><div class="ddcor"><img class="indin" src="images/icon_dingwei.png"/><h1 class="h1_ddgl">'+address+'</h1><h2 class="h2_ddgl">未完成</h2></div></div><div class="div_zydd"><div class="div_zyddbar"><span class="zdddle">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle">订单号：</span><span class="zdddwid">'+objectid+'</span><span class="zdddle">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq">￥'+jiage+'</span></div></div>'
						oLi.onclick=function(){
						var ddgl=this.ddgl
						
						localStorage.setItem("ddgl",ddgl)
						localStorage.setItem("modes",'community');
						
						location='iosappxz.html'
					}	
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddgl"><div class="ddcor"><img class="indin" src="images/icon_dingwei.png"/><h1 class="h1_ddgl">'+address+'</h1><h2 class="h2_ddgbys">已完成</h2></div></div><div class="div_zydd"><div class="div_zyddbar"><span class="zdddle">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle">订单号：</span><span class="zdddwid">'+objectid+'</span><span class="zdddle">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq">￥'+jiage+'</span></div></div>'		
					}
					
					ul.appendChild(oLi)	
			
					
				}
				
		},
		error: function(error) {
		  
		}
		});	
	},100)
			
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




	
function pullDownAction1 () {
	setTimeout(function () {
		//alert('上拉2')
		skip1=0
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul2.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"customer","trade_state":3, "skip":0, "limit":2,"mode":"curb"}, {
			success: function(result) {
				console.log(result)
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					var park_curb=JSON.parse(result[i].park_curb)
					var address=park_curb.address.split('&')[0];
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  
					oLi.objectId=result[i].objectId
					var ddgl=JSON.stringify(result[i]);
					oLi.ddgl=ddgl
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg2"><div class="ddcor2"><img class="indin2" src="images/icon_dingwei.png"/><h1 class="h1_ddg2">'+address+'</h1><h2 class="h2_ddg2">未完成</h2></div></div><div class="div_zydd2"><div class="div_zyddbar2"><span class="zdddle2">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle2">结束&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle2">订单号：</span><span class="zdddwid2">'+objectid+'</span><span class="zdddle2">价格&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq2">￥'+jiage+'</span></div></div>'
						oLi.onclick=function(){
							var ddgl=this.ddgl
							//alert(ddgl)
							 localStorage.setItem("ddgl",ddgl)
							localStorage.setItem("modes",'curb');
							
							location='iosappxz.html'
						}		
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddg2"><div class="ddcor2"><img class="indin2" src="images/icon_dingwei.png"/><h1 class="h1_ddg2">'+address+'</h1><h2 class="h2_ddgbys2">已完成</h2></div></div><div class="div_zydd2"><div class="div_zyddbar2"><span class="zdddle2">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle2">结束&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle2">订单号：</span><span class="zdddwid2">'+objectid+'</span><span class="zdddle2">价格&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq2">￥'+jiage+'</span></div></div>'		
					}
					
					ul2.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});		
	},100)
		
}

function pullUpAction1() {
	setTimeout(function () {
		skip1+=2
		//alert(skip1)
		//alert('上拉2')
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul2.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"customer","trade_state":3, "skip":skip1, "limit":2,"mode":"curb"}, {
			success: function(result) {
				console.log(result)
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					var park_curb=JSON.parse(result[i].park_curb)
					var address=park_curb.address.split('&')[0];
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  
					oLi.objectId=result[i].objectId
					var ddgl=JSON.stringify(result[i]);
					oLi.ddgl=ddgl
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg2"><div class="ddcor2"><img class="indin2" src="images/icon_dingwei.png"/><h1 class="h1_ddg2">'+address+'</h1><h2 class="h2_ddg2">未完成</h2></div></div><div class="div_zydd2"><div class="div_zyddbar2"><span class="zdddle2">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle2">结束&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle2">订单号：</span><span class="zdddwid2">'+objectid+'</span><span class="zdddle2">价格&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq2">￥'+jiage+'</span></div></div>'
						oLi.onclick=function(){
							var ddgl=this.ddgl
							//alert(ddgl)
							 localStorage.setItem("ddgl",ddgl)
							localStorage.setItem("modes",'curb');
							
							location='iosappxz.html'
						}		
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddg2"><div class="ddcor2"><img class="indin2" src="images/icon_dingwei.png"/><h1 class="h1_ddg2">'+address+'</h1><h2 class="h2_ddgbys2">已完成</h2></div></div><div class="div_zydd2"><div class="div_zyddbar2"><span class="zdddle2">起止&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle2">结束&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddco2">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle2">订单号：</span><span class="zdddwid2">'+objectid+'</span><span class="zdddle2">价格&nbsp;&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq2">￥'+jiage+'</span></div></div>'		
					}
					
					ul2.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});		
	},100)
			
}

function loaded1() {
	pullDownEl = document.getElementById('pullDown1');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp1');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper1', {
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
							
				pullDownAction1();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction1();	// Execute custom function (ajax call?)
			}
		}
	});
	

}
function pullDownAction2 () {
	setTimeout(function () {
	//alert('上拉3')
	skip2=0
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul3.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"hirer","trade_state":3, "skip":0, "limit":2,"mode":"community"}, {
			success: function(result) {
				console.log(result)
				
			
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					
					var user=JSON.parse(result[i].user)
			
					
					number=user.mobilePhoneNumber;
					
						
					if(user.image){
						var img=user.image.url	
					}else{
						var img='images/Bitmap Copy.png'	
					};
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  	
					oLi.objectId=result[i].objectId
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg3"><div class="ddcor3"><img class="indin3" src="'+img+'"/><h1 class="h1_ddg3">'+number+'</h1><h2 class="h2_ddg3">未完成</h2></div></div><div class="div_zydd3" ><div class="div_zyddbar3"><span class="zdddle3">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle3">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle3">订单号：</span><span class="zdddwid3">'+objectid+'</span><span class="zdddle3">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq3">￥'+jiage+'</span></div><a class="ddh" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh" src="images/dh.png"/></a></div>'		
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddg3"><div class="ddcor3"><img class="indin3" src="'+img+'"/><h1 class="h1_ddg3">'+number+'</h1><h2 class="h2_ddgbys3">已完成</h2></div></div><div class="div_zydd3" ><div class="div_zyddbar3"><span class="zdddle3">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle3">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle3">订单号：</span><span class="zdddwid3">'+objectid+'</span><span class="zdddle3">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq3">￥'+jiage+'</span></div><a class="ddh" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh" src="images/dh.png"/></a></div>'		
					}
					
					ul3.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});		
	},100)
		
}

function pullUpAction2() {
	setTimeout(function () {
		skip2+=2
		//alert(skip2)
		//alert('下拉3')
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul3.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"hirer","trade_state":3, "skip":skip2, "limit":2,"mode":"community"}, {
			success: function(result) {
				console.log(result)
				
			
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					
					var user=JSON.parse(result[i].user)
			
					
					number=user.mobilePhoneNumber;
					
						
					if(user.image){
						var img=user.image.url	
					}else{
						var img='images/Bitmap Copy.png'	
					};
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  	
					oLi.objectId=result[i].objectId
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg3"><div class="ddcor3"><img class="indin3" src="'+img+'"/><h1 class="h1_ddg3">'+number+'</h1><h2 class="h2_ddg3">未完成</h2></div></div><div class="div_zydd3" ><div class="div_zyddbar3"><span class="zdddle3">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle3">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle3">订单号：</span><span class="zdddwid3">'+objectid+'</span><span class="zdddle3">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq3">￥'+jiage+'</span></div><a class="ddh" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh" src="images/dh.png"/></a></div>'		
					};
					if(result[i].trade_state==1){
						oLi.innerHTML='<div class="div_ddg3"><div class="ddcor3"><img class="indin3" src="'+img+'"/><h1 class="h1_ddg3">'+number+'</h1><h2 class="h2_ddgbys3">已完成</h2></div></div><div class="div_zydd3" ><div class="div_zyddbar3"><span class="zdddle3">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle3">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco3">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle3">订单号：</span><span class="zdddwid3">'+objectid+'</span><span class="zdddle3">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq3">￥'+jiage+'</span></div><a class="ddh" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh" src="images/dh.png"/></a></div>'		
					}
					
					ul3.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});		
	},100)
			
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
function pullDownAction3 () {
	setTimeout(function () {
	//alert('上拉4')
	skip3=0
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul4.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"hirer","trade_state":3, "skip":0, "limit":2,"mode":"curb"}, {
			success: function(result) {
				console.log(result)
				
			
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					
					var user=JSON.parse(result[i].user)
					
					
					number=user.mobilePhoneNumber;
					
						
					if(user.image){
						var img=user.image.url	
					}else{
						var img='images/Bitmap Copy.png'	
					};
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  	
					oLi.objectId=result[i].objectId
					if(result[i].trade_state==1){
					oLi.innerHTML='<div class="div_ddg4"><div class="ddcor4"><img class="indin4" src="'+img+'"/><h1 class="h1_ddg4">'+number+'</h1><h2 class="h2_ddgbys4">已完成</h2></div></div><div class="div_zydd4"><div class="div_zyddbar4"><span class="zdddle4">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle4">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle4">订单号：</span><span class="zdddwid4">'+objectid+'</span><span class="zdddle4">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq4">￥'+jiage+'</span></div><a class="ddh4" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh4" src="images/dh.png"/></a></div>'	
					};
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg4"><div class="ddcor4"><img class="indin4" src="'+img+'"/><h1 class="h1_ddg4">'+number+'</h1><h2 class="h2_ddg4">未完成</h2></div></div><div class="div_zydd4"><div class="div_zyddbar4"><span class="zdddle4">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle4">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle4">订单号：</span><span class="zdddwid4">'+objectid+'</span><span class="zdddle4">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq4">￥'+jiage+'</span></div><a class="ddh4" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh4" src="images/dh.png"/></a></div>'		
					}
					
					ul4.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});			
	},100)
		
}

function pullUpAction3() {
	setTimeout(function () {
		skip3+=2
		//alert(skip3)
		//alert('下拉4')
	var ul=document.getElementById('ul');
	var ul2=document.getElementById('ul2');
	var ul3=document.getElementById('ul3')
	var user_id=localStorage.getItem("e");
	var curp=document.getElementById('curp');
	var curp1=document.getElementById('curp1');
	var hirer=document.getElementById('hirer');
	var ul4=document.getElementById('ul4');
	ul4.innerHTML=''
		AV.Cloud.run('kongcv_get_trade_list',    {"user_id":user_id, "role":"hirer","trade_state":3, "skip":skip3, "limit":2,"mode":"curb"}, {
			success: function(result) {
				console.log(result)
				
			
				
				for(var i=0;i<result.length;i++){
					var oLi=document.createElement('li');
					
					var user=JSON.parse(result[i].user)
					
					
					number=user.mobilePhoneNumber;
					
						
					if(user.image){
						var img=user.image.url	
					}else{
						var img='images/Bitmap Copy.png'	
					};
					if(result[i].hire_start){
						var start=new Date(result[i].hire_start);
						var year=start.getFullYear()+'-'+bu(start.getMonth()+1)+'-'+bu(start.getDate());
						var mon=bu(start.getHours())+':'+bu(start.getMinutes())+':'+bu(start.getSeconds());	
					}else{
						var year=''
						var mon='';	
					}
					
					
					if(result[i].hire_end){
						var end=new Date(result[i].hire_end);
						var year1=end.getFullYear()+'-'+bu(end.getMonth()+1)+'-'+bu(end.getDate());
						var mon1=bu(end.getHours())+':'+bu(end.getMinutes())+':'+bu(end.getSeconds());
					}else{
						var year1=''
						var mon1=''
					}
					var objectid=result[i].objectId/*订单号*/
					var jiage=result[i].price  	
					oLi.objectId=result[i].objectId
					if(result[i].trade_state==1){
					oLi.innerHTML='<div class="div_ddg4"><div class="ddcor4"><img class="indin4" src="'+img+'"/><h1 class="h1_ddg4">'+number+'</h1><h2 class="h2_ddgbys4">已完成</h2></div></div><div class="div_zydd4"><div class="div_zyddbar4"><span class="zdddle4">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle4">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle4">订单号：</span><span class="zdddwid4">'+objectid+'</span><span class="zdddle4">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq4">￥'+jiage+'</span></div><a class="ddh4" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh4" style=" width:39px; height:36px; margin-top:18px; margin-left:8px;" src="images/dh.png"/></a></div>'	
					};
					if(result[i].trade_state==0){
						oLi.innerHTML='<div class="div_ddg4"><div class="ddcor4"><img class="indin4" src="'+img+'"/><h1 class="h1_ddg4">'+number+'</h1><h2 class="h2_ddg4">未完成</h2></div></div><div class="div_zydd4"><div class="div_zyddbar4"><span class="zdddle4">起止&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon+'</span><span class="zdddle4">结束&nbsp;&nbsp;&nbsp;：</span><span class="zdddco4">'+year1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mon1+'</span><span class="zdddle4">订单号：</span><span class="zdddwid4">'+objectid+'</span><span class="zdddle4">价格&nbsp;&nbsp;&nbsp;：</span><span class="zdddqq4">￥'+jiage+'</span></div><a class="ddh4" href="tel:'+number+'" style="float:right; width:17%; height:100px;"><img class="dh4" style=" width:39px; height:36px; margin-top:18px; margin-left:8px;" src="images/dh.png"/></a></div>'		
					}
					
					ul4.appendChild(oLi)	
				}
				
		},
		error: function(error) {
		  
		}
		});			
	},100)
			
}

function loaded3() {
	pullDownEl = document.getElementById('pullDown3');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp3');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper3', {
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
							
				pullDownAction3();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction3();	// Execute custom function (ajax call?)
			}
		}
	});
	

}

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200);setTimeout(loaded1, 200); setTimeout(loaded2, 200);setTimeout(loaded3, 200)}, false);


