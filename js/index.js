$(function(){
	var cont=$('.conttent-inner')
	var add=$('.header-right')
	var radio=$('.plan-box').find('input')
	var r=Math.floor(Math.random()*0);
	var g=Math.floor(Math.random()*0);
	var b=Math.floor(Math.random()*205);
	var color='rgba('+r+','+g+','+b+',0.7)';
	var tudos=[];
	var vals;
	if(localStorage.tudos_data){
		tudos=JSON.parse(localStorage.tudos_data);
		render();
	}else{
		localStorage.tudos_data=JSON.stringify(tudos);
	}
	
	//给页面中添加内容
	function render(){
		$('.content-box').empty()
		$.each(tudos,function(i,v){
			if(v.state){
				$('.content-left').addClass('done')
			}
			$('<li class="conttent-inner"><div class="content-left"><span class="task">'+v.task+'</span><i class="time">'+v.time+'</i><div class="delete"></div></div><div class="content-right"><i class="icon-font icon-shanchu"></i></div></li>').appendTo('.content-box');
			$('li').css('background',color)
		})
	}
	
	//点击添加，弹出框出现
	add.on('touchstart',function(){
		$('.tanchu').css('display','block')
		$('#inputs').val("")
	})
	
	//点击弹出框中的确定,把用户输入的信息添加到todos数组中
	$('#subm').on('touchstart',function(){
		if($('#inputs').val()){
			$('.tanchu').css('display','none')
				tudos.push(
				{task:$('#inputs').val(),time:$('.plan-box input:checked').val(),state:0,isDel:0}
			)
			localStorage.tudos_data=JSON.stringify(tudos)
			render();
		}else{
			alert('请输入要添加的事件')
		}
	})
	
	//三个事件,使li移动
	var left=null;
	$('.content-box').on('touchstart','.conttent-inner',function(e){
		left=e.originalEvent.changedTouches[0].pageX
	})
	$('.content-box').on('touchmove','.conttent-inner',function(e){
		var n=e.originalEvent.changedTouches[0].pageX
		if(left-n>=40&&left-n<=150){
			$(this).css('left',''+n-left+'px')
		}
	})
	$('.content-box').on('touchend','.conttent-inner',function(e){
		var n=e.originalEvent.changedTouches[0].pageX;
		if(1){
			$(this).css('left',0)
		}
		$(this).find('.content-right').css('display','block')
		if(n<left){
			tudos[$(this).index()].state="1";
			localStorage.tudos_data=JSON.stringify(tudos);
			$(this).find('.content-left').addClass('done')
			$(this).find('.content-left').css('color','#ccc')
		}
	})
	
	
	
	//点击删除事件
	$('.content-box').on('touchstart','.content-right',false)
	$('.content-box').on('touchstart','.content-right',function(){
		tudos.splice(tudos[$(this).parent().index],1)
		localStorage.tudos_data=JSON.stringify(tudos);
		
		$(this).closest('li').addClass('dis').delay(800).queue(function(){
			$(this).remove().dequeue()
			render()
		})
	})
	
//	$('.foot-box').on('touchstart','.left',function(){
//		$(this).parent().closest('.content-box').find('li').remove()
//	})
	
})