//获取舞台imgstage节点
var $imgStg = $("#img-stg"),
$nav = $("#navbox"),
cenNum=0;
$imgStg.empty();
$nav.empty();
//设置图片边界对象
var imgRange ={
	centerPos:{//中间居中点
		left:0,
		top:0
	},
	hPosRange:{
		xLeft:[0,0],
		xRight:[0,0],
		y:[0,0]
	},
	vPosRange:{
		yTop:[0,0],
		x:[0,0]
	}
}

//初始化图片边界范围
function initImgRange(){
	//获取图片组件大小和舞台大小
	var stageSize = {width:$imgStg.width(),height:$imgStg.height()},
	imgboxSize = {width:320,height:360};
	stageSize.width2 = Math.ceil(stageSize.width/2);
	stageSize.height2 = Math.ceil(stageSize.height/2);
	imgboxSize.width2 = Math.ceil(imgboxSize.width/2);
	imgboxSize.height2 = Math.ceil(imgboxSize.height/2);
	//设置中心图片位置
	imgRange.centerPos.left = stageSize.width2 - imgboxSize.width2;
	imgRange.centerPos.top = stageSize.height2 - imgboxSize.height2;
	//设置左右图片边界
	imgRange.hPosRange.xLeft[0] = -imgboxSize.width2;
	imgRange.hPosRange.xLeft[1] = stageSize.width2 - imgboxSize.width2 * 3;
	imgRange.hPosRange.xRight[0] = stageSize.width2 + imgboxSize.width2;
	imgRange.hPosRange.xRight[1] = stageSize.width-imgboxSize.width2;
	imgRange.hPosRange.y[0] = -imgboxSize.height2;
	imgRange.hPosRange.y[1] = stageSize.height - imgboxSize.height2;
	//设置上图片边界
	imgRange.vPosRange.yTop[0] = -imgboxSize.height2;
	imgRange.vPosRange.yTop[1] = stageSize.height2 - imgboxSize.height2*3;
	imgRange.vPosRange.x[0] = stageSize.width2 - imgboxSize.width2;
	imgRange.vPosRange.x[1] = stageSize.width2;
};
//创建节点
function creatImgBoxDom (){
	var $imgBox = $("<div></div>"),
	$font = $('<div class="font"><div>'),
	$back = $('<div class="back"><div>'),
	$box = $('<div><div>');
	$box.empty();
	$back.empty();
	$font.empty();

	$font.append("<img>");
	$font.append("<h2>Great</h2>");
	
	$back.append("<p>MySQl</br>从删库到跑路</p>");
	$back.css('transform',"rotateY( 180deg )");


	$imgBox.addClass("img-box");
	$imgBox.append($font);
	$imgBox.append($back);
	$imgBox.find("h2").addClass("img-title");

	
	for(var i=0;i<10;i++){
		$imgBox.find("img").attr("src","./res/"+i+".jpg").attr("alt","图片").attr("id",i);
		$box.append($imgBox.clone());
	}
	//console.log($box.children());
	$imgStg.append($box.children());
};
//获取区间随机值
function getRangeRandom(min,max){
	return Math.ceil(Math.random() * (max - min) + min);
}
//图片布局
function setImg(select){
	var len = $imgStg.children().length,
	len2 =  Math.ceil(len/2),
	$imgChild = $imgStg.children(),
	k = select+1,
	rotate;
	for(var n = 1;n <len;n++){
		rotate = "rotate("+Math.ceil(Math.random()*360) + "deg)";
		if(k >= len){
			k = 0;
		}
		if(n<len2){//左侧图片
			$imgChild.eq(k)
			.css("left",getRangeRandom(imgRange.hPosRange.xLeft[0],imgRange.hPosRange.xLeft[1]))
			.css("top",getRangeRandom(imgRange.hPosRange.y[0],imgRange.hPosRange.y[1]));
		}
		if (n === len2) {//上边图片
			$imgChild.eq(k)
			.css("left",getRangeRandom(imgRange.vPosRange.x[0],imgRange.vPosRange.x[1]))
			.css("top",getRangeRandom(imgRange.vPosRange.yTop[0],imgRange.vPosRange.yTop[1]));
		}
		if(n>len2){//右侧图片
			$imgChild.eq(k)
			.css("left",getRangeRandom(imgRange.hPosRange.xRight[0],imgRange.hPosRange.xRight[1]))
			.css("top",getRangeRandom(imgRange.hPosRange.y[0],imgRange.hPosRange.y[1]));
		}
		$imgChild.eq(k).css("transform",rotate).css("z-index",3);
		
		k++;
	};
	$imgChild.eq(select)
	.css("left",imgRange.centerPos.left)
	.css("top",imgRange.centerPos.top)
	.css("transform","none")
	.css("z-index",4);
};
//创建导航节点
function creatNavDom (){
	var $li = $("<li></li>"),
	$box = $('<div><div>');
	$li.append("<span>");

	$li.addClass("nav-item");

	$box.empty();
	for(var i=0;i<10;i++){
		$li.find("span").attr("id",i+"nav");
		$box.append($li.clone());
	}
	//console.log($box.children());
	$nav.append($box.children());
};
//导航节点
function setNavItem(select){
	var $navChild = $nav.children();

	for (var i = 0,len=$navChild.length; i < len; i++) {
		$navChild.eq(i).find("span").removeClass("is-center");
	}
	$navChild.eq(select).find("span").addClass("is-center");
}
window.onload=function(){
	initImgRange();
	creatImgBoxDom();
	creatNavDom ();
	setImg(0);
	setNavItem(0);
	$imgStg.on("click",function(e){
		console.log($(event.target).attr("class"));
		$imgStg.children().each(function(){
			$(this).find(".font").css('transform',"rotateY( 0deg )");
			$(this).find(".back").css('transform',"rotateY( 180deg )");
		});
		if(e.target.tagName === "IMG" && parseInt(e.target.id) !== cenNum){
			cenNum = parseInt(e.target.id);
			setImg(cenNum);
			setNavItem(cenNum);
		}else if(e.target.tagName === "IMG"){
			console.log("flip");
			$imgStg.children().eq(cenNum).find(".font").css('transform',"rotateY( 180deg )");
			$imgStg.children().eq(cenNum).find(".back").css('transform',"rotateY( 360deg )");
		}
		if($(event.target).attr("class") === "back"){
			$imgStg.children().eq(cenNum).find(".font").css('transform',"rotateY( 0deg )");
			$imgStg.children().eq(cenNum).find(".back").css('transform',"rotateY( 180deg )");
		}
		
		
	});
	$nav.on("click",function(e){
		$imgStg.children().each(function(){
			$(this).find(".font").css('transform',"rotateY( 0deg )");
			$(this).find(".back").css('transform',"rotateY( 180deg )");
		});
		if(e.target.tagName === "SPAN"  && parseInt(e.target.id) !== cenNum){
			cenNum = parseInt(e.target.id);
			setImg(cenNum);
			setNavItem(cenNum);
		}
		
	})
};

