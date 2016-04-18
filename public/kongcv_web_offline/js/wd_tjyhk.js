// JavaScript Document
	var appid = 'ATcs8k4nK1f2VFd69QtNHcuN';
	var appkey = 'bs5tH7T0alfJyepntY5Npy37';
	AV.initialize(appid, appkey);

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
window.onload=function(){
	clikback();
	var tijiao=document.getElementById('tijiao')
	var user_id=localStorage.getItem("e")
	var leixing=document.getElementById('leixing')
	var tupian=document.getElementById('tupian')
	
	var block=document.getElementById('block')
	var none=document.getElementById('none')
	var tui=document.getElementById('tui')
	//alert(url)
	//alert(bank)
	
	leixing.onclick=function(){
		none.style.display='block'
		block.style.display='none'	
	}
	var oUl=document.getElementById('ul')
	
	AV.Cloud.run('kongcv_get_bank',{}, {
		success: function(result) {
			console.log(result)
			
			for(var i=0;i<result.length;i++){
				var oLi=document.createElement('li')
				
					oLi.bank=result[i].bank	
				
					oLi.url=result[i].picture._url	
				
				var _url=result[i].picture._url
				var bank=result[i].bank
				
				
				oLi.innerHTML='<div class="mr_div"><img class="iconimg" src="'+_url+'"/><span class="iconspan">'+bank+'</span></div>'	
				oLi.className='div_yhkl'
				oUl.appendChild(oLi)
			}
			var aLi=oUl.getElementsByTagName('li')
			for(var j=0;j<aLi.length;j++){
				aLi[j].onclick=function(){
					
					var bank=this.bank
					var url=this.url
					
					localStorage.setItem("bank",bank)
					localStorage.setItem("url",url)
					tupian.src=url
					leixing.innerHTML=bank
					//alert(this.bank)
					//alert(this.url)	
					none.style.display='none'
					block.style.display='block'	
				}	
			}
		tijiao.onclick=function(){
			
			var url=localStorage.getItem("url");
			var bank=localStorage.getItem("bank")
			var name=document.getElementById('name');
			var card=document.getElementById('card')
			
			var card=card.value
			var name=name.value
			var carda=card.split('')
			if(carda.length>=16&&card.length<=21){
				var card=carda.join('')
				
			}else{
				alert('银行卡号不正确')	
				return
			}
			
			
			var a=p1.value;
			var b=p2.value;
			if(name==''||bank==''||card==''||url==''){
				alert('不能为空')	
				return
			}
			if(a==''||b==''){
				alert('密码不能为空')	
				return
			};
			if(leixing.innerHTML==''){
				alert('银行类型不能为空')
				return	
			};
			
			
			//alert(bank)
			//alert(card)
			//alert(name)
			//alert(url)
			
			
			if(a!=b){
					alert('两次密码输得不对')	
			}else{
					var passwd=md5(b)
			};
			console.log({"user_id":user_id, "bank_card":{"bank":bank,"card":card,"name":name,"bank_icon_url":url},"passwd":passwd, "action":"new"})
			AV.Cloud.run('kongcv_put_purse',   {"user_id":user_id, "bank_card":{"bank":bank,"card":card,"name":name,"bank_icon_url":url},"passwd":passwd, "action":"new"}, {
				success: function(result) {
					console.log(result)
					var data=JSON.parse(result)
					if(data.state=='ok'){
						location='wd_yhk.html'
					}else{
						alert(data.error)	
					}
						
		  },
		 
		});
}
		
				
  },
 
});
	
};
