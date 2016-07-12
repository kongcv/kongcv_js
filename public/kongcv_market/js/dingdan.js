function json(user_id,start_date,end_date,role,skip,mode){
	console.log( {"user_id":user_id,"start_date":start_date,"end_date":end_date, "role":role,"skip":skip, "limit":10,"mode":mode, "pay_state":0,"action":"count"})
	AV.Cloud.run('kongcv_manage_get_trade_data', {"user_id":user_id,"start_date":start_date,"end_date":end_date, "role":role,"skip":skip, "limit":10,"mode":mode, "pay_state":0,"action":"count"}, {
		success: function(data) {
			console.log(data);
			zong.innerHTML='总数：'+data		
		}
	});
	
	AV.Cloud.run('kongcv_manage_get_trade_data', {"user_id":user_id,"start_date":start_date,"end_date":end_date, "role":role,"skip":skip, "limit":10,"mode":mode, "pay_state":0,"action":"list"}, {
		success: function(data) {
			console.log(data);
			ul.innerHTML='';
			for(var i=0;i<data.length;i++){
				var s=new Date(data[i].hire_start)
				var e=new Date(data[i].hire_end)
				var c=new Date(data[i].createdAt)
				if(data[i].hire_start){
					var start=s.getFullYear()+'年'+(s.getMonth()+1)+'月'+s.getDate()+'日'	
				}else{
					var start='起始时间为空'	
				};
				if(data[i].hire_end){
					var end=e.getFullYear()+'年'+(e.getMonth()+1)+'月'+e.getDate()+'日'
				}else{
					var end='结束时间为空'	
				};
				if(data[i].createdAt){
					var creat=c.getFullYear()+'年'+(c.getMonth()+1)+'月'+c.getDate()+'日'
				}else{
					var creat='创建时间为空'	
				};
				if(data[i].objectId){
					var objectid=data[i].objectId	
				}else{
					var objectid=''	
				};
				if(mode=='curb'){
					if(data[i].park_curb){
						var park_curb=JSON.parse(data[i].park_curb)
						var add=park_curb.address	
					}else{
						var add='无车位信息'	
					};	
				}else{
					if(data[i].park_community){
						var park_community=JSON.parse(data[i].park_community)
						var add=park_community.address	
					}else{
						var add='无车位信息'	
					};
				};
				if(data[i].money){
					var money=data[i].money	
				}else{
					var money=0	
				};
				if(data[i].hirer){
					var hirer=JSON.parse(data[i].hirer)	
					var hP=hirer.mobilePhoneNumber
				}else{
					var hP=''	
				};
				if(data[i].user){
					var user=JSON.parse(data[i].user)	
					var uP=user.mobilePhoneNumber
				}else{
					var uP=''	
				};
				if(data[i].hire_method){
					var hire_method=JSON.parse(data[i].hire_method)	
					var method=hire_method.method
				}else{
					var method=''	
				}
				var xu=i+skip+1
				var oLi=document.createElement('li');
				oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:140px;">'+hP+'</span><span style="width:140px;">'+uP+'</span><span style="width:580px">'+add+'</span><span style="width:142px;">'+method+'</span><span style="width:100px;">'+money+'</span><span>'+creat+'</span><span style="width:150px;">'+start+'</span><span style="width:150px;">'+end+'</span><span style="width:292px;">'+objectid+'</span>'
					
				ul.appendChild(oLi)
			}
		}
	});	
}


