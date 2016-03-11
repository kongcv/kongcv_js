
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
	var  phone=localStorage.getItem("phone")
	//alert(phone)
	var number=document.getElementById('number')
	number.innerHTML=phone
	
}