$(document).ready(function() {
    $(".layout-left").load("left-nav.html",function(){
        var sss=localStorage.getItem('leftS');
        if(sss=='1'){//�رյ�
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
            index, //Ĭ�ϵ�һ���˵���
        //ȡ��ǰURL���һ��/������ļ�����pop������ɾ�����һ��Ԫ�ز��������һ��Ԫ��
            url = location.href.split("?")[0].split("/").pop();
        if(url){//�����ȡ���������ƥ�䣬����Ĭ����ҳ����index��ָ����Ǹ���
            for(var i=0;i<links.length;i++){//����menu�е����ӵ�ַ
                if(links[i].href.indexOf(url)!=-1){
                    index = i;
                    break;
                }
            }
        }
        $(".layout-nav-right a").eq(index).parent().addClass("active");//����Ӧ��<li>����ѡ����ʽ
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
        if(checkElement.is('.secondary') && checkElement.is(':visible')) {// �Ѿ� �ж����˵����ɼ�
            checkElement.slideUp(animationSpeed, function() {
                $(this).prev().children('.arrow').removeClass('spreadarrow');
                $(this).prev().children('.arrow').addClass('closearrow');
            });
        }else if((checkElement.is('.secondary')) && (!checkElement.is(':visible'))) {// �Ѿ� �ж����˵������ɼ�
            checkElement.slideDown(animationSpeed, function() {
                $(this).prev().children('.arrow').removeClass('closearrow');
                $(this).prev().children('.arrow').addClass('spreadarrow');
            })
        }else if(!checkElement.is('.secondary')){//û�ж����˵�
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
//���˵�չ�����۵�����
function switchOff(obj){
    var parent=$(obj).parent('.layout-left');
    if(parent.hasClass("close")){//�����ǹرյ�
        parent.removeClass("close");
        $(obj).parent().next('.common-content').css({'left':'3.5rem'});
        localStorage.setItem('leftS','0');
    }else{
        parent.addClass("close");
        $(obj).parent().next('.common-content').css({'left':0});
        localStorage.setItem('leftS','1');//��ʱ״̬��1

    }
}
