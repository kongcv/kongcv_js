function json(start_date,end_date,skip,mode){
	AV.Cloud.run('kongcv_manage_get_search_log', {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"count","mode":mode}, {
			success: function(data) {
				console.log(data);
				zong.innerHTML='总数：'+data	
			}
	})
	AV.Cloud.run('kongcv_manage_get_search_log', {"start_date":start_date,"end_date":end_date,"skip":skip, "limit":10, "action":"list","mode":mode}, {
			success: function(data) {
				console.log(data);
				ul.innerHTML=''
				for(var i=0;i<data.length;i++){
					var oLi=document.createElement('li')
					var c=new Date(data[i].createdAt)
					if(data[i].address){
						var add=data[i].address		
					}else{
						var add=''	
					}
					if(data[i].location){
						var latitude=data[i].location._latitude	
						var longitude=data[i].location._longitude		
					}else{
						var latitude=''	
						var longitude=''	
					}
					if(data[i].createdAt){
						var creat=c.getFullYear()+'年'+(c.getMonth()+1)+'月'+c.getDate()+'日'
					}else{
						var creat='创建时间为空'	
					};
					if(data[i].hire_method){
						var hire_method=JSON.parse(data[i].hire_method)
						var method=hire_method.method
					}else{
						var method=''
					};
					
					var xu=i+skip+1
					oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:142px;">'+method+'</span><span style="width:580px;">'+add+'</span><span  style="width:380px;">经度：'+latitude+',纬度：'+longitude+'</span><span>'+creat+'</span>'	
					ul.appendChild(oLi)
				}
			}
			
	})	
}

window.onload=function(){
	var ce=getCookie("ce")||"t"
	if(ce=="T"){
		var curb=document.getElementById('curb');
		var com=document.getElementById('com');
		var ul=document.getElementById('ul')
		var zong=document.getElementById('zong')
		var start=document.getElementById('start');
		var end=document.getElementById('end')
		var shang=document.getElementById('shang');
		var xia=document.getElementById('xia')
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
