// JavaScript Document
	
	
	function getStyle(obj,sName){
		return(obj.currentStyle||getComputedStyle(obj,false))[sName]	
	}
	
	/*sName=name, istart=json[name]*/
	/*type,time,fn*/
	function move(obj,json,options){
			options=options||{}
			options.type=options.type||'ease-out'
			options.time=options.time||500
			var start={}
			var dis={}
			for(var name in json){
				start[name]=parseFloat(getStyle(obj,name))
				if(isNaN(start[name])){
					switch(name){
						case 'left':
							start[name]=obj.offsetLeft;
							break;
						case 'top':
							start[name]=obj.offsetTop;
							break;
						case 'width':
							start[name]=obj.offsetWidth;
							break;
						case 'height':
							start[name]=obj.offsetHeight;
							break;
						case 'opacity':
							start[name]=1;
							break;
						case 'borderWidth':
							start[name]=0;
							break;
					}
				}
			
				dis[name] = json[name]-start[name];
			};
			
		
	
		var cont=Math.floor(options.time/30);
		var n=0
		clearInterval(obj.time)
		obj.time=setInterval(function(){
			n++
			for(var name in json){
					switch(options.type){
						case 'linear':
							var cur = start[name]+dis[name]*n/cont;
							break;
						case 'ease-in':
							var a = n/cont;
							var cur = start[name]+dis[name]*Math.pow(a,3);
							break;
						case 'ease-out':
							var a = 1-n/cont;
							var cur = start[name]+dis[name]*(1-Math.pow(a,3));
							break;
					}
					if(name=='opacity'){
						obj.style.opacity=cur
						obj.style.fliter='alpha(opacity:'+cur*100+')'	
					}else{
						obj.style[name]=cur+'px'	
					}	
			}
			if(n==cont){
				clearInterval(obj.time);
				options.end&&options.end()
			};
			
		},30);	
		
	};