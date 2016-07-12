
function json(start_date,end_date,skip){
	console.log({"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"count"})
	AV.Cloud.run('kongcv_manage_get_feedback_data',  {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"count"}, {
			success: function(data) {
				console.log(data)
				zong.innerHTML='总数：'+data	
				
			}
			
	})
		AV.Cloud.run('kongcv_manage_get_feedback_data',  {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"list"}, {
			success: function(data) {
				console.log(data)	
				ul.innerHTML=''
				for(var i=0;i<data.length;i++){
					if(data[i].user){
						var user=JSON.parse(data[i].user)
						var phone=user.mobilePhoneNumber
					}else{
						var phone=''	
					}
					var feed_back=data[i].feed_back
					var xu=i+skip+1
					var oLi=document.createElement('li')
					oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:140px;">'+phone+'</span><span style="width:65%;text-align:left; margin-left:6%;">'+feed_back+'</span>'
					ul.appendChild(oLi)	
				}
			}
			
	});		
}
window.onload=function(){
	var ce=getCookie("ce")||"t"
	if(ce=="T"){
		var ul=document.getElementById('ul');
		var start=document.getElementById('start')
		var end=document.getElementById('end')
		var feed=document.getElementById('feed');
		var zong=document.getElementById('zong')
		var block=document.getElementById('block')
		var cha=document.getElementById('cha');
		var shang=document.getElementById('shang');
		var xia=document.getElementById('xia')
		var zuo=document.getElementById('zuo')
		var you=document.getElementById('you')
		var you2=document.getElementById('you2')
		var hui=document.getElementById('hui')
		var qu=document.getElementById('qu')
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
		json(start_date,end_date,skip)
		
		cha.onclick=function(){
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(start_date,end_date,skip)
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
			json(start_date,end_date,skip)
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
			json(start_date,end_date,skip)
		}
	}else{
		location='index.html'	
	}

}
	
	
	
