// JavaScript Document
function http_data(url, method, data,token) {     
    var xmlhttp;     
    xmlhttp = new XMLHttpRequest();     
    xmlhttp.open(method, url, false);     
    xmlhttp.setRequestHeader("Content-Type","application/json");     
    xmlhttp.setRequestHeader("X-LC-Id","ATcs8k4nK1f2VFd69QtNHcuN");     
    xmlhttp.setRequestHeader("X-LC-Key","bs5tH7T0alfJyepntY5Npy37");   
	xmlhttp.setRequestHeader("X-AVOSCloud-Session-Token",token); 	  
    xmlhttp.send(data);     
    return xmlhttp;     
}
window.onload=function(){
	var user_name=document.getElementById('user_name');
	var tijiao=document.getElementById('tijiao')
	tijiao.onclick=function(){
		var token=localStorage.getItem("token")
		var name=user_name.value
		var version=localStorage.getItem("version")
		if(name==''){
			alert('昵称不能为空')
			return	
		}
		var data=http_data('https://api.leancloud.cn/1.1/functions/kongcv_put_userinfo', 'post', '{"user_name":"'+name+'","version":"'+version+'"}',token)
		
		console.log(data)
		var response=JSON.parse(data.response)
		console.log(response)
		var result=JSON.parse(response.result)
		if(result.state=='ok'){
			location='wd_index.html'	
		}else{
			alert(result.error)
		}
		
	}
}