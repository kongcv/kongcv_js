

function json(skip){
AV.Cloud.run('kongcv_manage_get_trade_action', {"skip":skip,"limit":10, "action":[1,4]}, {
					success: function(data) {
						var ul2=document.getElementById('ul')
						ul2.innerHTML=''
						console.log(data)
						for(var i=0;i<data.length;i++){
							var oLi=document.createElement('li')
								var money=data[i].money;
								var c=new Date(data[i].createdAt)
								var u=new Date(data[i].updatedAt)
								var creat=c.getFullYear()+'年'+(c.getMonth()+1)+'月'+c.getDate()+'日'
								var update=u.getFullYear()+'年'+(u.getMonth()+1)+'月'+u.getDate()+'日'
								var user=JSON.parse(data[i].user)
								var phone=user.mobilePhoneNumber
								var objectid=data[i].objectId
								var xu=i+skip+1
								if(data[i].action==1){
									oLi.innerHTML='<span style="width:60px;">'+xu+'</span><span style="width:292px;">'+objectid+'</span><span style="width:140px;">'+phone+'</span><span style="width:150px;">'+creat+'</span><span style="width:150px;">'+update+'</span><span>'+money+'</span><span>提现</span><a class="wca" href="#">完成</a><a class="qba" href="javascript:;">钱包</a>'
									
									var a=oLi.getElementsByTagName('a')[0]
									var a2=oLi.getElementsByTagName('a')[1]
									a2.user=data[i].user
									a.objectid=data[i].objectId
									a.onclick=function(){
										var trade_id=this.objectid
										AV.Cloud.run('kongcv_manage_set_trade_action', {"trade_id":trade_id,"action":1}, {
											success: function(data) {
												console.log(data)
												var data=JSON.parse(data)
												if(data.state=='ok'){
													alert(data.msg)	
													location='Withdrawals.html'
												}else{
													alert(data.error)	
												}	
											}	
										})
									};
									a2.onclick=function(){
										var user=JSON.parse(this.user)
										var user_id=user.objectId
										ti.style.display='none';
										qianbao.style.display='block'	
										guan.onclick=function(){
											ti.style.display='block';
											qianbao.style.display='none'	
										}
										AV.Cloud.run('kongcv_get_purse',{"user_id":user_id,"skip":0,"limit":10}, {
											success: function(data) {
												console.log(data)	
												var name=data[0].bank_card[0].name
												var bank=data[0].bank_card[0].bank
												var card=data[0].bank_card[0].card
												var money=data[0].money
												var ul=document.getElementById('bank')
												var oli=ul.getElementsByTagName('li')
												for(var j=0;j<oli.length;j++){
													oli[0].innerHTML='姓名:<label>'+name+'</label>'	
													oli[1].innerHTML='银行卡号：<label>'+card+'</label>'	
													oli[2].innerHTML='银行卡类型：<label>'+bank+'</label>'	
													oli[3].innerHTML='余额：<label>'+money+'</label>'
												}
												
											}	
										})
										
									}
								
									
								};
								if(data[i].action==4){
									oLi.innerHTML='<span style="width:60px; ">'+xu+'</span><span  style="width:292px;">'+objectid+'</span><span style="width:140px;">'+phone+'</span><span style="width:150px;">'+creat+'</span><span style="width:150px;">'+update+'</span><span>'+money+'</span><span>提现完成</span><a class="qba" style="margin-left:90px;" href="#">钱包</a>'	
									var a2=oLi.getElementsByTagName('a')[0]
									a2.user=data[i].user
									a2.onclick=function(){
										var user=JSON.parse(this.user)
										var user_id=user.objectId
										ti.style.display='none';
										qianbao.style.display='block'	
										guan.onclick=function(){
											ti.style.display='block';
											qianbao.style.display='none'	
										}
										AV.Cloud.run('kongcv_get_purse',{"user_id":user_id,"skip":0,"limit":10}, {
											success: function(data) {
												console.log(data)	
												var name=data[0].bank_card[0].name
												var bank=data[0].bank_card[0].bank
												var card=data[0].bank_card[0].card
												var money=data[0].money
												var ul=document.getElementById('bank')
												var oli=ul.getElementsByTagName('li')
												for(var j=0;j<oli.length;j++){
													oli[0].innerHTML='姓名:<label>'+name+'</label>'	
													oli[1].innerHTML='银行卡号：<label>'+card+'</label>'	
													oli[2].innerHTML='银行卡类型：<label>'+bank+'</label>'	
													oli[3].innerHTML='余额：<label>'+money+'</label>'
												}
												
											}	
										})
										
									}	
								}
								
							ul2.appendChild(oLi)	
						};
					},})		
}

function json2(phone,money){
	AV.Cloud.run('kongcv_manage_mobile_2_user', {"mobilePhoneNumber":phone}, {
			success: function(data) {
			console.log(data);
				if(typeof(data)=='string'){
					var data=JSON.parse(data);
					alert(data.error)
					
				}else{
					var user_id=data.objectId;
					var money2=Number(money)
					
					
					AV.Cloud.run('kongcv_insert_withdraw_deposit', {"user_id":user_id, "money":money2}, {
						success: function(data) {
							console.log(data)
							var data=JSON.parse(data)
							if(data.state=='ok'){
								alert(data.msg)	
								location='Withdrawals.html'
							}else if(data.state=='failed'){
								alert(data.msg)	
							}else{
								alert(data.error)	
							}
						}	
					})
				}
			}
		});	
		
}
window.onload=function(){
	var bok=getCookie("Ce")||"b"
	//alert(bok)
	if(bok=="a"){
		var cha=document.getElementById('cha')
		var shang=document.getElementById('shang');
		var xia=document.getElementById('xia')
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
			move(you2,{width:a})
			move(you,{left:-k})
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
		var skip=0
		
		json(skip)
		shang.onclick=function(){
			skip-=10
			if(skip<0){
				skip=0
				alert('已经是第一页了')
				return
			};	
			json(skip)
		}
		xia.onclick=function(){
			skip+=10
			json(skip)
		}
		cha.onclick=function(){
			var pho=document.getElementById('shou')	
			var mon=document.getElementById('mon')
			var phone=pho.value
			var money=mon.value;
			if(phone==''){
				alert('手机号不能为空')
				return	
			}
			if(money==''){
				alert('金额不能为空')
				return	
			}
			json2(phone,money)
			
		}
	}else{
		location='index.html';		
	}
	
}