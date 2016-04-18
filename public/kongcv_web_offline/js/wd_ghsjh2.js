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
	var  phone=localStorage.getItem("phone")
	var  user_id=localStorage.getItem("e")
	var token=localStorage.getItem("token");
	var number=document.getElementById('number')
	var tijiap=document.getElementById('tijiao');	
	tijiao.onclick=function(){
		if(number.value==''){
			alert('验证码不能为空');
			return;
		};
		var smsCode=number.value
		
		console.log('{"smsCode":"'+smsCode+'"}')
		var data2=http_data('https://api.leancloud.cn/1.1/functions/kongcv_verify_mobile', 'post', '{"smsCode":"'+smsCode+'"}',token)	
		console.log(data2)
		var response=JSON.parse(data2.response)
		var result=JSON.parse(response.result)
		console.log(result)
		if(result.state=='ok'){
			alert(result.msg)
			location='wd_ghsjh3.html'		
		}else{
			alert(result.error)
			location='wd_ghsh4.html'	
		};
		
		
	}	
}