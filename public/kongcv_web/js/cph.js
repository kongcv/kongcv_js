// JavaScript Document


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

window.onload=function(){
	$(".gcphimg").click(function(){
		$(".cphtext").val(" ");
	
	});
	var cph=document.getElementById('cph')
	var tijiso=document.getElementById('tijiao')
	tijiao.onclick=function(){
		var license_plate=cph.value
		var token=localStorage.getItem("token");
		
		if(cph.value==''){
			alert('车牌号不能为空')
			return	
		};
		var data=http_data('https://api.leancloud.cn/1.1/functions/kongcv_put_userinfo', 'post', '{"license_plate":"'+license_plate+'","version":"web1.0.0"}',token)
		console.log(data)
		var response=JSON.parse(data.response)
		console.log(response)
		var result=JSON.parse(response.result)
		if(result.state=='ok'){
			location='wd_sz.html';		
		}else{
			alert(result.error)
		}	
	}
	
	
}