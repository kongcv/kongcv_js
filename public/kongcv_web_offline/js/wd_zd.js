// JavaScript Document
	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);
	
function bu(iNom){
	if(iNom<10){
		return '0'+iNom	
	}else{
		return iNom	
	}	
}
window.onload=function(){
	$(".div_left").click(function(){
		$(".sjimg1").addClass("tianjialei"); 
		$(".sjimg2").removeClass("tianjialei1");
		$(".div_wdzd").show();
		$(".div_wdzd1").hide();
	});
	$(".div_right").click(function(){
		$(".sjimg2").addClass("tianjialei1");
		$(".sjimg1").removeClass("tianjialei"); 
		$(".div_wdzd1").show();
		$(".div_wdzd").hide();
	});
	$(".divin_left").click(function(){
		$(".divin_left").addClass("ccdi1");
		$(".divin_right").removeClass("ccdi2");
		$(".xxzd").show();
		$(".xxzd2").hide();
	});
	$(".divin_right").click(function(){
		$(".divin_right").addClass("ccdi2");
		$(".divin_left").removeClass("ccdi1");
		$(".xxzd2").show();
		$(".xxzd").hide();
	});
	$(".divin_left1").click(function(){
		$(".divin_left1").addClass("ccdi3");
		$(".divin_right1").removeClass("ccdi4");
		$(".xxzd1").show();
		$(".xxzd3").hide();
	});
	$(".divin_right1").click(function(){
		$(".divin_right1").addClass("ccdi4");
		$(".divin_left1").removeClass("ccdi3");
		$(".xxzd3").show();
		$(".xxzd1").hide();
	});
	
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	year.innerHTML=oDate.getFullYear()
	mon.innerHTML=bu(oDate.getMonth()+1);
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	
	console.log(user_id)
	//进来默认需要一个接口
	 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"customer","skip":0, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli9">'+minutes+'</span><span class="ulli10">'+money+'<span class="yycl">元</span></span><span class="ulli11">'+hours+'</span><span class="ulli12">'+address+'</span>'
				oUl2.appendChild(oLi)
			}
			
			
         },
        
     });	 
	 //当我点击道路用一个接口
	 curb.onclick=function(){
		 oUl2.innerHTML=''
		 var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00';
		 
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"customer","skip":0, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl2.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli9">'+minutes+'</span><span class="ulli10">'+money+'<span class="yycl">元</span></span><span class="ulli11">'+hours+'</span><span class="ulli12">'+address+'</span>'
				oUl2.appendChild(oLi)
			}
			
			
         },
         
     });	 
	};
	//当我点社区用一个接口
	community.onclick=function(){
		oUl.innerHTML=''
		query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
		 
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"customer","skip":0, "limit":5,"mode":"community", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_community){
					park_community=JSON.parse(data[i].park_community)
					var address=park_community.address.split('&')[0]
				}else{
					address=''	
				}
				
				var money=data[i].price
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli1">'+minutes+'</span><span class="ulli2">'+money+'<span class="yycl">元</span></span><span class="ulli3">'+hours+'</span><span class="ulli4">'+address+'</span>'
				oUl.appendChild(oLi)
			}
			
			
         },
         
     });	
	};
	//当我点出租用一个接口
	hirer.onclick=function(){
		oUl4.innerHTML=''
		 var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00';
		 
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"hirer","skip":0, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
				
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli13">'+minutes+'</span><span class="ulli14">'+money+'<span class="yycl">元</span></span><span class="ulli15">'+hours+'</span><span class="ulli16">'+address+'</span>'
				oUl4.appendChild(oLi)
			}
			
			
         },
        
     });	 
	};
	//当我点出租里的道路一个接口
	curb2.onclick=function(){
		oUl4.innerHTML=''
		 var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00';
		 
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"hirer","skip":0, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
				
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli13">'+minutes+'</span><span class="ulli14">'+money+'<span class="yycl">元</span></span><span class="ulli15">'+hours+'</span><span class="ulli16">'+address+'</span>'
				oUl4.appendChild(oLi)
			}
			
			
         },
         
     });	 
	};
	//当我点出租里的社区一个接口	
	community2.onclick=function(){
		oUl3.innerHTML=''
		query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
		 
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"hirer","skip":0, "limit":5,"mode":"community", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_community){
					park_community=JSON.parse(data[i].park_community)
					var address=park_community.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli5">'+minutes+'</span><span class="ulli6">'+money+'<span class="yycl">元</span></span><span class="ulli7">'+hours+'</span><span class="ulli8">'+address+'</span>'
				oUl3.appendChild(oLi)
			}
			
			
         },
         
     });	
	};
	
	
};
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var skip=0
	var skip2=0
	var skip3=0
	var skip4=0
function pullDownAction () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip=0
		//alert('下拉1')
		AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"customer","skip":0, "limit":5,"mode":"community", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_community){
					var park_community=JSON.parse(data[i].park_community)
					var address=park_community.address.split('&')[0]
				}else{
					var address=''	
				}
				
				var money=data[i].price
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli1">'+minutes+'</span><span class="ulli2">'+money+'<span class="yycl">元</span></span><span class="ulli3">'+hours+'</span><span class="ulli4">'+address+'</span>'
				oUl.appendChild(oLi)
			}
			
			
         },
         
     });
	
	}, 100);
}

