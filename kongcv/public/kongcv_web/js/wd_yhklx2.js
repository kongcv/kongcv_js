// JavaScript Document
	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
	AV.initialize(appid, appkey);
	
//底部点击出背景图片
function clikback(){
	$(".back1").click(function(){
		 $(".back1").addClass("a_backimg1");
	});
		
	$(".back2").click(function(){
		$(".back2").addClass("a_backimg2");
	})
	$(".back3").click(function(){
		$(".back3").addClass("a_backimg3");
	})
	
	
}
window.onload=function(){
	clikback();
	var tupian=document.getElementById('tupian')
	var oUl=document.getElementById('ul');
	var name=document.getElementById('name');
	var card=document.getElementById('card');
	var bank1=document.getElementById('bank')
	var user_id=localStorage.getItem("e");
	var pass=document.getElementById('pass');
	var lx=document.getElementById('lx')
	var tijiao=document.getElementById('tijiao');
	var yh=document.getElementById('yh')
	
	//获取数据
	AV.Cloud.run('kongcv_get_purse',   {"user_id":user_id,"skip":0,"limit":10,}, {
		success: function(result) {
			console.log(result)
			name.value=result[0].bank_card[0].name;
			card.value=result[0].bank_card[0].card;
			bank1.innerHTML=result[0].bank_card[0].bank;
			var uu=result[0].bank_card[0].bank_icon_url
			tupian.src=uu;
			var bb=bank1.innerHTML
			
			tijiao.onclick=function(){
				var passw=md5(pass.value)
				var ppp=bank1.innerHTML
				var url=localStorage.getItem("uuu");
				
				//alert(url)
				//alert(uu)
				
				//测验密码
				AV.Cloud.run('kongcv_verify_purse_passwd',   {"user_id":user_id,"passwd":passw}, {
					success: function(data) {
						var data=JSON.parse(data);
						console.log(data);
						if(data.state=='error'){
							alert(data.error)	
						}else{
							alert('密码验证成功')
							
							var M1=document.getElementById('m1');
							var M2=document.getElementById('m2');
							var bank2=document.getElementById('bank')
							var card=document.getElementById('card')
							var name=document.getElementById('name');
							var pass=document.getElementById('pass')
							var passwd=md5(pass.value)
							var m1v=M1.value;
							var m2v=M1.value
											
							if(m1v==''&&bank2.innerHTML!=bb){
								//alert('只更改银行卡');
								AV.Cloud.run('kongcv_put_purse',   {"user_id":user_id, "bank_card":{"bank":bank2.innerHTML,"card":card.value,"name":name.value,"bank_icon_url":url},"passwd":passwd, "action":"card"}, {
										success: function(result) {
											var result=JSON.parse(result);
											console.log(result)
											if(data.state=='ok'){
												alert('更改成功')	
											}else{
												alert(data.error)
												
											};
												
								  },
								 
								});
									
							};
							if(bank2.innerHTML==bb&&m1v!=''){
								
								if(M1.value!=M2.value){
									alert('两次密码输入不对')	
								}else{
									var passwd=md5(M1.value)
								}
								
								AV.Cloud.run('kongcv_put_purse',   {"user_id":user_id, "bank_card":{"bank":bank2.innerHTML,"card":card.value,"name":name.value,"bank_icon_url":uu},"passwd":passwd, "action":"passwd"}, {
										success: function(result) {
											var result=JSON.parse(result);
											console.log(result)
											if(data.state=='ok'){
												alert('更改成功')	
											}else{
												alert(data.error)
												
											};
												
								  },
								 
								});	
							};
							if(bank2.innerHTML!=bb&&m1v!=''){
								if(M1.value!=M2.value){
									alert('两次密码输入不对')	
								}else{
									var passwd=md5(M1.value)
								}
								AV.Cloud.run('kongcv_put_purse',   {"user_id":user_id, "bank_card":{"bank":bank2.innerHTML,"card":card.value,"name":name.value,"bank_icon_url":url},"passwd":passwd, "action":"new"}, {
									success: function(result) {
										var result=JSON.parse(result);
										console.log(result)
										
										if(data.state=='ok'){
											alert('更改成功')	
										}else{
											alert(data.error)
												
										};
											
							  },
							
							});
							};
							
							
						};
						
						
				  },
				 
				});
			
			};
			
		 },
		 
	});
	
	//更改银行卡类型	
	AV.Cloud.run('kongcv_get_bank',{}, {
		success: function(result) {
			console.log(result)
			
			for(var i=0;i<result.length;i++){
				var oLi=document.createElement('li')
				oLi.bank=result[i].bank
				oLi.url=result[i].picture._url
				var _url=result[i].picture._url
				var bank=result[i].bank
				
				
				oLi.innerHTML='<div class="mr_div"><img class="iconimg" src="'+_url+'"/><span class="iconspan">'+bank+'</span></div>'	
				oLi.className='div_yhkl'
				oUl.appendChild(oLi)
				
				
					
			}
			var aLi=oUl.getElementsByTagName('li')
			for(var j=0;j<aLi.length;j++){
					aLi[j].onclick=function(){
						var uuu=this.url
						bank1.innerHTML=this.bank
						tupian.src=uuu
						localStorage.setItem("uuu",uuu)
						lx.style.display='none'
						yh.style.display='block'	
					}	
				}
			
	  },
	 
	  
	});
	
	bank1.onclick=function(){
		lx.style.display='block'
		yh.style.display='none'	
		
			
	};
				
	
	

};
