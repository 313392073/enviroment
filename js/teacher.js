$(document).ready(function() {
    $(".layout-left").load("left-nav.html",function(){
        var sss=localStorage.getItem('leftS');
        if(sss=='1'){//关闭的
            $('.switch').parent().addClass("close");
            $('.switch').parent().next('.common-content').css({'left':0});
        }else if(sss=='0'){
            $('.switch').parent().removeClass("close");
            $('.switch').parent().next('.common-content').css({'left':'3.5rem'});
        }
		$('#userName').text(userName);
		$('#userHeadImages').attr('src',userHeadImage);
    });
    $(".layout-nav-right").load("right-nav.html",function(){
        var links = $(".layout-nav-right li a"),
            index, //默认第一个菜单项
        //取当前URL最后一个/后面的文件名，pop方法是删除最后一个元素并返回最后一个元素
            url = location.href.split("?")[0].split("/").pop();
        if(url){//如果有取到，则进行匹配，否则默认首页（即index所指向的那个）
            for(var i=0;i<links.length;i++){//遍历menu中的链接地址
                if(links[i].href.indexOf(url)!=-1){
                    index = i;
                    break;
                }
            }
        }
        $(".layout-nav-right a").eq(index).parent().addClass("active");//给对应的<li>增加选中样式
		$('#userHeadImage').attr('src',userHeadImage);
		$('#userLoginname').text(userLoginname);
		$('#userNote').text(userNote);
    });
    /*$(".layout-nav-right ul li").each(function(){
        debugger;
        if($(this).hasClass('active')){
            if($(this).parent().is('.secondary')){
                $(this).parent().show();
                $(this).parent().prev().children('span').addClass('spreadarrow');
            }
        }
    })*/
    $(".layout-nav-right").on('click', 'ul li a', function(e) {
        var $this = $(this);
        var animationSpeed = 200;
        var checkElement=$(this).next();
        var href=$(this).attr('href');
        if(checkElement.is('.secondary') && checkElement.is(':visible')) {// 已经 有二级菜单并可见
            checkElement.slideUp(animationSpeed, function() {
                $(this).prev().children('.arrow').removeClass('spreadarrow');
                $(this).prev().children('.arrow').addClass('closearrow');
            });
        }else if((checkElement.is('.secondary')) && (!checkElement.is(':visible'))) {// 已经 有二级菜单并不可见
            checkElement.slideDown(animationSpeed, function() {
                $(this).prev().children('.arrow').removeClass('closearrow');
                $(this).prev().children('.arrow').addClass('spreadarrow');
            })
        }else if(!checkElement.is('.secondary')){//没有二级菜单
            $(this).parents('.layout-nav-right').find('li').removeClass('active');
            $(this).parent('li').addClass('active');

        }
        e.preventDefault();
        window.location.href =href ;
    });

})
function exit(){
    $('.page-model').fadeIn(500);
}
function exitClass(){
    $('.page-model').fadeOut(500);
    $.ajax({
        type: 'post',
        url: server + '/user/logout?token='+token,
        dataType: "json",
        success: function (back) {
            window.location.href="../../login.html";
        }
    })
}
function closed(obj){
    $(obj).parents('.page-model').fadeOut(500);
}
//左侧菜单展开与折叠方法
function switchOff(obj){
    var parent=$(obj).parent('.layout-left');
    if(parent.hasClass("close")){//若果是关闭的
        parent.removeClass("close");
        $(obj).parent().next('.common-content').css({'left':'3.5rem'});
        localStorage.setItem('leftS','0');
    }else{
        parent.addClass("close");
        $(obj).parent().next('.common-content').css({'left':0});
        localStorage.setItem('leftS','1');//打开时状态是1

    }
}
