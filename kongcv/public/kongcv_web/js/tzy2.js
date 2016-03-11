var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
AV.initialize(appid, appkey);

window.onload=function(){
	$('.datetimepicker').datetimepicker({
		lang:'ch',
		timepicker:false,
		format:'Y-m-d',
		formatDate:'Y-m-d'
	});
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
var zong=document.getElementById('zongjia')
var start=document.getElementById('start');
var end=document.getElementById('end');
var extra=localStorage.getItem("extras");
var jieshou=document.getElementById('jieshou')
var jujue=document.getElementById('jujue')
var extras=JSON.parse(extra)
console.log(extras)
zong.innerHTML=extras.price+'元'
var field=extras.hire_method_field
var park_id=extras.park_id;
var mode=extras.mode
var objectid=extras.hire_method_id
var message_id=localStorage.getItem("message_id");
var device_token=extras.own_device_token
var device_type=extras.own_device_type
var price=extras.price
var user_mobile=extras.own_mobile	


//得到车位详细信息

AV.Cloud.run('kongcv_get_park_info',  {"park_id":park_id, "mode":mode}, {
			success: function(result) {
				console.log(result)
				user=JSON.parse(result.user)
				console.log(user)
				var mobilePhoneNumber =user.username
				var dizhi=document.getElementById('dizhi');
				var gate_card=document.getElementById('card')
				var no_hire=document.getElementById('no_hire');
				var width=document.getElementById('width');
				var height=document.getElementById('height');
				var tail_num=document.getElementById('tail_num');
				var normal=document.getElementById('normal');
				var struct=document.getElementById('struct');
				var descripe=document.getElementById('descripe');
				no_hire.innerHTML=result.no_hire||''
				width.innerHTML=result.park_area||''
				height.innerHTML=result.park_height||'';
				tail_num.innerHTML=result.tail_num;
				dizhi.innerHTML=result.address.replace('&',' ');
				gate_card.innerHTML+=result.gate_card||''
				descripe.innerHTML+=result.park_description||''
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
				var hire_method=JSON.parse(result.hire_method)
				console.log(hire_method)	
				for(var i=0;i<hire_method.length;i++){
					if(hire_method[i].objectId==objectid){
						console.log(hire_method[i])	
						if(hire_method[i].field!='hour_meter'){
							start.innerHTML=extras.hire_start.split(' ')[0];
							end.innerHTML=extras.hire_end.split(' ')[0];
						};
						var oLi=document.createElement('li')
						oLi.innerHTML='<div class="li_div"><label class="czlx labelcol">'+hire_method[i].method+'</label><label class="czlx labelcol">'+result.hire_time[i]+'</label><label class="czlx labelcol">'+result.hire_price[i]+'</label></div>'
						var oUL=document.getElementById('ul')
						oUL.appendChild(oLi)
					}	
				}
				var phone=localStorage.getItem("phone")
				var  user_id=localStorage.getItem("e")/*use-id*/
				var address=dizhi.innerHTML;
				
				jieshou.onclick=function(){
					if(device_token=='web'||device_type=='web'){
						AV.Cloud.run('kongcv_change_pushmessage_state',  {"message_id":message_id, "state":2}, {
							success: function(data) {
								console.log(data)
								if(data.state=='error'){
									alert(data.error)	
								}else{
									alert('更改成功')	
								}
							}
						});	
						return	
					}
					//发送push通知
					
					AV.Cloud.run('kongcv_jpush_message_p2p',   {"mobilePhoneNumber":mobilePhoneNumber, "push_type":"verify_accept", "device_token":device_token, "device_type":device_type, "user_id":user_id,"extras":{"park_id":park_id,"mode":mode, "address":address,"hire_method_id":objectid,"hire_method_field":field,"hire_start":start.innerHTML, "own_mobile":phone, "hire_end":end.innerHTML,"push_type":"verify_accept","price":price}}, {
						success: function(data) {
							var data=JSON.parse(data)
							if(data.state=='error'){
								alert(data.error)	
							}else{
								
								AV.Cloud.run('kongcv_change_pushmessage_state',  {"message_id":message_id, "state":1}, {
									success: function(data) {
										console.log(data)
										var data=JSON.parse(data)
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('更改成功')	
										}
									}
								});	
							}
							
							
								console.log(data)
						}
					});	
					// 更改状态 alert(message_id)
					
					//插入通知接受数据
					AV.Cloud.run('kongcv_insert_accept',{"req_mobile":phone,"user_mobile":user_mobile,"park_id":park_id,"mode":mode}, {
						success: function(data) {
							console.log(data)
						}
					});	
				};
				jujue.onclick=function(){
					//alert(device_token)
					//alert(device_type)
					
					if(device_token=='web'||device_type=='web'){
						AV.Cloud.run('kongcv_change_pushmessage_state',  {"message_id":message_id, "state":2}, {
							success: function(data) {
								console.log(data)
								if(data.state=='error'){
									alert(data.error)	
								}else{
									alert('更改成功')	
								}
							}
						});	
						return	
					}
					//发送push通知
					AV.Cloud.run('kongcv_jpush_message_p2p',  {"mobilePhoneNumber":mobilePhoneNumber, "push_type":"verify_reject", "device_token":device_token, "device_type":device_type, "user_id":user_id,"extras":{"push_type":"verify_reject"}}, {
						success: function(data) {
							var data=JSON.parse(data)
							if(data.state=='error'){
								alert(data.error)	
							}else{
								
								AV.Cloud.run('kongcv_change_pushmessage_state',  {"message_id":message_id, "state":2}, {
									success: function(data) {
										console.log(data)
										var data=JSON.parse(data)
										if(data.state=='error'){
											alert(data.error)	
										}else{
											alert('更改成功')	
										}
									}
								});	
							}
							
							
								console.log(data)
						}
					});	
					// 更改状态 alert(message_id)
					
					
				}
				},
			  
});


}