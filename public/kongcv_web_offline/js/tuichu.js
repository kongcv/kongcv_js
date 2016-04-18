window.onload=function(){
	var tuichu=document.getElementById('tuichu')
	tuichu.onclick=function(){
		localStorage.clear()
		alert('成功退出')
		location='index.html'
	}
		
}