window.onload=function(){
	var ce=getCookie("ce")||"t"
	if(ce=="T"){
		var se=document.getElementsByTagName('select')[0]
		var start=document.getElementById('start');
		var end=document.getElementById('end')
		var phone=document.getElementById('phone')
		var zong=document.getElementById('zong');
		var zuo=document.getElementById('zuo');
		var you=document.getElementById('you');
		var you2=document.getElementById('you2');
		var hui=document.getElementById('hui');
		var qu=document.getElementById('qu');
		var ul=document.getElementById('ul');
		var curb=document.getElementById('curb');
		var com=document.getElementById('com');
		var shang=document.getElementById('shang');
		var xia=document.getElementById('xia');
		var k=zuo.offsetWidth;
		var k2=you.offsetWidth
		var a=k+k2
		qu.onclick=function(){
			move(zuo,{left:-k})
			move(you2,{width:a})
			move(you,{left:-k})
			move(hui,{opacity:1})
			move(qu,{opacity:0})
			
		}
		hui.onclick=function(){
			move(zuo,{left:0})
			move(you2,{width:k2})
			move(you,{left:0})
			move(hui,{opacity:0})
			move(qu,{opacity:1})	
		}
		var skip=0;
		var mode='community'
		var start_date='';
		var end_date='';
		var role='hirer'
		json('0',start_date,end_date,role,skip,mode)
		
		com.onclick=function(){
			mode='community'
			if(se.value=='租用人手机号'){
				role='customer'	
			}else{
				role='hirer'		
			}
			if(phone.value==''){
				var start_date=start.value+' 00:00:00';
				var end_date=end.value+' 00:00:00';
				if(start_date==" 00:00:00"){
					start_date=''	
				};
				if(end_date==" 00:00:00"){
					end_date=''	
				}
				json('0',start_date,end_date,role,skip,mode)
				
			}else{
				var mobilePhoneNumber=phone.value
				AV.Cloud.run('kongcv_manage_mobile_2_user', {"mobilePhoneNumber":mobilePhoneNumber}, {
				success: function(data) {
					console.log(data)
					if(typeof(data)=='string'){
						var data=JSON.parse(data);
						alert(data.error)
						return;
					}else{
						var userid=data.objectId;
						var start_date=start.value+' 00:00:00';
						var end_date=end.value+' 00:00:00';
						if(start_date==" 00:00:00"){
							start_date=''	
						};
						if(end_date==" 00:00:00"){
							end_date=''	
						}
						json(userid,start_date,end_date,role,skip,mode)
								
						}
					},
			});
			
			}
			
		};
		curb.onclick=function(){
			mode='curb'
			if(se.value=='租用人手机号'){
				role='customer'	
			}else{
				role='hirer'		
			}
			if(phone.value==''){
				var start_date=start.value+' 00:00:00';
				var end_date=end.value+' 00:00:00';
				if(start_date==" 00:00:00"){
					start_date=''	
				};
				if(end_date==" 00:00:00"){
					end_date=''	
				}
				json('0',start_date,end_date,role,skip,mode)
				
			}else{
				var mobilePhoneNumber=phone.value
				AV.Cloud.run('kongcv_manage_mobile_2_user', {"mobilePhoneNumber":mobilePhoneNumber}, {
				success: function(data) {
					console.log(data)
					if(typeof(data)=='string'){
						var data=JSON.parse(data);
						alert(data.error)
						return;
					}else{
						var userid=data.objectId;
						var start_date=start.value+' 00:00:00';
						var end_date=end.value+' 00:00:00';
						if(start_date==" 00:00:00"){
							start_date=''	
						};
						if(end_date==" 00:00:00"){
							end_date=''	
						}
						json(userid,start_date,end_date,role,skip,mode)
								
						}
					},
			});
			
			}
			
			
		};
		shang.onclick=function(){
			
			skip-=10
			if(skip<0){
				skip=0
				alert('已经是第一页了')
				return
			};
			if(se.value=='租用人手机号'){
				role='customer'	
			}else{
				role='hirer'	
			}
			if(phone.value==''){
				var start_date=start.value+' 00:00:00';
				var end_date=end.value+' 00:00:00';
				if(start_date==" 00:00:00"){
					start_date=''	
				};
				if(end_date==" 00:00:00"){
					end_date=''	
				}
				json('0',start_date,end_date,role,skip,mode)
				
			}else{
				var mobilePhoneNumber=phone.value
				AV.Cloud.run('kongcv_manage_mobile_2_user', {"mobilePhoneNumber":mobilePhoneNumber}, {
				success: function(data) {
					console.log(data)
					if(typeof(data)=='string'){
						var data=JSON.parse(data);
						alert(data.error)
						return;
					}else{
						var userid=data.objectId;
						var start_date=start.value+' 00:00:00';
						var end_date=end.value+' 00:00:00';
						if(start_date==" 00:00:00"){
							start_date=''	
						};
						if(end_date==" 00:00:00"){
							end_date=''	
						}
						json(userid,start_date,end_date,role,skip,mode)
								
						}
					},
			});
			
			}
			
		}
		xia.onclick=function(){
			if(se.value=='租用人手机号'){
				role='customer'	
			}else{
				role='hirer'		
			}
			
			skip+=10
			
			if(phone.value==''){
				var start_date=start.value+' 00:00:00';
				var end_date=end.value+' 00:00:00';
				if(start_date==" 00:00:00"){
					start_date=''	
				};
				if(end_date==" 00:00:00"){
					end_date=''	
				}
				json('0',start_date,end_date,role,skip,mode)
				
			}else{
				var mobilePhoneNumber=phone.value
				AV.Cloud.run('kongcv_manage_mobile_2_user', {"mobilePhoneNumber":mobilePhoneNumber}, {
				success: function(data) {
					console.log(data)
					if(typeof(data)=='string'){
						var data=JSON.parse(data);
						alert(data.error)
						return;
					}else{
						var userid=data.objectId;
						var start_date=start.value+' 00:00:00';
						var end_date=end.value+' 00:00:00';
						if(start_date==" 00:00:00"){
							start_date=''	
						};
						if(end_date==" 00:00:00"){
							end_date=''	
						}
						json(userid,start_date,end_date,role,skip,mode)
								
						}
					},
			});
			
			}
		}
	}else{
		location='index.html'	
	}
	
};
