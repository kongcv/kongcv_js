// JavaScript Document
var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
AV.initialize(appid, appkey);

$(document).ready(function(){
		clikback();//底部点击出背景图
		
	});
$(document).ready(function(){
	$(".xqleft").click(function(){
		$(".xqleft").addClass("tjback");
		$(".qlrigt").removeClass("tjbackbar");
		
	});
	$(".qlrigt").click(function(){
		$(".qlrigt").addClass("tjbackbar");
		$(".xqleft").removeClass("tjback");
	})
	$(".abar").focus(function(){
		
		    $(".fhj").attr("src", "images/btn_hjt_pressed.png");
	});
});
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
function aaa(){
var oUl=document.getElementById('uul')
	
var objectid=localStorage.getItem("f")
var mode=localStorage.getItem("a")
var lxfs=document.getElementById('lxfs')
var lian=document.getElementById('lian')
var field=''

AV.Cloud.run('kongcv_get_park_info',  {"park_id":objectid, "mode":mode}, {
			success: function(result) {
			
				console.log(result)
				if(result.user){
					var user=JSON.parse(result.user)
					console.log(user)
					var mobilePhoneNumber=user.mobilePhoneNumber
				}
				
				var hire_id=''
				var qian=0
				var number = 0;
    			var days = 0;
				var nolet=[]
				var zongjia=document.getElementById('zongjia')
				var dizhi=document.getElementById('dizhi')
				var start=document.getElementById('start')
				var end=document.getElementById('end')
				var height=document.getElementById('height')
				var width=document.getElementById('width')
				var no_hire=document.getElementById('no_hire');
				var normal=document.getElementById('normal');
				var struct =document.getElementById('struct ');
				var card=document.getElementById('card');
				var descripe=document.getElementById('descripe');
				var tail_num=document.getElementById('tail_num')
				var s=result.hire_start /*转换时间*/
				var e=result.hire_end
				s = new Date(s);
				e=new Date(e)
				
				tail_num.innerHTML=result.tail_num||''
				dizhi.innerHTML=result.address.replace('&',' ');
				start.innerHTML=s.getFullYear()+'年'+(s.getMonth()+1)+'月'+s.getDate()+'日';
				end.innerHTML=e.getFullYear()+'年'+(e.getMonth()+1)+'月'+e.getDate()+'日';
				if(start.innerHTML=='NaN年NaN月NaN日'){
					start.innerHTML=''	
				};
				if(end.innerHTML=='NaN年NaN月NaN日'){
					end.innerHTML=''	
				}
				
				
				
				height.innerHTML=result.park_height||'';
				width.innerHTML=result.park_area||'';
				if(result.no_hire){
					no_hire.innerHTML=result.no_hire	
					for(var i=0;i<result.no_hire.length;i++){
						if(result.no_hire[i]=='一'){
							nolet.push(1)	
						}
						if(result.no_hire[i]=='二'){
							nolet.push(2)	
						}	
						if(result.no_hire[i]=='三'){
							nolet.push(3)
						}	
						if(result.no_hire[i]=='四'){
							nolet.push(4)	
						}	
						if(result.no_hire[i]=='五'){
							nolet.push(5)	
						}	
						if(result.no_hire[i]=='六'){
							nolet.push(6)	
						}	
						if(result.no_hire[i]=='七'){
							nolet.push(7)
						}		
					}
					
				}else{
					no_hire.innerHTML=''	
				};
				if(result.normal==true){
					normal.innerHTML="是";	
				}else{
					normal.innerHTML="否"	
				};
				if(result.park_struct==0){
					struct.innerHTML="地上" 	
				}else{
					struct.innerHTML="地下"	
				};
				card.innerHTML+=result.gate_card||'';
				
				descripe.innerHTML+=result.park_description||''	
				
				
				var hire_method=JSON.parse(result.hire_method)
				
				for(var i=0;i<hire_method.length;i++){
					console.log(hire_method)
					var oLi=document.createElement('li')
					
					oLi.innerHTML='<div class="li_div"><label class="czlx labelcol">'+hire_method[i].method+'</label><label class="czlx labelcol" style="text-align:center;">'+result.hire_time[i]+'</label><label class="czlx qianshu">'+result.hire_price[i]+'<h5 class="xza" href="#"></h5></label></div>'
					oLi.hire_id=hire_method[i].objectId;
					oLi.price=result.hire_price[i]
					oLi.method=hire_method[i].method
					oLi.field=hire_method[i].field
					var oUL=document.getElementById('ul')
					oUL.appendChild(oLi)
					oLi.onclick=function(){
						 hire_id=this.hire_id /*车位出租方式id*/	
						 field=this.field	
						var price=this.price
						
						if(this.field=="all_time_day"||this.field=="interval_light_day"||this.field=="interval_night_day"){
							if(hire_s.value==''||hire_s.value=='  年 月 日'){
							alert('起始时间不能为空')
							return;	
							};
							if(hire_e.value==''||hire_e.value==' 年 月 日'){
								alert('结束时间不能为空')	
								return;	
							}
							var hs=new Date(hire_s.value)
							var he=new Date(hire_e.value)
							var start_day = hs.getDay();
							number = 0;
							days = 0;
							days = (he - hs) / 86400000 + 1;
							
							
							var qq=Number(price.split('/')[0])
							
							qian=qq*days
							zongjia.innerHTML=qian	
						}
						
						if(this.field=="all_time_month"||this.field=="interval_night_month"||this.field=="interval_light_month"){
							if(hire_s.value==''||hire_s.value=='  年 月 日'){
							alert('起始时间不能为空')
							return;	
							};
							if(hire_e.value==''||hire_e.value==' 年 月 日'){
								alert('结束时间不能为空')	
								return;	
							}
							var hs=new Date(hire_s.value)
							var he=new Date(hire_e.value)
							var start_day = hs.getDay();
							number = 0;
							days = 0;
							days = (he - hs) / 86400000 + 1;
							if(days<30){
								alert('租用时间必须大于30天')	
								return;
							}
							var qq=Number(price.split('/')[0])
							
							qian=qq*days
							zongjia.innerHTML=qian	
						}
						if(this.field=="hour_meter"){
							var qq=Number(price.split('/')[0])
							qian=qq/4
							zongjia.innerHTML=qian		
						}
						
						
					}
					
					
					
				}
				
				
				
				var a=oUL.getElementsByTagName('h5')
				for(var j=0;j<a.length;j++){
					a[j].onclick=function(){
						for(var j=0;j<a.length;j++){
							a[j].className='xza'	
						}
						this.className='bian'
					}	
				}
				var phone=localStorage.getItem("phone")
				var  user_id=localStorage.getItem("e")/*use-id*/
				var address=dizhi.innerHTML;
				
				
				//alert(hire_end)
			
				//alert(objectid) /*车位id*/
				
				tijiao.onclick=function(){
					
					if(!result.user){
						alert('此车位没有用户,无法租用')	
						return
					}
					if(user.device_token){
						var device_token =user.device_token;	
					}else{
						var device_token ="web"	
					};
					if(user.device_type){
						var device_type =user.device_type;	
					}else{
						var device_type ="web"	
					}
					
					var hire_s=document.getElementById('hire_s')
					var hire_e=document.getElementById('hire_e')
					
					hire_start=hire_s.value+' '+'00:00:00'
					hire_end=hire_e.value+' '+'23:59:00';
					
					if(user_id==null){
						alert('用户未登录')
						return	
					};
					
					AV.Cloud.run('kongcv_jpush_message_p2p',  {"mobilePhoneNumber":mobilePhoneNumber, "push_type":"verify_request", "device_token":device_token, "device_type":device_type, "user_id":user_id,"extras":{"park_id":objectid,"mode":mode,"address":address, "hire_method_id":hire_id,"hire_method_field":field,"hire_start":hire_start, "hire_end":hire_end,"own_device_token":"web","own_device_type":"web","own_mobile":phone,"push_type":"verify_request","price":qian}}, {
						success: function(data) {
							var data=JSON.parse(data)
							if(data.state=='error'){
								alert(data.error)	
							}else{
								alert('成功')	
							}
						}
					});
						
				};
				
				
			  },
			 
});	
}
function bbb(){
	var oUl2=document.getElementById('ul2')
		var  user_id=localStorage.getItem("e")
		var objectid=localStorage.getItem("f")
		var mode=localStorage.getItem("a")
		//alert(user_id)
//		alert(objectid)
//		alert(mode)
		AV.Cloud.run('kongcv_get_comment',  {"park_id" : objectid, "skip":0, "limit":3, "mode" :mode}, {
  			success: function(data) {
				console.log(data)
				for(var i=0;i<data.length;i++){
					var date=new Date(data[i].createdAt)
					var year=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
					if(data[i].user){
							var user=JSON.parse(data[i].user)
							var name=user.username	
							if(user.image){
								var url=user.image.url	
							
							}else{
								var url='images/Bitmap Copy.png'	
							}
						}else{
							var name=' '
							var url='images/Bitmap Copy.png'	
						};
					var grade=Math.floor(data[i].grade);
					var comment=data[i].comment
					//alert(data[i].comment)
//					alert(data[i].grade)
					var oLi=document.createElement('li');
					oLi.innerHTML='<div class="div_mar clearfix"><div class="condiv clearfix"><img class="tximg" src="'+url+'"/><h1 class="tibh">'+name+'</h1><span class="tim_span clearfix">'+year+'</span><div class="div_info clearfix"><img class="xixi" src="images/s'+grade+'.png"/></div></div><div class="con_span"><span class="conspan">'+comment+'</span></div></div>'
					oUl2.appendChild(oLi)
				}
				
			}
		})	
	}
