	var appid = 'VP7sLsNOMOYHn4cHMzV4KcgG-gzGzoHsz';
	var appkey = 'jVfxeSyYnzW4sBHNlVK6l3s3';
	AV.initialize(appid, appkey);
	
$(document).ready(function(){
	$(".closs_a").focus(function(){
		$(".img_cos").attr("src", "images/btn_hjt_pressed.png");
	});
	
});
window.onload=function(){
	$("#star").raty(
           {
			   hints: ['1', '2', '3', '4', '5'],
               path:'images',
			  size:58,
			    starOff: 'hx2.png',
				starOn: 'hx1.png',
				
 
           });
		   var maxstrlen = 100;
        function Q(s) { return document.getElementById(s); }

        function checkWord(c) {
            len = maxstrlen;
            var str = c.value;
            myLen = getStrleng(str);
            var wck = Q("wordCheck");

            if (myLen > len * 2) {
                c.value = str.substring(0, i + 1);
            }
            else {
                wck.innerHTML = Math.floor((len * 2 - myLen) / 2);
            }
        }

        function getStrleng(str) {
            myLen = 0;
            i = 0;
            for (; (i < str.length) && (myLen <= maxstrlen * 2); i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
                    myLen++;
                else
                    myLen += 2;
            }
            return myLen;
        }
	var tijiao=document.getElementById('tijiao');
	var star=document.getElementById('star')
	var aI=star.getElementsByTagName('img')
	var comment=document.getElementById('comment')
	var grade=0
	for(var i=0;i<aI.length;i++){
		aI[i].onclick=function(){
			grade=this.alt	
		}	
	}
		var  user_id=localStorage.getItem("e")
		var objectid=localStorage.getItem("message_id")
		var extras=localStorage.getItem("extras")
		var extras=JSON.parse(extras)
		console.log(extras)
		var mode=extras.mode
		var objectid=extras.park_id
			
	tijiao.onclick=function(){
		var test=comment.value
		var gra=parseFloat(grade)
		//alert(objectid)
		//alert(mode)
		//alert(test)
		
		
		AV.Cloud.run('kongcv_insert_comment',  {"user_id" : user_id, "comment" : test, "park_id" : objectid,"grade":gra, "mode" : mode},{
  			success: function(data) {
				var data=JSON.parse(data)
				console.log(data)
				if(data.state=='ok'){
					location='ddplxsy.html'	
				}else{
					alert(data.error)	
				}
			}
			
		})		
	}
}