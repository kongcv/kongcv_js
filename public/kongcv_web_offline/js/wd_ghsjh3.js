
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
	//alert(phone)
	var number=document.getElementById('number')
	number.innerHTML=phone
	
}