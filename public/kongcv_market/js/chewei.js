function json(user_id,start_date,end_date,skip,mode){
	AV.Cloud.run('kongcv_manage_get_park_data', {"user_id":user_id,"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10,"mode":mode, "action":"count"}, {
			success: function(data) {
				zong.innerHTML='总数：'+data	
			}
				
	})
	console.log({"user_id":user_id,"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10,"mode":mode, "action":"count"})
	AV.Cloud.run('kongcv_manage_get_park_data', {"user_id":user_id,"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10,"mode":mode, "action":"list"}, {
			success: function(data) {
				ul.innerHTML=''
				console.log(data)
				for(var i=0;i<data.length;i++){
					if(data[i].user){
						var user=JSON.parse(data[i].user)
						var name=user.mobilePhoneNumber	
					}else{
						var name=''	
					};
					if(data[i].address){
						var add=data[i].address	
					}else{
						var add=''	
					};
					var xu=i+skip+1
					var oLi=document.createElement('li');
					oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:140px;">'+name+'</span><span style="width:580px">'+add+'</span><span style="width:100px;"><a class="czfs" href="#">出租方式</a></span>'	;	
					var oA=oLi.getElementsByTagName('a')[0]
					
					oA.hire=data[i].hire_method
					oA.price=data[i].hire_price	
					oA.onclick=function(){
						var ul2=document.getElementById('ul2');
						ul2.innerHTML=''
						var hire=JSON.parse(this.hire)
						for(var a=0;a<hire.length;a++){
							var oli=document.createElement('li');
							oli.innerHTML='<span>'+hire[a].method+'</span><span>'+this.price[a]+'</span>'
							ul2.appendChild(oli)
						}
						
					
						you.style.display='none';
						block.style.display='block'	
					}
					ul.appendChild(oLi)	
				}
					
			}
			
	})	
}

window.onload=function(){
	var ce=getCookie("ce")||"t"
	if(ce=="T"){
		var phone=document.getElementById('phone');
		var xia=document.getElementById('xia');
		var shang=document.getElementById('shang')
		var block=document.getElementById('block');
		var com=document.getElementById('com');
		var start=document.getElementById('start')
		var end=document.getElementById('end')
		var curb=document.getElementById('curb');
		var ul2=document.getElementById('ul2');
		var zuo=document.getElementById('zuo')
		var you=document.getElementById('you')
		var you2=document.getElementById('you2')
		var hui=document.getElementById('hui')
		var qu=document.getElementById('qu');
		var guan=document.getElementById('guan')
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
	
		var start_date='';
		var end_date='';
		var skip=0
		var mode='community'
		json('0',start_date,end_date,skip,mode)
		curb.onclick=function(){
			mode='curb'
			if(phone.value==''){
				var start_date=start.value+' 00:00:00';
				var end_date=end.value+' 00:00:00';
				if(start_date==" 00:00:00"){
					start_date=''	
				};
				if(end_date==" 00:00:00"){
					end_date=''	
				}
				json('0',start_date,end_date,skip,mode)
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
						json(userid,start_date,end_date,skip,mode)
								
						}
					},
			});
			
			}
			
		}
		com.onclick=function(){
			mode='community'
				if(phone.value==''){
				var start_date=start.value+' 00:00:00';
				var end_date=end.value+' 00:00:00';
				if(start_date==" 00:00:00"){
					start_date=''	
				};
				if(end_date==" 00:00:00"){
					end_date=''	
				}
				json('0',start_date,end_date,skip,mode)
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
						json(userid,start_date,end_date,skip,mode)
								
						}
					},
			});
			
			}
			
		}
		shang.onclick=function(){
			skip-=10
			if(skip<0){
				skip=0
				alert('已经是第一页了')
				return
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
				json('0',start_date,end_date,skip,mode)
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
						json(userid,start_date,end_date,skip,mode)
								
						}
					},
			});
			
			}
		}
		xia.onclick=function(){
			
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
				json('0',start_date,end_date,skip,mode)
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
						json(userid,start_date,end_date,skip,mode)
								
						}
					},
			});
			
			}
		}
		guan.onclick=function(){
			you.style.display='block';
			block.style.display='none'	
		}
	}else{
		location='index.html'	
	}
	
	
	
};

