var server='http://116.255.173.207/v1/api/';
//var server='http://192.168.1.56:82/v1/api/';
var token = localStorage.getItem("token");
var batch = localStorage.getItem("batch");
if(!batch){
	getCourseBatch();
}
function relogin(){
	$('#batch').fadeOut(500);
	window.location.href='../../login.html';
}
var users=JSON.parse(localStorage.getItem('user'));
var userHeadImage=users.userHeadImage;
var userLoginname=users.userLoginname;
var userName=users.userName;
var userNote=users.userNote;


 plus.screen.lockOrientation("landscape-primary"); // 把屏幕方向改变成横屏正方向
plus.screen.unlockOrientation(); // 取消旋转屏幕 

$(document).ready(function() {
});

//左侧菜单展开与折叠方法
function switchOff(obj){
	var parent=$(obj).parent('.layout-left');
	if(parent.hasClass("close")){
		parent.removeClass("close");
		$(obj).parent().next('.common-content').css({'left':'3.5rem'});
	}else{
		parent.addClass("close");
		$(obj).parent().next('.common-content').css({'left':0});
	}
	
	var loginFlag = checkLogin();
	if(loginFlag===false){
   		window.location.href='login.html'
	}
	else if(loginFlag==0){//0学生
		if(window.location.pathname!='../page/teacher/home-page.html')
			window.location.href='../page/student/read-short-sentences.html'
	}
	else if(loginFlag==1){//1老师
		if(window.location.pathname!='../page/teacher/home-page.html')
			window.location.href='../page/teacher/home-page.html'
	}
   	else {
   		window.location.href='login.html'
   	}
}

function stu_gohome(){
	window.location.href="/stu-index.html";
}


function tea_gohome(){
	window.location.href="/tea-index.html";
}


function checkLogin(){
	if(localStorage.getItem('token') || localStorage.getItem('user')){
		return localStorage.getItem('role');//0学生；1老师
	}
	return false;
}



function getCourseBatch() {
	$.ajax({
		type: 'GET',
		url: server + 'course/batch?token=' + token,
		data: {},
		dataType: "json",
		success: function (back) {
			if (back.obj) {
				batch = back.obj;
				localStorage.setItem("batch", batch);
			}
			else {
				errors()
			}
		},
		error: function (err) {
			console.log(JSON.stringify(err))
			errors();
		}
	});
}
function errors(){
	var html='<div id="batch" class="page-model">'+
		'<div class="page-model-box">'+
		'<span class="closed fright" onclick="relogin();"><i class="iconfont icon-chahao"></i></span>'+
		'<h2 style="margin-top: 5rem;">请重新登录</h2>'+
		'<p>登录已失效，请您重新登陆！</p>'+
		'<button class="confirm" onclick="relogin()">确定</button>'+
		'</div>'+
		'</div>';
	$('body').append(html);
	$('#batch').fadeIn(500);
}

