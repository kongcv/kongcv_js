
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
var zongjia=document.getElementById('zongjia')
var objectid=localStorage.getItem("message_id")
var extras=localStorage.getItem("extras")
var extras=JSON.parse(extras)
console.log(extras)
var mode=extras.mode
if(extras.hire_method_id=="hour_meter"){
	zongjia.innerHTML=extras.price/4	
}else{
	zongjia.innerHTML=extras.price	
}


var objectid=extras.park_id
var lxfs=document.getElementById('lxfs')
var lian=document.getElementById('lian')
var field=''
AV.Cloud.run('kongcv_get_park_info',  {"park_id":objectid, "mode":mode}, {
			success: function(result) {
			
				console.log(result)
				user=JSON.parse(result.user)
				console.log(user)
				var mobilePhoneNumber=user.mobilePhoneNumber
				
				lxfs.innerHTML=mobilePhoneNumber
				lian.href+=''+mobilePhoneNumber+''
				
				var hire_id=''
				var qian=0
				var dizhi=document.getElementById('dizhi')
				var start=document.getElementById('start')
				var end=document.getElementById('end')
				
				var descripe=document.getElementById('descripe');
				
				
				var s=result.hire_start /*转换时间*/
				var e=result.hire_end
				
				s = new Date(s);
				e=new Date(e)
				
				
				dizhi.innerHTML=result.address.replace('&',' ');
				start.innerHTML=s.getFullYear()+'年'+(s.getMonth()+1)+'月'+s.getDate()+'日';
				end.innerHTML=e.getFullYear()+'年'+(e.getMonth()+1)+'月'+e.getDate()+'日';
				if(start.innerHTML=='NaN年NaN月NaN日'){
					start.innerHTML=''	
				};
				if(end.innerHTML=='NaN年NaN月NaN日'){
					end.innerHTML=''	
				}
			
				if(result.park_description){
					descripe.innerHTML+=result.park_description	
				};
				
				var hire_method=JSON.parse(result.hire_method)
				
				for(var i=0;i<hire_method.length;i++){
					console.log(hire_method)
					var oLi=document.createElement('li')
					
					oLi.innerHTML='<div class="li_div"><label class="czlx labelcol">'+hire_method[i].method+'</label><label class="czlx labelcol">'+result.hire_time[i]+'</label><label class="czlx labelcol">'+result.hire_price[i]+'<h5 class="xza" href="#"></h5></label></div>'
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
					
					if(hire_s.value==''||hire_s.value=='年月日'){
						alert('起始时间不能为空')
						return;	
					};
					if(hire_e.value==''||hire_e.value=='年月日'){
						alert('结束时间不能为空')	
						return;	
					}
					hire_start=hire_s.value+' '+'00:00:00'
					hire_end=hire_e.value+' '+'00:00:00';
					
			
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
	var objectid=localStorage.getItem("message_id")
		var extras=localStorage.getItem("extras")
		var extras=JSON.parse(extras)
		console.log(extras)
		var mode=extras.mode
		var objectid=extras.park_id
		
		var oUl2=document.getElementById('ul2')

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
					console.log(grade)
					
					var comment=data[i].comment
					
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
	var fabu=document.getElementById('fabu')
	var wode=document.getElementById('wode')
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
		var objectid=localStorage.getItem("message_id")
		var extras=localStorage.getItem("extras")
		var extras=JSON.parse(extras)
		
		var mode=extras.mode
		var objectid=extras.park_id
		
		var oUl2=document.getElementById('ul2')
		setTimeout(function () {
			oUl2.innerHTML='<li style="border-top:none; height:auto;"><div class="div_mar clearfix"><span class="pl">评论</span></div></li>'
			skip=0
			//alert('刷新')	
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
	var objectid=localStorage.getItem("message_id")
	var extras=localStorage.getItem("extras")
	var extras=JSON.parse(extras)
	
	var mode=extras.mode
	var objectid=extras.park_id
	
	var oUl2=document.getElementById('ul2')
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