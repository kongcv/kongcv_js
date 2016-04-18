	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
	AV.initialize(appid, appkey);
	
	window.onload=function(){
		var aLi=document.getElementsByTagName('li')
		AV.Cloud.run('kongcv_get_company_info',{}, {
			success: function(data) {
				console.log(data)
				aLi[0].innerHTML='<img class="qqimg4" src="images/wz.png"/><span class="span_wx">'+data[0].name+':'+data[0].info+'</span>'
				aLi[1].innerHTML='<img class="qqimg3" src="images/yj.png"/><span class="span_em">'+data[1].name+':'+data[1].info+'</span>'
				aLi[2].innerHTML='<img class="qqimg" src="images/bg_qier@2x.png"/><span class="span_wx">'+data[2].name+':'+data[2].info+'</span>'
				aLi[3].innerHTML='<img class="qqimg2" src="images/bg_weixin@2x.png"/><span class="span_wx">'+data[3].name+':'+data[3].info+'</span>'
				aLi[4].innerHTML='<img class="qqimg5" src="images/wb.png"/><span class="span_em">'+data[4].name+':'+data[4].info+'</span>'	
			 },
			
		 });
		
	};