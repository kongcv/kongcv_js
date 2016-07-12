$(document).ready(function(){
	$('.datetimepicker').datetimepicker({
                lang:'ch',
                timepicker:false,
                format:'Y-m-d',
                formatDate:'Y-m-d'
            });
});

function json(device_type,city,start_date,end_date,skip){
		var ul=document.getElementById('ul');
		ul.innerHTML=''
		AV.Cloud.run('kongcv_manage_get_user_count', {"device_type":device_type,"city":city, "start_date":start_date,"end_date":end_date}, {
			success: function(data) {
				console.log(data)
				zong.innerHTML='总数：'+data
			}	
		});	
		console.log( {"device_type":device_type,"city":city,"start_date":start_date,"end_date":end_date,"skip":skip,"limit":10})	
		AV.Cloud.run('kongcv_manage_get_user_list', {"device_type":device_type,"city":city,"start_date":start_date,"end_date":end_date,"skip":skip,"limit":10}, {
				success: function(data) {
					console.log(data)
					for(var i=0;i<data.length;i++){
						var oLi=document.createElement('li');
						var c=new Date(data[i].createdAt)
						var u=new Date(data[i].updatedAt)
						if(data[i].createdAt){
							var creat=c.getFullYear()+'年'+(c.getMonth()+1)+'月'+c.getDate()+'日'
						}else{
							var creat=''	
						};
						if(data[i].updatedAt){
							var updatedAt=u.getFullYear()+'年'+(u.getMonth()+1)+'月'+u.getDate()+'日'	
						}else{
							var updatedAt=''	
						};
						
						if(data[i].mobilePhoneNumber){
							var phone=data[i].mobilePhoneNumber	
						}else{
							var phone=''	
						};
						if(data[i].version){
							var version=data[i].version
						}else{
							var version=''	
						};
						if(data[i].device_type){
							var device_type=data[i].device_type	
						}else{
							var device_type=''	
						};
						if(data[i].city){
							var cheng=data[i].city
						}else{
							var cheng=''
						};
						
						var xu=i+skip+1
						oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:115px;">'+phone+'</span><span style=" width:108px;">'+cheng+'</span><span style="width:100px;">'+version+'</span><span style="width:100px;">'+device_type+'</span><span style="width:150px;">'+creat+'</span><span style="width:150px;">'+updatedAt+'</span>'	
						ul.appendChild(oLi)
					}
					
				}	
		});			
	}
	
window.onload=function(){
	
	var ce=getCookie("ce")||"t"
	if(ce=="T"){
		$("#cheng").click(function (e) {
			SelCity(this,e);
		});
		var zong=document.getElementById('zong');
		var ul=document.getElementById('ul');
		var cheng=document.getElementById('cheng');
		var type=document.getElementById('type');
		var start=document.getElementById('start');
		var end=document.getElementById('end');
		var cha=document.getElementById('cha');
		var shang=document.getElementById('shang');
		var xia=document.getElementById('xia');
		var zuo=document.getElementById('zuo');
		var you=document.getElementById('you');
		var hui=document.getElementById('hui');
		var qu=document.getElementById('qu');
		var you2=document.getElementById('you2')
		var k=zuo.offsetWidth;
		var k2=you.offsetWidth;
		var a=k+k2;
		
		qu.onclick=function(){
			move(zuo,{left:-k})
			move(you,{left:-k})
			move(you2,{width:a})
			move(hui,{opacity:1})
			move(qu,{opacity:0})
			
		}
		hui.onclick=function(){
			move(zuo,{left:0})
			move(you,{left:0})
			move(you2,{width:k2})
			move(hui,{opacity:0})
			move(qu,{opacity:1})	
		}
		var device_type='';
		var city='';
		var start_date='';
		var end_date='';
		var skip=0;
		
		json(device_type,city,start_date,end_date,skip)
		cha.onclick=function(){
			var device_type=type.value;
			var cheng2=cheng.value.split('-')
			var city=cheng2[1];
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(device_type,city,start_date,end_date,skip)
		};
		shang.onclick=function(){
			skip-=10
			if(skip<0){
				skip=0
				alert('已经是第一页了')
				return
			};	
			var device_type=type.value;
			var cheng2=cheng.value.split('-')
			var city=cheng2[1];
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(device_type,city,start_date,end_date,skip)
		}
		xia.onclick=function(){
			skip+=10
			var device_type=type.value;
			var cheng2=cheng.value.split('-')
			var city=cheng2[1];
			var start_date=start.value+' 00:00:00';
			var end_date=end.value+' 00:00:00';
			if(start_date==" 00:00:00"){
				start_date=''	
			};
			if(end_date==" 00:00:00"){
				end_date=''	
			}
			json(device_type,city,start_date,end_date,skip)
		}
	}else{
		location='index.html';		
	}
	
}