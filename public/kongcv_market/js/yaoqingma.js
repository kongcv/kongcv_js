

function json(start_date,end_date,skip,invite_code){
	console.log({"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"count","invite_code":invite_code})
	AV.Cloud.run('kongcv_manage_get_invite_code_data', {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"count","invite_code":invite_code}, {
			success: function(data) {
				
				var zong=document.getElementById('zong');
				zong.innerHTML='总数：'+data				
			}
			
	})
	AV.Cloud.run('kongcv_manage_get_invite_code_data', {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"list","invite_code":invite_code}, {
			success: function(data) {
				console.log(data)
				if(typeof(data)=='string'){
					var data=JSON.parse(data)
					alert(data.error);
					return	
				}
				var ul=document.getElementById('ul');
				ul.innerHTML=''
				for(var i=0;i<data.length;i++){
					if(data[i].invite_code){
						var invite_code=data[i].invite_code	
					}else{
						var invite_code=''	
					};
					if(data[i].mobile){
						var mobile=data[i].mobile	
					}else{
						var mobile=''
					};
					if(data[i].trade_count){
						var trade_count=data[i].trade_count	
					}else{
						var trade_count='0'
					};
					var xu=i+skip+1
					var oLi=document.createElement('li');
					
					oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:110px;">'+invite_code+'</span><span style="width:140px;">'+mobile+'</span><span>'+trade_count+'</span>'	
					ul.appendChild(oLi)
				}
			}
			
		})		
}
window.onload=function(){
	var ce=getCookie("ce")||"t"
	if(ce=="T"){
		var cha=document.getElementById('cha');
		var start=document.getElementById('start');
		var end=document.getElementById('end')
		var shang=document.getElementById('shang');
		var xia=document.getElementById('xia')
		var code=document.getElementById('code')
		var zuo=document.getElementById('zuo')
		var you=document.getElementById('you')
		var you2=document.getElementById('you2')
		var hui=document.getElementById('hui')
		var qu=document.getElementById('qu')
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
		var skip=0
		var start_date='';
		var end_date='';
		var invite_code=''
		json(start_date,end_date,skip,invite_code)
		cha.onclick=function(){
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			var invite_code=code.value
			json(start_date,end_date,skip,invite_code)
		};
		shang.onclick=function(){
			skip-=10
			if(skip<0){
				skip=0
				alert('已经是第一页了')
				return
			}
			var invite_code=code.value
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(start_date,end_date,skip,invite_code)
		}
		xia.onclick=function(){
			skip+=10
			var invite_code=code.value
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(start_date,end_date,skip,invite_code)
		}
	}else{
		location='index.html'	
	}
	
};