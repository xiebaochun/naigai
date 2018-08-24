window.maxData = null;
window.socketInstant = null;
var actId = "redpack";
var baseUrl =window.IP
window.Api = {
    doAjax: (parms, url, cb) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: parms,
                success: (data) => {
                    resolve(data);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    },

    // 用户信息初始化接口
    saveUser: () => {
        return new Promise((resolve, reject) => {
            let timestamp = Date.parse(new Date());
            let name = $("#nickname").val();
            let openId = $("#nickid").val();
            let img = $("#nickpic").val();
            let sig = 'actId=' + actId + '&timestamp=' + timestamp;
            sig = md5(sig).toUpperCase();
            $.ajax({
                url: baseUrl + 'redPack/saveUser',
                type: "POST",
                dataType: "json",
                data: {
                    timestamp,
                    name,
                    openId,
                    img,
                    actId,
                    sig
                },
                success: (data) => {
                    resolve(data);
                },
                error: (err) => {
                    alert('网络错误，请稍后尝试')
                }
            });
        });
    },

    //更新达标用户信息接口
    saveRecordUser: (isTrue,cb) => {
        return new Promise((resolve, reject) => {
            let timestamp = Date.parse(new Date());
            let name = $("#nickname").val();
            let openId = $("#nickid").val();
            let img = $("#nickpic").val();
            let sig = 'actId=' + actId + '&timestamp=' + timestamp;
            sig = md5(sig).toUpperCase();
            $('.tips').show()
            $.ajax({
                url: baseUrl + 'redPack/saveRecordUser',
                type: "POST",
                dataType: "json",
                data: {
                    timestamp,
                    name,
                    openId,
                    img,
                    actId,
                    sig,
                    isTrue
                },
                success: (data) => {
                    resolve(data);
                    cb && cb()
                    $('.tips').hide()
                    // if(data.data.isTrue == 0){
                    //     cb && cb()
                    // }else{
                    //
                    // }
                },
                error: (err) => {
                    //reject(err);
                }
            });
        });
    },

    //派送红包接口
    recordReadPack: () => {
        return new Promise((resolve, reject) => {
            let timestamp = Date.parse(new Date());
            let name = $("#nickname").val();
            let openId = $("#nickid").val();
            let img = $("#nickpic").val();
            let sig = 'actId=' + actId + '&timestamp=' + timestamp;
            sig = md5(sig).toUpperCase();
            $('.tips').show()
            $.ajax({ 
                url: baseUrl + 'redPack/recordReadPack',
                type: "POST",
                dataType: "json",
                data: {
                    timestamp,
                    name,
                    openId,
                    img,
                    actId,
                    sig, 
                },
                success: (data) => {
                    window.oneClick=true
                     $('.tips').hide()
                    if(data.code=='200'){
                        $('#moneyNum').html(data.money)
                        $(".page").hide();
                        $('.hbPage').show();
                    }else if(data.code=='502'){
                        $('#moneyNum').css({'font-size':'.6rem'})
                        $('#moneyNum').html('红包被抢光啦')
                        $(".page").hide();
                        $('.hbPage').show();
                    }
                    else{
                        $('#moneyNum').css({'font-size':'.6rem'})
                        $('#moneyNum').html(data.msg)
                        $(".page").hide();
                        $('.hbPage').show();
                    }
                },
                error: (err) => {
                    //reject(err);
                }
            });
        });
    }

};
