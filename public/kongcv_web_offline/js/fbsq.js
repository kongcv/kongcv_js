// JavaScript Document
var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
var appkey = 'bs5tH7T0alfJyepntY5Npy37'
AV.initialize(appid, appkey);

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

function isRepeat(arr){

	var hash = {};
	
	for(var i in arr) {
	
		if(hash[arr[i]])
		
		return true;
	
	hash[arr[i]] = true;
	
	}

return false;

}

$(document).ready(function(){

	$('.datetimepicker').datetimepicker({
		lang:'ch',
		timepicker:false,
		format:'Y-m-d',
		formatDate:'Y-m-d'
	});
});


$(document).ready(function(){
	$(".qsaleft").click(function(){
		$(".qsaleft").addClass("bor_bar");
		$(".qsaright").removeClass("bor_barbor");
		$(".lx_com").show();
		$(".lx_combar").hide();
		
	});
	$(".qsaright").click(function(){
		$(".qsaright").addClass("bor_barbor");
		$(".qsaleft").removeClass(" bor_bar");
		$(".lx_combar").show();
		$(".lx_com").hide();
	})
	$("#jia").click(function(){
		$(".publ").hide();
		$(".lx_div").show();
		
	});
	$("#que1").click(function(){
		$(".lx_div").hide();
		$(".publ").show();
		
	});
	$("#que2").click(function(){
		$(".lx_div").hide();
		$(".publ").show();
		
	});
	
});

