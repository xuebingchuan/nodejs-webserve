var $PCwrapper = $('#s-pro-pc');
var $MBwrapper = $('#s-pro-mb');

var timer = setTimeout(function () {
    $PCwrapper.removeClass('s-pro-init');
    $MBwrapper.removeClass('s-pro-init');
}, 200);

$('.s-pro-item').on('click', function () {
    $(this).addClass('active');
    $PCwrapper.addClass('s-pro-wrapper-active');
    $MBwrapper.addClass('s-pro-wrapper-active');
})
$('.s-pro-close').on('click', function (e) {
    e.stopPropagation();
    $('.active').removeClass('active');
    $PCwrapper.removeClass('s-pro-wrapper-active');
    $MBwrapper.removeClass('s-pro-wrapper-active');
})

// 移动端，项目箭头查看详情
$(".s-pro-arrow .arrow-left").on("click", function () {
    let $ProBg = $(this).parents(".s-pro-inner").find(".s-pro-bg")
    let pos = $ProBg.css("background-position")
    if (pos == '50% 50%') {
        $ProBg.css("background-position", "0px 50%")
    }
    if (pos == '100% 50%') {
        $ProBg.css("background-position", "50% 50%")
    }

})
$(".s-pro-arrow .arrow-right").on("click", function (e) {
    let $ProBg = $(this).parents(".s-pro-inner").find(".s-pro-bg")
    let pos = $ProBg.css("background-position")
    if (pos == '50% 50%') {
        $ProBg.css("background-position", "100% 50%")
    }
    if (pos == '0px 50%') {
        $ProBg.css("background-position", "50% 50%")
    }

})


