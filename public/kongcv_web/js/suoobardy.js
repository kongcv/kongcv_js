window.onload=function(){
	var jing=[]
	var wei=[]
	var oUl=document.getElementById('uul');
	
	var keyword=document.getElementById('keyword')
	
	$(document).ready(function(){
		clikback();//底部点击出背景图
		
	});
	  var map = new AMap.Map("container", {
        resizeEnable: true
    });
    //为地图注册click事件获取鼠标点击出的经纬度坐标
    
    var auto = new AMap.Autocomplete({
        input: "keyword"
    });
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
		
        if (e.poi && e.poi.location) {
			
			location='ditu.html'
			var address=e.poi.name
			localStorage.setItem("add",address)
			map.setCenter(e.poi.location);
			 for (var key in e.poi.location){
					//alert(key); alert(json[key]);
					if(e.poi.location[key]>90){
						jing.push(e.poi.location[key])	;
					}else{
						wei.push(e.poi.location[key])	
					};
				};
			var j=wei[1]
			var w=jing[1]
			localStorage.setItem("c",j)
			localStorage.setItem("d",w)
			
			
        }
		
    
	
	
	};
	
	
	
	
	//滑动的调用
	var tijiao=document.getElementById('tijiao')
	var keyword=document.getElementById('keyword')
	tijiao.onclick=function(){
		if(keyword.value=='不输入即为周边搜索'||keyword.value==''){
			 map.plugin('AMap.Geolocation', function() {
			geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				buttonOffset: new AMap.Pixel(100, 200),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				buttonPosition:'RB'
			});
			map.addControl(geolocation);
			geolocation.getCurrentPosition();
			AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
			      //返回定位出错信息
		});	
		function onComplete(data) {
			console.log(data)
		
			 for (var key in data.position){
					//alert(key); alert(json[key]);
					if(data.position[key]>90){
						jing.push(data.position[key])	;
					}else{
						wei.push(data.position[key])	
					};
				};
			var j=wei[1]
			var w=jing[1]
			
			localStorage.setItem("c",j)
			localStorage.setItem("d",w);
			location='ditu.html'
       
    }	
		}
		
	}
	function hide_bar(){
	$('.abarright').click(function(){
			$('.text_bar').val(' ');	
	});
	
}
/*车位搜索*/
		var fabu=document.getElementById('fabu')
		var wode=document.getElementById('wode')
		var  user_id=localStorage.getItem("e")

		fabu.onclick=function(){
			if(user_id==null){
				location='enroll.html'
			}else{
				location='fbsq.html'
			}
		}
		wode.onclick=function(){
			if(user_id==null){
				location='enroll.html'	
			}else{
				location='wd_index.html'
			}
		}

	
	
	
}