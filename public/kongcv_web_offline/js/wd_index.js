// JavaScript Document
//底部点击出背景图片、
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

$(document).ready(function(){
	clikback();
});  
window.onload=function(){
	var name=document.getElementById('name');
	var touxiang=document.getElementById('touxiang');
	var  phone=localStorage.getItem("phone")
	var  user_id=localStorage.getItem("e")
	var token=localStorage.getItem("token")
	var data=http_data('https://api.leancloud.cn/1.1/functions/kongcv_get_userinfo', 'post', '{"mobilePhoneNumber":"'+phone+'","user_id":"'+user_id+'"}',token)
	
	console.log(data)
	var response=JSON.parse(data.response)
	console.log(response)
	
	if(response.result.image){
		touxiang.src=response.result.image.url	
	}else{
		touxiang.src="images/Bitmap Copy.png"	
	}	
	if(data.response){
		name.innerHTML=response.result.username;
	}else{
		name.innerHTML='未有用户名'
		
	}
	name.onclick=function(){
		location='wd_xgnc.html'	
	}
	
}
