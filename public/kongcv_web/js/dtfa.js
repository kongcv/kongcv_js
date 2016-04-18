	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
	AV.initialize(appid, appkey);





window.onload=function(){
	var shou=document.getElementById('test') 
	var oD=document.getElementById('dxyz');
	var a1=document.getElementById('a1')
	var a2=document.getElementById('a2')
	 AV.Cloud.run('kongcv_get_service_file', {}, {
        success: function(data) {
			console.log(data)
			for(var i=0;i<data.length;i++){
				if(data[i].service_file._name=="kongcv_platform_services.html"){
					a1.href=data[i].service_file._url	
				};	
			};
			for(var j=0;j<data.length;j++){
				if(data[j].service_file._name=="kongcv_privacy_policy.html"){
					a2.href=data[j].service_file._url
				};	
			};
			
         },
        
     });
	oD.onclick=function(){
		var mobile = $("#test").val();
	  //调用成功，得到成功的应答data
			 if($("#test").val()==""){
				return false;
			 }
			 if(!/^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(mobile))
			{
				return false;
			}
     AV.Cloud.run('kongcv_get_smscode', {mobilePhoneNumber: mobile}, {
        success: function(data) {
			var data=JSON.parse(data)
			if(data.state='ok'){
				alert('发送成功')	
			}else{
				alert('发送失败')	
			}
         },
         
     });
		
	};
	var loga=document.getElementById('logoa');
		
		loga.onclick=function(){
			var phone=shou.value;
			localStorage.setItem("phone",phone)
			var mobile = $("#test").val();
			var valiCode = $("#yzm").val()
			
			AV.Cloud.run('kongcv_signup', {mobilePhoneNumber: mobile,smsCode:valiCode}, {
				success: function(data) {
					var data=JSON.parse(data)
					console.log(data)
					if(data.state=='failed'){
						alert(data.msg)	
					}else{
					 
					  var token = data.sessionToken;
					  var uerbar=data.user_id;
					  localStorage.setItem("e",uerbar)
					  localStorage.setItem("token",token)
					  var  phone=localStorage.getItem("phone")
					  location='index.html';
						 
						}
						
					
				 },
			 });
			
			
		
		};
	};