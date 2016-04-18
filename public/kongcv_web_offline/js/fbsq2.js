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
 $(function () {
			var currYear = (new Date()).getFullYear();	
			var opt={};
			opt.date = {preset : 'date'};
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'android-ics light', //皮肤样式
		        display: 'modal', //显示方式 
		        mode: 'scroller', //日期选择模式
				dateFormat: 'yyyy-mm-dd',
				lang: 'zh',
				showNow: true,
				nowText: "今天",
		        startYear: currYear - 10, //开始年份
		        endYear: currYear + 10 //结束年份
			};

		  	$("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
		  	var optDateTime = $.extend(opt['datetime'], opt['default']);
		  	var optTime = $.extend(opt['time'], opt['default']);
		    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
		    $("#appTime").mobiscroll(optTime).time(optTime);
			$("#appTime1").mobiscroll(optTime).time(optTime);
        });

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
		
		var type_id=data[1].objectId
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
	var method2=document.getElementById('method2');
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
	var fuji=document.getElementById('fuji');
	var oClick=document.getElementById('click')
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
	var data=localStorage.getItem("data");
	var park_detail=document.getElementById('park_detail');
	var datetimepicker=document.getElementById('datetimepicker');
	var datetimepicker2=document.getElementById('datetimepicker2');
	var data=JSON.parse(data)
	console.log(data);
	var park_id=data.objectId
	var latitude=data.location.latitude
	var longitude=data.location.longitude
	oClick.innerHTML=data.address.split('&')[0];
	cheng.innerHTML=data.city;
	park_detail.value=data.address.split('&')[1];
	kuang.innerHTML=data.no_hire
	var date=new Date(data.hire_start)
	var hire_start=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	var date1=new Date(data.hire_end)
	var hire_end=date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate()
	datetimepicker.value=hire_start
	datetimepicker2.value=hire_end;
	park_area.value=data.park_area
	park_height.value=data.park_height;
	tail_num.value=data.tail_num
	gate_card.value=data.gate_card;
	park_description.value=data.park_description
	var oY=document.getElementById('yuan');
	var Bok=data.normal;
	if(data.struct==0){
		kuang1.innerHTML='地上'	
	}else{
		kuang1.innerHTML='地下'	
	};
	if(data.normal){
		move(oY,{left:28})	
	}else{
		ssmove(oY,{left:9})		
	};
	
	for(var i=0;i<aLi1.length;i++){
			aLi1[0].onclick=function(){
				struct =0	
				tan1.style.display='none'
				kuang1.innerHTML=this.innerHTML
			};	
			aLi1[1].onclick=function(){
				struct =1
				tan1.style.display='none'
				kuang1.innerHTML=this.innerHTML
			}	
	}
	//解析hire_method数组
	AV.Cloud.run('kongcv_get_hire_method', {"park_type_id":type_id}, {
  		success: function(type) {
			var hire_method=JSON.parse(data.hire_method)
			console.log(type)
			for(var i=0;i<hire_method.length;i++){
				for(var j=0;j<type.length;j++){
					//alert(type[j].objectId)
					if(hire_method[i].objectId==type[j].objectId){
						var number=j
					}
						
				}
					
				var oD=document.createElement('div')
					oD.innerHTML='<span class="span_left">'+type[number].method+'</span><span class="span_con"></span><span class="span_right">'+data.hire_price[i]+'</span><h3 class="span_scimg"><img class="imgfb" src="images/btn_shanchu.png"/></h3>'
					oD.className='div_inbar';
					oD.objectId=type[number].objectId
					
					fuji.appendChild(oD)
					arrr.push(type[number].objectId)
					arrr2.push(type[number].field)
					arrr3.push(data.hire_price[i])
					arrr4.push(data.hire_time[i]);
					
					var oH=oD.getElementsByTagName('h3')[0]
					oH.id=oH.parentNode.objectId
					var oH3=fuji.getElementsByTagName('h3')
					for(var j=0;j<oH3.length;j++){
						oH3[j].onclick=function(){
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
							//alert(arrr4)
							fuji.removeChild(this.parentNode)
							
						}		
						
						
					}
					
					
			};
			//222222222222222222222222222222222
			
					
			
			
			 
						//alert(arrr)
						//alert(arrr2)
						//alert(arrr3)
						//alert(arrr4)	
			}
				
				
			
			
		
	})
	
	//1111111111111111111111111111111
	
	
	
	
	AV.Cloud.run('kongcv_get_hire_method', {"park_type_id":type_id}, {
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
			money1.value=''
			
		}
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
			money2.value=''
		};
		
		console.log(arr2)
		console.log(arr3)
  	
	


	
		var oBj=document.getElementById('beij');
		
		var oBlock=document.getElementById('block');
		var oNone=document.getElementById('none')
	
		var keyWord=document.getElementById('keyword')
		var fabu=document.getElementById('fabu')
		
		
		var tail_num=document.getElementById('tail_num');
		var park_area=document.getElementById('park_area');
		var park_height=document.getElementById('park_height');
		var gate_card=document.getElementById('gate_card');
		var struct =0
		
		oClick.onclick=function(){
			
			oNone.style.display='none'	
			oBlock.style.display='block'	
		}
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
				 latitude=e.poi.location.lat
				 longitude=e.poi.location.lng
				oNone.style.display='block'	
				oBlock.style.display='none'	
			}
				
			
		
		
		fabu.onclick=function(){
			var cclick=document.getElementById('click')
			var cheng=document.getElementById('cheng')
			var phone=localStorage.getItem("phone")
			var address=cclick.innerHTML;/*地址*/
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
			
			
			//alert(start)
			//alert(end)
			
			//alert(arrr)
			//alert(arrr2)                                    
			//alert(arrr3)
			//alert(arrr4)
			
			

   			console.log({"user_id":user_id,"park_id":park_id,"address":address,"park_detail":detail,"park_description":description,"location_info":{"__type":"GeoPoint","latitude":latitude,"longitude":longitude}, "hire_start":start, "hire_end":end,"no_hire":no_hire,"tail_num":num,"city":city, "normal":Bok, "park_area":area,"park_height":height, "gate_card":card,"hire_method_id":arrr,"hire_field":arrr2,"hire_price":arrr3,"hire_time":arrr4,"park_struct":struct,"mode":"community"})
			
			AV.Cloud.run('kongcv_put_parkdata', {"user_id":user_id,"park_id":park_id,"address":address,"park_detail":detail,"park_description":description,"location_info":{"__type":"GeoPoint","latitude":latitude,"longitude":longitude}, "hire_start":start, "hire_end":end,"no_hire":no_hire,"tail_num":num,"city":city, "normal":Bok, "park_area":area,"park_height":height, "gate_card":card,"hire_method_id":arrr,"hire_field":arrr2,"hire_price":arrr3,"hire_time":arrr4,"park_struct":struct,"mode":"community"}, {
  			success: function(data) {
				var date=JSON.parse(data)
				if(date.state=='error'){
					alert(date.error)	
				}else if(date.state=='ok'){
					alert(date.msg)
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
		
	
	},
  	
});	
	},
});			
		
		
	}
	