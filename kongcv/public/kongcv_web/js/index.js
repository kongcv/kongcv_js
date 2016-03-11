/*轮播图*/


var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
AV.initialize(appid, appkey);


//

/*停车类型*/
function stopvehicle() {
	AV.Cloud.run('kongcv_get_park_type', {}, {
  	success: function(data) {
		console.log(data)
		var type_id=data[0].objectId
		var type_id2=data[1].objectId
		localStorage.setItem("type_id",type_id)
		localStorage.setItem("type_id2",type_id2)
		var mode='curb'
		var stopve=JSON.stringify(data);//转成string字符串 输出stopve可以弹出data里面的值
		var stopSet=eval(stopve);//转成可以for循环的集合，eval()函数可计算某个字符串,输出stopSet,可以弹出2个object的对象
		var stop1=stopSet[0];//获取第一个对象,输出stop1，可弹出一个对象object
		var picture=stop1.name;//第一个对象中的name属性值,输出picture，可以弹出name的第一个值：community
		var stopId=stop1.objectId;//第一个对象中的objectId属性值,输出stopId，可以弹出objectId里的值
		var stopAt=stop1.createdAt;//第一个对象中的createdAt属性值，
		var upstopAt=stop1.updatedAt;//第一个对象中的updatedAt属性值
		var url1=stop1.picture.url;//获取图片路径
		var oW=document.getElementById('www');
		var oWW=oW.getElementsByTagName('img')
		
		for( var i=0;i<oWW.length;i++){
			localStorage.setItem("a",mode)
			oWW[0].onclick=function(){
				mode='curb'
				localStorage.setItem("a",mode)
				
				
			}	
			
			oWW[1].onclick=function(){
				mode='community'
				localStorage.setItem("a",mode)
				
			}		
		}
		//扩展循环data集合
		for(var i=0; i<stopSet.length; i++){
			$(".qjd"+i).attr("src",stopSet[i].picture_small.url);	
			//新添的代码
			var _html="<input id='V_qjd"+i+"'type='hidden' value='"+stopSet[i].objectId+"'/>";
			$(".qjd"+i).append(_html);
		}
		soopveh('V_qjd0');//默认为道路
  	},
  	
});
}
//停车类型的出租方法


function soopveh(id){
	
	if(id=='V_qjd0'){
	var objectId=$("#"+id).val();
	AV.Cloud.run('kongcv_get_hire_method', {"park_type_id":objectId}, {
  	success: function(data) {
		console.log(data)
		var oQ=document.getElementById('qqqq');
		oQ.innerHTML=''
		for(var i=0;i<data.length;i++){
				//alert(data[i].picture_curb._url)
				var Li=document.createElement('li')
				Li.innerHTML='<div class="title" ><a href="#" class="bor_boom"><img class="imgbar0" src="'+data[i].picture_curb._url+'"/></a></div>'
				Li.field=data[i].field
				Li.objectId=data[i].objectId
				Li.hire_type=data[i].hire_type
				oQ.appendChild(Li)
				
				
				
					
		}
		var aLi=oQ.getElementsByTagName('li')	;
		for(var i=0;i<aLi.length;i++){
			aLi[i].onclick=function(){
				var objectId=this.objectId
				var hire_type=this.hire_type
			
				var field=this.field
				localStorage.setItem("hire_type",hire_type)
				localStorage.setItem("b",objectId)
				localStorage.setItem("field",field)
				//alert(field)
				//alert(hire_type)
				//alert(objectId)
				//return
				location='suoobar.html'
				
			}	
			
		}
  	},
  	
});	
	}else{
		var objectId=$("#"+id).val();
	AV.Cloud.run('kongcv_get_hire_method', {"park_type_id":objectId}, {
  	success: function(data) {
		
		var oQ=document.getElementById('qqqq');
		oQ.innerHTML=''
		
		console.log(data)
		
		
		for(var i=0; i<data.length; i++){
				var Li=document.createElement('li')
				Li.innerHTML='<div class="title" ><a href="#" class="bor_boom"><img class="imgbar0" src="'+data[i].picture_curb._url+'"/></a></div>'
				Li.field=data[i].field
				Li.objectId=data[i].objectId
				Li.hire_type=data[i].hire_type
				oQ.appendChild(Li)
					
		}
		var aLi=oQ.getElementsByTagName('li')
		for(var i=0;i<aLi.length;i++){
			aLi[i].onclick=function(){
				var objectId=this.objectId
				var hire_type=this.hire_type
			
				var field=this.field
				localStorage.setItem("hire_type",hire_type)
				localStorage.setItem("b",objectId)
				localStorage.setItem("field",field)
				//alert(field)
				//alert(hire_type)
				//alert(objectId)
				//return
				location='suoobar.html'
				
			}	
			
		}
  	},
});	
	}
	
}





//底部点击出背景图片
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