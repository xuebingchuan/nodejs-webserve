(function () {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        void 0
    }
})()

var $pageLoading = $(".pageLoading")
var per = 0;
var bar = document.getElementsByClassName('bar')[0];
var pageLoading = document.getElementsByClassName('pageLoading')[0];
var timer = setInterval(function () {
    bar.style.width = per + '%';
    per += 1;
    if (per > 100) {
        clearInterval(timer);
    }
}, 20);

window.onload = function () {

    // 判断加载环境是PC端还是移动端
    var isPC = $("#swiper-pc").css("display") != 'none' ? true : false;

    // 加载数据页面结束函数
    setTimeout(function () {
        $pageLoading.addClass("complete")
        setTimeout(function () {
            $pageLoading.css("display", "none")
            // 移动端首页字体淡入动画
            if (!isPC) {
                $("#swiper-mobile .s-index-slogan>p:nth-of-type(1)").delay(1000).animate({ opacity: '1' }, 1500, function () {
                    $("#swiper-mobile .s-index-slogan>p:nth-of-type(2)").animate({ opacity: '1' }, 1500, function () {
                        $("#swiper-mobile .s-index-slogan>p:nth-of-type(3)").animate({ opacity: '1' }, 1500, function () { })
                    })
                })
                document.body.addEventListener("touchstart", function () { })
            }
        }, 1000);
    }, 2000);

    // cookie设置
    var manageCookie = {
        setCookie: function (name, value, time) {
            document.cookie = name + "=" + value + ";max-age=" + time;
            return this;
        },
        removeCookie: function (name) {
            return this.setCookie(name, "", "-1");
        },
        getCookie: function (name, callback) {
            var allCookieArr = document.cookie.split("; ");
            var len = allCookieArr.length;
            for (var i = 0; i < len; i++) {
                var itemCookieArr = allCookieArr[i].split("=");
                if (itemCookieArr[0] == name) {
                    callback(itemCookieArr[1]);
                    return this;
                }
                callback(undefined);
                return this;
            }
        }
    }

    // 性能优化——首次加载图片时间太久，页面进来后再进行加载
    // "https://api.dujin.org/pic/";   大福利动漫接口
    // "https://api.24bp.cn/API";   小福利动漫接口
    // "https://source.unsplash.com/1600x900/?color"  普通图片接口，分辨率和关键词可调
    var imgSrcArr = ["https://api.24bp.cn/API", "https://source.unsplash.com/1600x900/?color"];
    var imgSrc = null;
    manageCookie.getCookie("fuli", function (isFuli) {
        if (isFuli === 'on') {
            imgSrc = imgSrcArr[0];
            $(".fuli").text("一键切回随机美图")
            $(".fuli").on("click", function () {
                manageCookie.removeCookie("fuli")
            })
        } else {
            imgSrc = imgSrcArr[1];
            $(".fuli").text("一键切换动漫福利")
            $(".fuli").on("click", function () {
                manageCookie.setCookie("fuli", "on", "1000000")
            })
        }
        isPC ? $("#swiper-pc .s-contact-desc").css("background-image", "url(" + imgSrc + ")") : $("#swiper-mobile .s-contact").css("background-image", "url(" + imgSrc + ")")
    })

    // 项目图片延迟加载
    if (isPC) {
        $("#swiper-pc .s-pro-item:nth-of-type(1) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project1.jpg')")
        $("#swiper-pc .s-pro-item:nth-of-type(2) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project2.jpg')")
        $("#swiper-pc .s-pro-item:nth-of-type(3) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project3.jpg')")
        $("#swiper-pc .s-pro-item:nth-of-type(4) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project4.png')")
        $("#swiper-pc .s-pro-item:nth-of-type(5) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project5.png')")
        $("#swiper-pc .s-pro-item:nth-of-type(6) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project6.png')")
    } else {
        $("#swiper-mobile .s-pro-item:nth-of-type(1) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project1.jpg')")
        $("#swiper-mobile .s-pro-item:nth-of-type(2) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project2.jpg')")
        $("#swiper-mobile .s-pro-item:nth-of-type(3) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project3.jpg')")
        $("#swiper-mobile .s-pro-item:nth-of-type(4) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project4.png')")
        $("#swiper-mobile .s-pro-item:nth-of-type(5) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project5.png')")
        $("#swiper-mobile .s-pro-item:nth-of-type(6) .s-pro-inner .s-pro-bg").css("background-image", "url('/resume-page/images/mecc/project6.png')")

    }

    // 首页card 设置
    $(".project").hover3d({
        selector: ".project__card",
        shine: true,
    });

    // swiper 设置
    var firstTap = true;
    var pcSwiper = new Swiper('#swiper-pc', {
        direction: 'vertical', // 垂直切换选项
        loop: false, // 循环模式选项
        mousewheel: true,
        simulateTouch: false, // 禁止鼠标模拟触摸
        speed: 500,

        // 分页器 设置
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                // switch (index) {
                //     case 0: text = '壹'; break;
                //     case 1: text = '贰'; break;
                //     case 2: text = '叁'; break;
                //     case 3: text = '肆'; break;
                //     case 4: text = '伍'; break;
                // }
                return '<span class="' + className + '"></span>';
            }
        },
        // 事件 设置
        on: {
            slideChangeTransitionEnd: function () {
                if (this.activeIndex == 0) {
                    $("header").css("height", "100px")
                } else {
                    $("header").css("height", "70px")
                }
                if (this.activeIndex == '1') { //判断是否滚动到指定页
                    if (firstTap) { //判断是否是第一次滚动到该页
                        firstTap = false;
                        audio.play()
                    }
                    $(".s-big-photo").addClass("final-position")
                    $(".s-aboutme-desc").addClass("final-position")
                }
                if (this.activeIndex == 3) {
                    $(".s-pro-inner").css("transform", "translateY(0)")
                }
            }
        },
    })
    var mbSwiper = new Swiper('#swiper-mobile', {
        direction: 'vertical', // 垂直切换选项
        loop: false, // 循环模式选项
        resistanceRatio: 0, // 抵抗阻力，0时完全抵抗
        noSwiping: true, // 指定部分元素不触发拖动效果
        // 事件 设置
        on: {
            slideChangeTransitionEnd: function () {
                if (this.activeIndex == 0) {
                    $("header").css("height", "5rem")
                } else {
                    $("header").css("height", "4rem")
                }
                if (this.activeIndex == '1') { //判断是否滚动到指定页
                    if (firstTap) { //判断是否是第一次滚动到该页
                        firstTap = false;
                        audio.play()
                        $(".s-aboutme-textarea").css("transform", "scale(1)")
                    }
                }
                if (this.activeIndex == 2) {

                }
                if (this.activeIndex == 3) {
                    $(".s-pro-inner").css("transform", "translateY(0)")
                }
            }
        },
    }
    )

    var urla = ""
    // 在页面开始之初获取ajax
    async function aa() {
        await $.ajax({ url: `https://autumnfish.cn/song/url?id="518894283"`, method: "get" }).then(res => {
            console.log(res.data[0].url);
            urla = res.data[0].url
        })
        console.log(urla);



        // audio 设置
        var audio = new Audio()
        // audio.src = "http://www.ytmp3.cn/down/32000.mp3";
        audio.src = urla;
        audio.loop = "loop";
        audio.preload = "auto"

        $(".music-player").on("click", function () {

            if (audio.paused) {
                console.log(audio.src);
                audio.play();
            } else {
                console.log(22222);
                audio.pause();
            }
        })
        audio.onplay = function () {
            $(".music-player").addClass("music-playing")
            $("header").css("background-color", "transparent")
            $("header").addClass("rainbow")
        }
        audio.onpause = function () {
            $(".music-player").removeClass("music-playing")
            $("header").css("background-color", "#000")
            $("header").removeClass("rainbow")
        }












    }
    aa()




    // canvas刮刮卡设置
    var oCanvas, oBox;
    if (isPC) {
        oCanvas = document.getElementById('canvas');
        oBox = document.getElementsByClassName('s-contact-desc')[0];
    } else {
        oCanvas = document.getElementById('canvas-mb');
        oBox = document.getElementsByClassName('s-contact-desc')[1];
    }
    oCanvas.width = $(oBox).innerWidth() + 1;
    oCanvas.height = $(oBox).innerHeight() + 1;
    var w = oCanvas.width;
    var h = oCanvas.height;
    var ctx = oCanvas.getContext('2d');
    var lastPointX, lastPointY;
    var nowPointX, nowPointY;
    camvasInit();

    function camvasInit() {
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        ctx.font = '25px bold';
        ctx.textAlign = 'center'
        if (isPC) {
            ctx.fillText('小彩蛋：每次刮开都有不同的惊喜哦', w / 2, h / 2);
        } else {
            ctx.fillText('开心刮刮乐', w / 2, h / 2);
        }

        ctx.globalCompositeOperation = 'destination-out';
        if (isPC) {
            document.addEventListener('mousedown', downFun, false);
        } else {
            oCanvas.addEventListener('touchstart', downFun, false);
        }
    }

    function downFun(e) {
        e = e.targetTouches ? e.targetTouches[0] : e
        lastPointX = e.clientX - oBox.offsetLeft;
        lastPointY = e.clientY - oBox.offsetTop - $("header").innerHeight();
        if (isPC) {
            oCanvas.addEventListener('mousemove', moveFun, false);
            document.addEventListener('mouseup', upFun, false);
        } else {
            oCanvas.addEventListener('touchmove', moveFun, false);
            oCanvas.addEventListener('touchend', upFun, false);
        }
    }

    function moveFun(e) {
        e.stopPropagation()
        e = e.targetTouches ? e.targetTouches[0] : e
        nowPointX = e.clientX - oBox.offsetLeft;
        nowPointY = e.clientY - oBox.offsetTop - $("header").innerHeight();

        ctx.beginPath();

        ctx.lineWidth = 40;
        ctx.moveTo(lastPointX, lastPointY);
        ctx.lineTo(nowPointX, nowPointY);
        ctx.stroke();

        ctx.arc(nowPointX, nowPointY, 20, 0, Math.PI * 2, 0);
        ctx.closePath();
        ctx.fill();

        lastPointX = nowPointX;
        lastPointY = nowPointY;
    }

    function upFun() {
        if (isPC) {
            oCanvas.removeEventListener('mousemove', moveFun, false);
            document.removeEventListener('mouseup', upFun, false);
        } else {
            oCanvas.addEventListener('tuochmove', moveFun, false);
            document.addEventListener('touchend', upFun, false);
        }
        clearAll();

    }

    function clearAll() {
        var easeData = ctx.getImageData(0, 0, w, h),
            easePersent = 0,
            len = easeData.data.length;
        for (var i = 0; i < len; i += 4) {
            if (easeData.data[i] === 0) {
                easePersent++;
            }
        }
        if (easePersent > w * h * 0.7) {
            ctx.clearRect(0, 0, w, h);
            oCanvas.style.display = "none";
        }
    }

    // 评论系统
    // $(".comment-open").on("click", function () {
    //     $(".s-comment").css("display", "block")
    // })
    // $(".s-comment-close").on("click", function () {
    //     $(".s-comment").css("display", "none")
    // })

}




