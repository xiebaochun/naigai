var BASEURL = "http://127.0.0.1:5000/dati";

var mainApp = new Vue({
  el: "#app",
  data: function() {
    return {
      lastRes: {},
      reward_type: 0,
      index: 1,
      userProgress:'',
      addMaxNum:10,
      setdb:'',
      gameTime:'',
      objMove:'',
      newData:{
        'down_money':0,
        'down_per_time':0,
        'down_time':0,
        'progress':0,
        'total':0
      },
      textMessage:'设置成功',
      tipShow:false
    };
  },
  watch: {
    reward_type: function(val){
      this.socketInstant.emit("setRewardType", {reward_type: val});
    }
  },
  mounted: function() {
    this.initSocket();
  },
  methods: {
    reload: function(){
      this.socketInstant.emit("reload", {});
    },
    doStart: function() {
      this.socketInstant.emit("start", {index: this.index});
    },
    watchSocket: function() {
      var that = this;
      this.socketInstant.on("reload", function(data) {
          console.log('reload')
          //window.location.reload();
      });
    },
    initSocket: function() {
      // var openid = this.getParam("id");
      var that = this;

      // this.socketInstant = io.connect(
      //   "ws://"+window.scoketIp+"?openid=" + openid,
      //   {
      //     path: "/"
      //   }
      // );
      this.socketInstant = io.connect("ws://127.0.0.1:5000");
      this.socketInstant.on("connect", function() {
        //that.doLogin();
        that.watchSocket();
      });

      
    },
    getParam: function(name) {
      return document.getElementById('nickid').value;
      // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      // var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
      // var r = window.location.search.substr(1).match(reg);
      // var q = window.location.pathname.substr(1).match(reg_rewrite);
      // if (r != null) {
      //   return unescape(r[2]);
      // } else if (q != null) {
      //   return unescape(q[2]);
      // } else {
      //   return null;
      // }
    },
    randomString: function(len) {
      len = len || 32;
      var $chars =
        "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = "";
      for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }
  }
});