window.onload=function(){
	clikback()
	AV.Cloud.run('kongcv_get_park_type', {}, {
  	success: function(data) {
		console.log(data)
		
		var type_id2=data[1].objectId
		
  

	var cheng=document.getElementById('cheng')
	var ul1=document.getElementById('ul1')
	var ul2=document.getElementById('ul2');
	var que1=document.getElementById('que1');
	var que2=document.getElementById('que2');
	var input1=document.getElementById('input1');
	var input2=document.getElementById('input2');
	var aaLi1=ul1.getElementsByTagName('li');
	var aaLi2=ul2.getElementsByTagName('li');
	var money1=document.getElementById('money1');
	var money2=document.getElementById('money2')
	var appTime=document.getElementById('appTime');
	var appTime1=document.getElementById('appTime1');
	var da=document.getElementById('da');
	var  user_id=localStorage.getItem("e")/*use-id*/
	var method1=document.getElementById('method');
	var method2=document.getElementById('method2')
	var jing=[];
	var wei=[];
	var aname=[]
	var arrr=[]
	var arrr2=[];
	var arrr3=[];
	var arrr4=[];
	var arr2=[];
	var arr3=[];
	var shij=''
	var objectId='';
	var field=''
	var money=''
	var method=''
	var oClick=document.getElementById('click')
	var fuji=document.getElementById('fuji')
	var jia=document.getElementById('jia');
	var nnn=document.getElementById('nnnn');
	var hideimg=document.getElementById('hideimg')
	var oBlock=document.getElementById('block');
	var oNone=document.getElementById('none')
	hideimg.onclick=function(){
		keyword.value=''	
	}
	nnn.onclick=function(){
		oNone.style.display='block'	
		oBlock.style.display='none'		
	}
	oClick.onclick=function(){
			
			oNone.style.display='none'	
			oBlock.style.display='block'	
		}
	
	AV.Cloud.run('kongcv_get_hire_method', {"park_type_id":type_id2}, {
  	success: function(data) {
		
		console.log(data)
		
		for(var i=0;i<data.length;i++){
			if(data[i].hire_type==0){
				arr2.push(data[i])	
			};
			if(data[i].hire_type==1){
				arr3.push(data[i])	
			};
		};
		for(var j=0;j<arr2.length;j++){
			var li=document.createElement('li');
			li.objectId=arr2[j].objectId
			li.field=arr2[j].field
			li.innerHTML=arr2[j].method
			li.method='/'+arr2[j].method.split('/')[1]
			ul1.appendChild(li)
			
		};
		for(var a=0;a<arr3.length;a++){
			var li2=document.createElement('li');
			li2.objectId=arr3[a].objectId
			li2.field=arr3[a].field
			li2.method='/'+arr3[a].method.split('/')[1]
			li2.innerHTML=arr3[a].method
			
			ul2.appendChild(li2)
		};
		;
		input1.onclick=function(){
			ul1.style.display='block'	
			for(var i=0;i<aaLi1.length;i++){
				aaLi1[i].onclick=function(){
					objectId=this.objectId
					arrr.push(objectId)
					field=this.field
					method=this.method
					method1.innerHTML=method
					arrr2.push(field)
					
					ul1.style.display='none'
					input1.value=this.innerHTML;
				}	
			}
		};
		
		input2.onclick=function(){
			ul2.style.display='block'	
			for(var i=0;i<aaLi2.length;i++){
				aaLi2[i].onclick=function(){
				objectId=this.objectId
					arrr.push(objectId)
					field=this.field
					method=this.method
					method2.innerHTML=method
					arrr2.push(field)
					ul2.style.display='none'
					input2.value=this.innerHTML	
				}	
			}
		};
		que1.onclick=function(){
			//alert(objectId)
			//alert(field)
			//alert(method)
			
			money=money1.value+method
			arrr3.push(money)
			arrr4.push(0)
			//alert(money)
			var oD=document.createElement('div')
			oD.innerHTML='<span class="span_left">'+input1.value+'</span><span class="span_con"></span><span class="span_right">'+money+'</span><h3 class="span_scimg"><img class="imgfb" src="images/btn_shanchu.png"/></h3>'
			oD.className='div_inbar';
			oD.objectId=objectId
			
			fuji.appendChild(oD)
			
			var oH=oD.getElementsByTagName('h3')[0]
			oH.id=oH.parentNode.objectId
			var oH3=fuji.getElementsByTagName('h3')
			for(var i=0;i<oH3.length;i++){
				oH3[i].onclick=function(){
					var del=this.parentNode.objectId
					for(var a=0;a<arrr.length;a++){
						if(arrr[a]==del){
						arrr.splice(a,1);
						arrr2.splice(a,1);
						arrr3.splice(a,1);
						arrr4.splice(a,1)
						}
							
					}
					//alert(arrr)
					//alert(arrr2)
					//alert(arrr3)
					fuji.removeChild(this.parentNode)
					
				}		
				
				
			}
			input1.value='';
			money1.value='';
			
		};
		
		que2.onclick=function(){
			//alert(objectId);
			//alert(field)
			
			shij=appTime.value+' - '+appTime1.value;
			money=money2.value+method
			 arrr3.push(money)
			 arrr4.push(shij)
			var oD=document.createElement('div')
			oD.innerHTML='<span class="span_left">'+input2.value+'</span><span class="span_con">'+shij+'</span><span class="span_right">'+money+'</span><h3 class="span_scimg"><img class="imgfb" src="images/btn_shanchu.png"/></h3>'
			oD.className='div_inbar'
			oD.objectId=objectId
			
			fuji.appendChild(oD)
			
			var oH=oD.getElementsByTagName('h3')[0]
			oH.id=oH.parentNode.objectId
			var oH3=fuji.getElementsByTagName('h3')
			for(var i=0;i<oH3.length;i++){
				oH3[i].onclick=function(){
					var del=this.parentNode.objectId
					for(var a=0;a<arrr.length;a++){
						if(arrr[a]==del){
						arrr.splice(a,1);
						arrr2.splice(a,1);
						arrr3.splice(a,1);
						arrr4.splice(a,1)
						}
							
					}
					//alert(arrr)
					//alert(arrr2)
					//alert(arrr3)
					fuji.removeChild(this.parentNode)
					
				}		
				
				
			}
			
			input2.value='';
			appTime.value=''
			appTime1.value=''
			money2.value='';
			
		};
		
		console.log(arr2)
		console.log(arr3)
  		
	


	
		var oBj=document.getElementById('beij');
		var oY=document.getElementById('yuan');
		var oBlock=document.getElementById('block');
		var oNone=document.getElementById('none')
		
		var keyWord=document.getElementById('keyword')
		var fabu=document.getElementById('fabu')
		var park_detail=document.getElementById('park_detail')
		var datetimepicker=document.getElementById('datetimepicker')
		var datetimepicker2=document.getElementById('datetimepicker2');
		var tail_num=document.getElementById('tail_num');
		var park_area=document.getElementById('park_area');
		var park_height=document.getElementById('park_height');
		var gate_card=document.getElementById('gate_card');
		var park_struct=0
		var Bok=true;
		
		
		oBj.onclick=function(){
			if(Bok){
				move(oY,{left:9})
				
				Bok=false
			}else{
				move(oY,{left:28})	
				
				Bok=true
			};
		};
		
		var auto = new AMap.Autocomplete({
			input: "keyword"
		});
		 AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
			function select(e) {
				console.log(e.poi)
				var str=e.poi.district
				var arr=str.split('市')[0]
				if(arr.indexOf('省')!=-1){
					var arr1=arr.split('省')[1]	
				};
				if(arr.indexOf('省')==-1){
					var arr1=arr	
				}
				
				cheng.innerHTML=arr1+'市'
				var val=e.poi.name
				oClick.innerHTML=val
				 for (var key in e.poi.location){
					//alert(key); alert(json[key]);
					if(e.poi.location[key]>90){
						jing.push(e.poi.location[key])	;
					}else{
						wei.push(e.poi.location[key])	
					};
				};
				//alert(jing[1])
				//alert(wei[1])
				var latitude=wei[1]
				var longitude=jing[1]
				oNone.style.display='block'	
				oBlock.style.display='none'		
				
			
		
		
	var kuang1=document.getElementById('kuang1')
	var tan1=document.getElementById('tan1')
	var aLi1=tan1.getElementsByTagName('li');
	var kuang=document.getElementById('kuang')	
	var tan=document.getElementById('tan')
	var aLi=tan.getElementsByTagName('li');
	var arr=[];
	var arr1=[];
	var park_description=document.getElementById('park_description');
	var que=document.getElementById('que')
	for(var i=0;i<aLi.length;i++){
		aLi[i].onclick=function(){
			this.className='on'
			
			arr.push(this.innerHTML)	
		}	
	}
	que.onclick=function(){
		tan.style.display='none'
		var json={};
		for(var i=0;i<arr.length;i++){
			json[arr[i]]=1	
		}
		for(var i in json){
			arr1.push(i)	
		}
		kuang.innerHTML=arr1
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=''	
		}
		arr=[]
		arr1=[]
	}
	kuang.onclick=function(){
		kuang.innerHTML=''
		tan.style.display='block'	
	}
	
	kuang1.onclick=function(){
			tan1.style.display='block'	
		}	
		for(var i=0;i<aLi1.length;i++){
			aLi1[0].onclick=function(){
					park_struct=0	
					tan1.style.display='none'
					kuang1.innerHTML=this.innerHTML
				};	
				aLi1[1].onclick=function(){
					park_struct=1
					tan1.style.display='none'
					kuang1.innerHTML=this.innerHTML
				}	
		}
		
		
		
		fabu.onclick=function(){
		
			var phone=localStorage.getItem("phone")
			var address=keyWord.value;/*地址*/
			var detail=park_detail.value;
			var start=datetimepicker.value+' '+'00:00:00';
			var end=datetimepicker2.value+' '+'00:00:00';
			var startD=new Date(start)
			var endD=new Date(end)
			if(endD.getTime()<startD.getTime()){
				alert('停止时间不能小于开始时间')	
				return
			}
			var description=park_description.value;
			var hire=kuang.innerHTML;	
			var num=tail_num.value;
			var no_hire=hire.split(',');	
			var area=Number(park_area.value);
			var height=Number(park_height.value);
			var card=gate_card.value;
			var city=cheng.innerHTML
			
			
			if(isRepeat(arrr)){
				alert('出租类型有重复，请删除重复内容')
				return
			}
		
			
			//alert(latitude)
			//alert(longitude)
			/*alert(start)
			alert(end)
			
			alert(arrr2)
			alert(arrr3)
			alert(arrr4)*/
			alert(Bok)
			AV.Cloud.run('kongcv_insert_parkdata', {"user_id":user_id,"worker_id":phone,"address":address,"park_detail":detail,"park_description":description,"location_info":{"__type":"GeoPoint","latitude":latitude,"longitude":longitude}, "hire_start":start, "hire_end":end,"no_hire":no_hire,"tail_num":num,"city":city, "normal":Bok, "park_area":area,"park_height":height, "gate_card":card,"hire_method_id":arrr,"hire_field":arrr2,"hire_price":arrr3,"hire_time":arrr4,"park_struct":park_struct,"personal":1,"mode":"community"}, {
  			success: function(data) {
				var date=JSON.parse(data)
				if(date.state=='ok'){
					alert('发布成功')
				}else{
					alert(date.error)
				}
				console.log(data)	
			}
			
		})	
	
			//alert(user_id)									/*user_id*/
//
//			alert(address)									/*停车位地址*/
//
//			alert(park_detail.value);	   					/*停车位地址详细补充*/
//
//			alert(park_description.value)					/*车位描述*/
//
//			alert(latitude)									/*精度*/
//
//			alert(longitude)								/*纬度*/
//
			
//			alert(start)									/*出租起始时间*/
//
//			
//			alert(end)										/*出租起始时间*/	
//	
													
//			alert(no_hire)									/*不可组*/
//
		
//
//			alert(num)										/*限行尾号*/					
//
//			alert(Bok)										/*正规车位*/
//
//			alert(park_area.value)							/*面积*/
//
//			alert(park_height.value)						/*限高*/
//
//			alert(gate_card.value)							/*门禁卡*/
//
//			alert(objectId)									/*出租类型的objectId*/
//
//			alert(money)									/*价格*/
//
//			var hire_time=shij.split()						
//			alert(hire_time)								/*时间段*/
//
//			alert(struct)									/*地上or地下*/
//			
		
			
		}
		
	};
	},
  	
});	
		
		
	},
});		
	}
	