window.onload=function(){
	$('.datetimepicker').datetimepicker({
		lang:'ch',
		timepicker:false,
		format:'Y-m-d',
		formatDate:'Y-m-d'
	});
	var tijiao=document.getElementById('tijiao')
	var fabu=document.getElementById('fabu');
	var wode=document.getElementById('wode');
	var  user_id=localStorage.getItem("e")
	var pl=document.getElementById('pl')
	var pld=document.getElementById('pld')
	var xq=document.getElementById('xq')
	var xqd=document.getElementById('xqd')
	pl.onclick=function(){
		pld.style.display='block'	
		xqd.style.display='none'	
	}
	xq.onclick=function(){
		pld.style.display='none'
		xqd.style.display='block'	
			
	}
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
	aaa()
	bbb()

}
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var skip=0
	
function pullDownAction () {
	var oUl2=document.getElementById('ul2')
	var objectid=localStorage.getItem("f")
	var mode=localStorage.getItem("a")
	setTimeout(function () {
		oUl2.innerHTML='<li style="border-top:none; height:auto;"><div class="div_mar clearfix"><span class="pl">评论</span></div></li>'
		skip=0
		//alert('下拉')	
		AV.Cloud.run('kongcv_get_comment',  {"park_id" : objectid, "skip":0, "limit":3, "mode" :mode}, {
  			success: function(data) {
				console.log(data)
				for(var i=0;i<data.length;i++){
					var date=new Date(data[i].createdAt)
					var year=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
					if(data[i].user){
							var user=JSON.parse(data[i].user)
							var name=user.username	
							if(user.image){
								var url=user.image.url	
							
							}else{
								var url='images/Bitmap Copy.png'	
							}
						}else{
							var name=' '
							var url='images/Bitmap Copy.png'	
						};
					var grade=Math.floor(data[i].grade);
					var comment=data[i].comment
					//alert(data[i].comment)
//					alert(data[i].grade)
					var oLi=document.createElement('li');
					oLi.innerHTML='<div class="div_mar clearfix"><div class="condiv clearfix"><img class="tximg" src="'+url+'"/><h1 class="tibh">'+name+'</h1><span class="tim_span clearfix">'+year+'</span><div class="div_info clearfix"><img class="xixi" src="images/s'+grade+'.png"/></div></div><div class="con_span"><span class="conspan">'+comment+'</span></div></div>'
					oUl2.appendChild(oLi)
				}
				
			}
		})	
	}, 100);
}

