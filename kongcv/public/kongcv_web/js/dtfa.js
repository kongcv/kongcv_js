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
			a1.href=data[0].service_file._url
			a2.href=data[1].service_file._url
			
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
			
			alert("发送成功");
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
					
					  var obj = jQuery.parseJSON(data);
					  console.log(obj)
					  
						if(obj.state=='error'){
							alert(obj.error)	
						}else{
						 
						  var token = obj.sessionToken;
						  
						  var uerbar=obj.user_id;
						  localStorage.setItem("e",uerbar)
						  localStorage.setItem("token",token)
						  var  phone=localStorage.getItem("phone")
						  
						  location='index.html';
						 
						}
						
					
				 },
			 });
			
			
		
		};
	};