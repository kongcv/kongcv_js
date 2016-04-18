

window.onload=function(){
		var browser = {
		versions: function () {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {         //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
		
		var xiao=document.getElementById('xiao')
		var xia=document.getElementById('xia')
		
		xia.onclick=function(){
			if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
				var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
				
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
						alert('请在safari中打开下载');
						xia.href='index.html'
						
				};
				
				
			}
			
        
		}
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
				var slider=document.getElementById('slider')
				var li=uu.getElementsByTagName('li')
				for(var i=0;i<li.length;i++){
					li[i].style.width=slider.offsetWidth+'px'	
					
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