function pullUpAction () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip+=5
		//alert(skip)	
		AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"customer","skip":skip, "limit":5,"mode":"community", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_community){
					var park_community=JSON.parse(data[i].park_community)
					var address=park_community.address.split('&')[0]
				}else{
					var address=''	
				}
				
				var money=data[i].price
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli1">'+minutes+'</span><span class="ulli2">'+money+'<span class="yycl">元</span></span><span class="ulli3">'+hours+'</span><span class="ulli4">'+address+'</span>'
				oUl.appendChild(oLi)
			}
			
			
         },
         
     });
	
			
	}, 100);	
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	

	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
							
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	

};
function pullDownAction2 () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip2=0
		//alert('下拉2')
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"customer","skip":0, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl2.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli9">'+minutes+'</span><span class="ulli10">'+money+'<span class="yycl">元</span></span><span class="ulli11">'+hours+'</span><span class="ulli12">'+address+'</span>'
				oUl2.appendChild(oLi)
			}
			
			
         },
        
     });	 
	
	}, 100);
}

function pullUpAction2 () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip2+=5
		//alert(skip2)	
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"customer","skip":skip2, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl2.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli9">'+minutes+'</span><span class="ulli10">'+money+'<span class="yycl">元</span></span><span class="ulli11">'+hours+'</span><span class="ulli12">'+address+'</span>'
				oUl2.appendChild(oLi)
			}
			
			
         },
         
     });	 
	
			
	}, 100);	
}

function loaded2() {
	pullDownEl = document.getElementById('pullDown2');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp2');	

	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper2', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
							
				pullDownAction2();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction2();	// Execute custom function (ajax call?)
			}
		}
	});
	

}
function pullDownAction3 () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip3=0
		//alert('下拉3')
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"hirer","skip":0, "limit":5,"mode":"community", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl3.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_community){
					park_community=JSON.parse(data[i].park_community)
					var address=park_community.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli5">'+minutes+'</span><span class="ulli6">'+money+'<span class="yycl">元</span></span><span class="ulli7">'+hours+'</span><span class="ulli8">'+address+'</span>'
				oUl3.appendChild(oLi)
			}
			
			
         },
         
     });	 	 
	
	}, 100);
}

function pullUpAction3 () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip3+=5
		//alert(skip3)	
		 AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"hirer","skip":skip3, "limit":5,"mode":"community", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl3.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_community){
					park_community=JSON.parse(data[i].park_community)
					var address=park_community.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli5">'+minutes+'</span><span class="ulli6">'+money+'<span class="yycl">元</span></span><span class="ulli7">'+hours+'</span><span class="ulli8">'+address+'</span>'
				oUl3.appendChild(oLi)
			}
			
			
         },
         
     });			
	}, 100);	
}

function loaded3() {
	pullDownEl = document.getElementById('pullDown3');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp3');	

	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper3', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
							
				pullDownAction3();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction3();	// Execute custom function (ajax call?)
			}
		}
	});
	

};
function pullDownAction4 () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip4=0
		//alert('下拉4')
		AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"hirer","skip":0, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl4.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
				
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli13">'+minutes+'</span><span class="ulli14">'+money+'<span class="yycl">元</span></span><span class="ulli15">'+hours+'</span><span class="ulli16">'+address+'</span>'
				oUl4.appendChild(oLi)
			}
			
			
         },
        
     });	 	 	 
	
	}, 100);
}

function pullUpAction4 () {
	var oUl=document.getElementById('ul');
	var oUl2=document.getElementById('ul2');
	var oUl3=document.getElementById('ul3');
	var oUl4=document.getElementById('ul4')
	var year=document.getElementById('year')
	var mon=document.getElementById('mon');
	var curb=document.getElementById('curb');
	var community=document.getElementById('community')
	var curb2=document.getElementById('curb2');
	var community2=document.getElementById('community2')
	var hirer=document.getElementById('hirer')
	var oDate=new Date()
	var val=document.getElementById('val');	
	var parenDiv=document.getElementById('parenDiv')
	var inp=parenDiv.getElementsByTagName('div')	
	var user_id=localStorage.getItem("e")
	var query_month=year.innerHTML+'-'+mon.innerHTML+'-'+'01'+' '+'00:00:00'
	setTimeout(function () {
		skip4+=5
		//alert(skip4)	
		AV.Cloud.run('kongcv_get_trade_date_list', {"user_id":user_id, "query_month":query_month, "role":"hirer","skip":skip4, "limit":5,"mode":"curb", "pay_state":0,}, {
        success: function(data) {
			console.log(data)
			oUl4.innerHTML=''
			//alert(data[0].createdAt.split('T')[1].substring(0,5))
//			alert(data[0].createdAt.split('T')[0])
			for(var i=0;i<data.length;i++){
				var s=data[i].createdAt /*转换时间*/
				s = new Date(s)
				var hours=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
				var minutes=bu(s.getHours())+':'+bu(s.getMinutes())
				if(data[i].park_curb){
					park_curb=JSON.parse(data[i].park_curb)
				
					var address=park_curb.address.split('&')[0]	
				}else{
					address=''	
				}
				
				var money=data[i].price
				
				var oLi=document.createElement('li')
				oLi.innerHTML='<span class="ulli13">'+minutes+'</span><span class="ulli14">'+money+'<span class="yycl">元</span></span><span class="ulli15">'+hours+'</span><span class="ulli16">'+address+'</span>'
				oUl4.appendChild(oLi)
			}
			
			
         },
         
     });	 			
	}, 100);	
}

function loaded4() {
	pullDownEl = document.getElementById('pullDown4');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp4');	

	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper4', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
							
				pullDownAction4();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
							
				pullUpAction4();	// Execute custom function (ajax call?)
			}
		}
	});
	

}

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200);setTimeout(loaded2, 200);setTimeout(loaded3, 200);setTimeout(loaded4, 200) }, false);

