
function http_data(url, method, data,token) {     
    var xmlhttp;     
    xmlhttp = new XMLHttpRequest();     
    xmlhttp.open(method, url, false);     
    xmlhttp.setRequestHeader("Content-Type","application/json");     
    xmlhttp.setRequestHeader("X-LC-Id","VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz");     
    xmlhttp.setRequestHeader("X-LC-Key","jVfxeSyYnzW4sBHNlVK6l3s3");   
	xmlhttp.setRequestHeader("X-AVOSCloud-Session-Token",token); 	  
    xmlhttp.send(data);     
    return xmlhttp;     
}
$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){   
  		city=remote_ip_info.city//城市  
})
window.onload=function(){
	var  phone=localStorage.getItem("phone")
	//alert(phone)
	var  user_id=localStorage.getItem("e")
	var token=localStorage.getItem("token")
	var number=document.getElementById('number')
	var tijiao=document.getElementById('tijiao')
	//获取用户信息
	var data=http_data('https://api.leancloud.cn/1.1/functions/kongcv_get_userinfo', 'post', '{"mobilePhoneNumber":"'+phone+'","user_id":"'+user_id+'"}',token)
	if(data.response){
		var response=JSON.parse(data.response)
		number.placeholder='已绑定手机号: '+response.result.mobilePhoneNumber
		console.log(response)
	};
	//更改手机号
	tijiao.onclick=function(){
		var mobilePhoneNumber=number.value;
		if(mobilePhoneNumber==''){
			alert('手机号不能为空');
			return
		};
		
		var data2=http_data('https://api.leancloud.cn/1.1/functions/kongcv_put_userinfo', 'post', '{"mobilePhoneNumber":"'+mobilePhoneNumber+'","version":"web1.0.0", "city":"'+city+'"}',token)
		console.log(data2)
		var response=JSON.parse(data2.response)
		var result=JSON.parse(response.result)
		console.log(result)
		if(result.state=='ok'){
			localStorage.setItem("phone",mobilePhoneNumber)
			alert(result.msg)
			location='wd_ghsjh2.html'		
		}else{
			alert(result.error)
			return
		};
			
		
	}
	
}