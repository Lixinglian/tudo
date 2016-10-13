$(function(){
	var cont=$('.conttent-inner')
	var add=$('.header-right')
	var r=Math.floor(Math.random()*60);
	var g=Math.floor(Math.random()*105);
	var b=Math.floor(Math.random()*205);
	var color='rgb('+r+','+g+','+b+')';
	var tudos=[];
	if(localStorage.tudos_data){
		tudos=JSON.parse(localStorage.tudos_data);
		render();
	}else{
		localStorage.tudos_data=JSON.stringify(tudos);
	}
	
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
	
	function addTodo(){
		tudos.push(
			{task:"学习",time:"5分钟",state:0,isDel:0}
		)
		localStorage.tudos_data=JSON.stringify(tudos)
		render()
	}

	add.on('click',function(){
		addTodo();
	})
	
	var left=null;
	$('.content-box').on('touchstart','.conttent-inner',function(e){
		left=e.originalEvent.changedTouches[0].pageX
		console.log(left)
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
//			render()
		}
	})
	$('.content-right').parent().parent().on('touchstart','.content-right',function(){
		tudos.splice(tudos[$(this).parent().index],1)
		localStorage.tudos_data=JSON.stringify(tudos);
		$(this).closest('li').addClass('dis').delay(800).queue(function(){
			$(this).remove().dequeue()
			render()
		})
	})
})