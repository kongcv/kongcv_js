	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);
	
	window.onload=function(){
		var user_id=localStorage.getItem("e")
		
		var fasong=document.getElementById('fasong')
		
		fasong.onclick=function(){
			var feedback=document.getElementById('feedback');
			var feed=feedback.value
			AV.Cloud.run('kongcv_insert_feedback',{"user_id":user_id, "feedback":feed}, {
			success: function(data) {
				console.log(data)
				var data=JSON.parse(data)
				if(data.state=='error'){
					alert(data.error)	
				}else{
					location='wd_sz.html';	
				}
			 }
		 });
		};
	};