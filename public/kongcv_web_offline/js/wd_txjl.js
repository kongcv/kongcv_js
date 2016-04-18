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
		var ul=document.getElementById('ul');
		var user_id=localStorage.getItem("e");
		AV.Cloud.run('kongcv_get_withdraw_deposit',{"user_id":user_id,"skip":0,"limit":9}, {
			success: function(result) {
				console.log(result)
				
				
				
				for(var i=0;i<result.length;i++){
					var money=result[i].money
					var date=new Date(result[i].createdAt)
		var sj=date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate())+' '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
					var oLi=document.createElement('li')
					oLi.innerHTML='<div class="div_marjl"><span class="span_jl1">'+sj+'</span><span class="span_jl2">￥'+money+'</span></div>'
					ul.appendChild(oLi)
						
				}
				
			}
	});	
	}
	
	var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var skip=0
function pullDownAction () {
	var ul=document.getElementById('ul');
	var user_id=localStorage.getItem("e");
	setTimeout(function () {
		skip=0
		ul.innerHTML=''
		AV.Cloud.run('kongcv_get_withdraw_deposit',{"user_id":user_id,"skip":0,"limit":9}, {
			success: function(result) {
				console.log(result)
				
				
				
				for(var i=0;i<result.length;i++){
					var money=result[i].money
					var date=new Date(result[i].createdAt)
		var sj=date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate())+' '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
					var oLi=document.createElement('li')
					oLi.innerHTML='<div class="div_marjl"><span class="span_jl1">'+sj+'</span><span class="span_jl2">￥'+money+'</span></div>'
					ul.appendChild(oLi)
						
				}
				
	 }
	});	
	},100)
		
}

function pullUpAction () {
	var ul=document.getElementById('ul');
	var user_id=localStorage.getItem("e");
	setTimeout(function () {
		skip+=9
		//alert(skip)	
		ul.innerHTML=''
		AV.Cloud.run('kongcv_get_withdraw_deposit',{"user_id":user_id,"skip":skip,"limit":9}, {
			success: function(result) {
				console.log(result)
				
				
				
				for(var i=0;i<result.length;i++){
					var money=result[i].money
					var date=new Date(result[i].createdAt)
		var sj=date.getFullYear()+'-'+bu(date.getMonth()+1)+'-'+bu(date.getDate())+' '+bu(date.getHours())+':'+bu(date.getMinutes())+':'+bu(date.getSeconds());
					var oLi=document.createElement('li')
					oLi.innerHTML='<div class="div_marjl"><span class="span_jl1">'+sj+'</span><span class="span_jl2">￥'+money+'</span></div>'
					ul.appendChild(oLi)
						
				}
				
	 }
	});	
	},100)
			
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
	

}


document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);