<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
        <%@ include file="../miaoyi_weixin_api2.jsp" %>
        <%@ include file="../share_api.jsp" %>
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>七度空间双屏互动</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <!--动画样式  -->
 
    <link rel="stylesheet" href="./src/scss/main.css?time=<%=System.currentTimeMillis()%>">
	 <!--解决点击300ms延迟  -->
    <script src="./src/vendor/fastclick.min.js"></script>
    <!--$框架  -->
    <script src="./src/vendor/zepto.min.js"></script>
    <script src="https://cdn.bootcss.com/socket.io/2.0.4/socket.io.js"></script>
    <script src="http://ofvbasfrz.bkt.clouddn.com/maioyi/vendor/vconsole.min.js"></script>
    <script src="https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js"></script>
    <script>
        var vConsole = new VConsole();
        window.baseURI = 'http://t1.miaoxing100.cn/H5/twoPh5/assets/';
        window.IP=''
		window.scoketIp='120.76.45.115:5125' //139.129.9.167:5125
    </script>
    <!-- 微信ssdk -->
    <script id="fiboDataSDK" type="text/javascript" src="http://sdk.fibodata.com/data/datasdk.min.js?pfid=AIDPmspP&appid=583735f40919c20e"></script>

</head>

<body style="background: url(./assets/bg.jpg)no-repeat;background-size: 100% 100%;">
	<input type="hidden" id="nickid" value="<%=request.getSession().getAttribute("openid")%>">
	<input type="hidden" id="nickname" value="<%=request.getSession().getAttribute("nickname")%>">
	<input type="hidden" id="nickpic" value="<%=request.getSession().getAttribute("headimgurl")%>">

	<audio src="./assets/game.mp3" id="gameMusic" loop="loop" preload="auto" loop="loop"></audio>
    <audio src="./assets/zj.mp3"  id="zjMusic" preload="auto"></audio>
    <audio src="./assets/za.mp3"  id="zaMusic" preload="auto"></audio>
    <audio src="./assets/dd.mp3"  id="ddMusic" preload="auto" loop="loop"></audio>

	<audio src="./assets/bg.mp3"   id="bgMusic" loop="loop" autoplay="autoplay" preload="auto"></audio>

    <div id="gameContainer"></div>
    <img src="./assets/foot_1.png" alt="" class="foot footMove">
    <div class="loading" id="loading" style="background: url(./assets/bg.jpg)no-repeat;background-size: 100% 100%;">
        <div class="box">
            <div class="icon">
                <img src="./assets/yuan.png" alt="">
                <img src="./assets/runGif.gif" alt="" class="move">
            </div>
            <p id="loadingText">loading......</p>
        </div>
    </div>
    <div class="page page1 hide" id="page1">
        <!-- <img src="./assets/logo.png" alt="" class="logo"> -->
        <div class="main">
            <div class="hand">
                <img src="./assets/handPhone.png" alt="" class="handMove">
            </div>
            <div class="text" style="background: url(./assets/btnbg.png)no-repeat;background-size: 100% 100%;">
                <h1>
                请留意主持人指令<br>随时准备摇一摇抢红包
                </h1>
                <img src="./assets/pic2.png" alt="" class="icon">
            </div>
            
        </div>
    </div>

    <div class="page page2 hide fadeIn">
        <div class="box clearfix">
            <h1>棉花</h1>
            <div class="hp fl" >
                <div style="background: url(./assets/hp.png)no-repeat center center;">
                    <p></p>
                    <img src="./assets/runMH.png" alt="" class="run">
                    <img src="./assets/runGif.gif" alt="" class="runGif">
                </div>
            </div>
            <h2 class="fr">0%</h2>
        </div>
    </div>

    <div class="messagePage hide ">
        <div class="score">
            <img src="./assets/score.png" alt="">
            <p id="score">0</p>
        </div>
        <div class="time">
            <img src="./assets/time.png" alt="">
            <p id='time'>0</p>
        </div>
    </div>

    <div class="page failPage hide fadeIn">
        <div class="main">
            <div class="hand">
                <img src="./assets/shibai.png" alt="">
            </div>
            <div class="text" style="background: url(./assets/btnbg.png)no-repeat;background-size: 100% 100%;">
                <h1>
                    真可惜，<br>你和红包擦肩而过！
                </h1>
                <img src="./assets/pic2.png" alt="" class="icon">
            </div>
        </div>
    </div>
    <div class="page winPage fadeIn hide">
        <div class="main">
            <img src="./assets/success.png" id="openHb" class="hbMove">
        </div>
    </div>

    <div class="page hbPage fadeIn hide">
        <div class="main">
            <h1 id="moneyNum">0</h1>
            <img src="./assets/hb2.png" id="openHb">
        </div>
    </div>

   
    <!-- 初始化js -->
    <script src="./src/webinit.js"></script>
    <!--工具类  -->
    <script src="./src/utils.js"></script>
    <!--phaser2.8  -->
    <script src="./src/vendor/phaser.min.js"></script>
    <!-- <script src="https://cdn.bootcss.com/phaser-ce/2.8.2/phaser.min.js"></script> -->
    <!--场景类合并  -->
    <script src="./src/state.all.js?time=<%=System.currentTimeMillis()%>"></script>

    <!--主入口  -->
    <script src="./src/app.js"></script>

</body>
  <script>
            if (typeof(wx) !== 'undefined') {
                window.wx = wx
                var url = document.URL;
                    var signature = "";
                    if(url.substr(url.length-1) == "?"){
                    signature = "<%=signature2%>" ;
                    }else{
                    signature = "<%=signature%>" ;
                    }
                var appId = "<%=appId%>";
                var timestamp = "<%=timestamp%>";
                var noncestr = "<%=noncestr%>";
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: noncestr, // 必填，生成签名的随机串
                    signature: signature, // 必填，签名，见附录1
                    jsApiList: [
                    'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'openLocation',
                        'getLocation',
                        'addCard',
                        'chooseCard',
                        'openCard',
                        'hideMenuItems',
                        'previewImage',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'onVoicePlayEnd',
                        'uploadVoice',
                        'downloadVoice'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录
                    });
                 wx.ready(function () {
                  // 在这里调用 API
				  document.getElementById('bgMusic').play()
                      wx.onMenuShareAppMessage({
                        title: "一份来自"+$('#wecha_name').val()+"送出的圣诞祝福语音，点击播放...", // 分享标题
                        desc: "这个圣诞节，我有些话想对你说~", // 分享描述
                        link: 'http://t1.miaoxing100.cn/H5/shengdanqie/', // 分享链接
                        imgUrl: $('#wecha_img').val(), // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            dataSDK.share('friend');
                            var Request=new UrlSearch(); //实例化
                               alert(Request.voice);
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: "一份来自"+$('#wecha_name').val()+"送出的圣诞祝福语音，点击播放...", // 分享标题
                        link: 'http://t1.miaoxing100.cn/H5/shengdanqie/', // 分享链接
                        imgUrl: $('#wecha_img').val(), // 分享图标
                        success: function () { 
                            dataSDK.share('timeline');
                            // 用户确认分享后执行的回调函数
                            var Request=new UrlSearch(); //实例化
                               alert(Request.voice);
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                })
            }
        </script>
</html>