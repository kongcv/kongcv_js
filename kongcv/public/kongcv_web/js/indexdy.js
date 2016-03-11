
	window.onload=function(){
		
		var xiao=document.getElementById('xiao')
		var ios=document.getElementById('ios')
		
		var uu=document.getElementById('uu')
		var ol=document.getElementsByTagName('ol')[0]
	
     AV.Cloud.run('kongcv_get_advertise', {}, {
     
        success: function(data) {
			console.log(data)
			
			for(var i=0;i<data.length;i++){
				
				var oLi=document.createElement('li');
				oLi.innerHTML='<img class="appimg1" src="'+data[i].picture2._url+'"/>'	
				var oLi2=document.createElement('li')
				uu.appendChild(oLi)
				ol.appendChild(oLi2)
				var number=i
				
			}
				var kuan=uu.offsetWidth
				
				uu.style.width=(number+1)*kuan+'px'
				ol.style.width=(number+1)*20+'px'
				var oLii=ol.getElementsByTagName('li')[0]
				oLii.className='y'
				var aBtn=ol.getElementsByTagName('li')
				var iNow=0
				for(var i=0;i<aBtn.length;i++){
					(function(index){
						aBtn[i].onmouseover=function(){
							iNow=index
							aaa()
							
						}	
					})(i)
				}
				function aaa(){
					for(var i=0;i<aBtn.length;i++){
							aBtn[i].className='';	
						}
						aBtn[iNow].className='y'	
						move(uu,{left:-iNow*kuan})	
				}
				setInterval(function(){
					iNow++
					if(iNow>aBtn.length-1){
						iNow=0	
					}
					aaa()	
				},3000)
				
			}
     });
		clikback();//底部点击出背景图
		stopvehicle();//停车类型
		var fabu=document.getElementById('fabu')
		var wode=document.getElementById('wode')
		var  user_id=localStorage.getItem("e")
	
		xiao.onclick=function(){
			ios.style.display='none'	
		};
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
	
	
	}