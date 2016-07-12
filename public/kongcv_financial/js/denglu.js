
window.onload=function(){
	var user=document.getElementById('user')
	var pass=document.getElementById('pass')
	var deng=document.getElementById('deng')
	deng.onclick=function(){
		var user_name=user.value
		var passwd=pass.value
		if(user_name==''){
			alert('用户名不能为空')
			return	
		};
		if(passwd==''){
			alert('密码不能为空')
			return	
		};
		console.log({"user_name":user_name, "passwd":passwd, "role":"release_financial"})
		AV.Cloud.run('kongcv_manage_signup', {"user_name":user_name, "passwd":passwd, "role":"release_financial"}, {
			success: function(data) {
				console.log(data)
				var data=JSON.parse(data)
				if(data.state=='failed'){
					alert(data.msg)
				}else if(data.state=='error'){
					alert(data.error)
				}else{
					
					addCookie("Ce","a")
					location='Withdrawals.html';	
				}	
			}	
		})	
	}	
}