function pullUpAction () {
	var oUl2=document.getElementById('ul2')
	var objectid=localStorage.getItem("f")
	var mode=localStorage.getItem("a")
	setTimeout(function () {
		skip+=3
		//alert(skip)
		oUl2.innerHTML='<li style="border-top:none; height:auto;"><div class="div_mar clearfix"><span class="pl">评论</span></div></li>'
		AV.Cloud.run('kongcv_get_comment',  {"park_id" : objectid, "skip":skip, "limit":3, "mode" :mode}, {
  			success: function(data) {
				console.log(data)
				for(var i=0;i<data.length;i++){
					var date=new Date(data[i].createdAt)
					var year=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
					var user=JSON.parse(data[i].user)
					if(data[i].user){
							var user=JSON.parse(data[i].user)
							var name=user.username	
							if(user.image){
								var url=user.image.url	
							
							}else{
								var url='images/Bitmap Copy.png'	
							}
						}else{
							var name=' '
							var url='images/Bitmap Copy.png'	
						};
					var grade=Math.floor(data[i].grade);
					var comment=data[i].comment
					//alert(data[i].comment)
//					alert(data[i].grade)
					var oLi=document.createElement('li');
					oLi.innerHTML='<div class="div_mar clearfix"><div class="condiv clearfix"><img class="tximg" src="'+url+'"/><h1 class="tibh">'+name+'</h1><span class="tim_span clearfix">'+year+'</span><div class="div_info clearfix"><img class="xixi" src="images/s'+grade+'.png"/></div></div><div class="con_span"><span class="conspan">'+comment+'</span></div></div>'
					oUl2.appendChild(oLi)
				}
				
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