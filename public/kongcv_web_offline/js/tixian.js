// JavaScript Document
	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
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
	var yh=document.getElementById('yh')
	var user_id=localStorage.getItem("e");
	var que=document.getElementById('que')
	AV.Cloud.run('kongcv_get_purse',   {"user_id":user_id,"skip":0,"limit":10,}, {
		success: function(result) {
			console.log(result)
			var arr=result[0].bank_card
			var bank=arr[0].bank
			var card1=arr[0].card
			//alert(card1)
			var card=card1.substring(11)
			//alert(bank)
			//alert(card)
			
			
			yh.innerHTML=bank+'('+card+')'
			
 }
});
	clikback();
	que.onclick=function(){
		
		var money=document.getElementById('money')
		var mon=money.value;
		var money=Number(mon)
		
		var pass=document.getElementById('pass');
		var passw=pass.value;
		var passwd=md5(passw)
		//alert(passwd)
		AV.Cloud.run('kongcv_verify_purse_passwd',   {"user_id":user_id,"passwd":passwd}, {
			success: function(result) {
				console.log(result)
				var result=JSON.parse(result)
				if(result.state=='error'){
					alert(result.error)	
				}else{
					//alert('成功');	
					AV.Cloud.run('kongcv_insert_withdraw_deposit', {"user_id":user_id, "money":money}, {
						success: function(result) {
							console.log(result)
							var result=JSON.parse(result);
							if(result.state=='error'){
								alert(result.error)	
							}else{
								alert('成功');
							}
							
						  },
						 
					});
				};
				
						
			  },
		});
	};
}
