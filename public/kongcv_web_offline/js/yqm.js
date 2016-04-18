	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);
	window.onload=function(){
		var user_id=localStorage.getItem("e")
		var  phone=localStorage.getItem("phone")
		var fasong=document.getElementById('fasong')
	
		fasong.onclick=function(){
			
			var feedback=document.getElementById('feedback');
			var feed=feedback.value
			
			AV.Cloud.run('kongcv_insert_invite_code', {"invite_code":feed, "mobilePhoneNumber":phone, "user_id":user_id}, {
			success: function(data) {
				console.log(data)
				if(typeof(data)=='string'){
					location='wd_sz.html';	
				}else{
					alert('同一手机只能输入一次邀请码')	
				}
				
			 }
		 });
		};
	};