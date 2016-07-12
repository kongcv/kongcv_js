function json(start_date,end_date,skip,mode){
		AV.Cloud.run('kongcv_manage_get_pushmessage_data', {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"count","mode":mode}, {
			success: function(data) {
				zong.innerHTML='总数：'+data	
			}
			
		})
		AV.Cloud.run('kongcv_manage_get_pushmessage_data', {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"list","mode":mode}, {
			success: function(data) {
				console.log(data);
				ul.innerHTML=''
				for(var i=0;i<data.length;i++){
					var oLi=document.createElement('li')
					if(data[i].own_mobile){
						var own_mobile=data[i].own_mobile;	
					}else{
						var own_mobile=''	
					};
					
					if(data[i].req_mobile){
						var req_mobile=data[i].req_mobile;
					}else{
						var req_mobile=''	
					};
					if(data[i].extras){
						var add=data[i].extras.address	
					}else{
						var add=''
					};
					
					if(data[i].state==0){
						var state='未处理'	
					}else if(data[i].state==1){
						var state='接受'	
					}else{
						var state='拒绝'		
					};
					
					if(data[i].push_type=="verify_request"){
						var push_type='租用请求'	
					}else if(data[i].push_type=="verify_accept"){
						var push_type='接受租用'	
					}else if(data[i].push_type=="verify_reject"){
						var push_type='拒绝租用'	
					}else if(data[i].push_type=="trade_charge"){
						var push_type='交易计费'	
					}else{
						var push_type='支付信息'	
					}
					
					
					
					
					var xu=i+skip+1
					oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:140px;">'+own_mobile+'</span><span style="width:140px;">'+req_mobile+'</span><span style="width:580px;">'+add+'</span><span>'+state+'</span><span>'+push_type+'</span>'		
					ul.appendChild(oLi)
				}	
			}
			
	})
}

window.onload=function(){
	var ce=getCookie("ce")||"t"
	if(ce=="T"){
		var val=document.getElementById('shi');
		var start=document.getElementById('start')
		var end=document.getElementById('end')
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
		};
		var skip=0;
		var mode='community'
		var start_date='';
		var end_date='';
		json(start_date,end_date,skip,mode)
		curb.onclick=function(){
			mode='curb'
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(start_date,end_date,skip,mode)
			
		};
		com.onclick=function(){
			mode='community'
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(start_date,end_date,skip,mode)
			
		}
		shang.onclick=function(){
			skip-=10
			if(skip<0){
				skip=0
				alert('已经是第一页了')
				return
			}
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(start_date,end_date,skip,mode)
		}
		xia.onclick=function(){
			skip+=10
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(start_date,end_date,skip,mode)
		}
	}else{
		location='index.html'	
	}	
}