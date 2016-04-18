// JavaScript Document
	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37'
	AV.initialize(appid, appkey);

	

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
var oUl=document.getElementById('uul')
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
var objectid=localStorage.getItem("message_id")
var extras=localStorage.getItem("extras")
var extras=JSON.parse(extras)
console.log(extras)
var mode=extras.mode
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
				if(result.gate_card){
					card.innerHTML+=result.gate_card;
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
						qian=Number(price.split('/')[0])	
						//alert(qian)
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