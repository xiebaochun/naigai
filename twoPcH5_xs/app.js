var BASEURL = "http://127.0.0.1:5000/dati";

var mainApp = new Vue({
  el: "#app",
  data: function() {
    return {
      lastRes: {},
      userProgress:'',
      addMaxNum:10,
      money:'',
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
  mounted: function() {
    this.initSocket();
  },
  computed: {
    currentProblem: function() {
      if (this.problems.length >= 1) {
        return this.problems[this.current - 1];
      } else {
        return {
          problem: "",
          answer: []
        };
      }
    }
  },
  methods: {
    addPoint: function() {
      var openid = this.getParam("id");
      this.myConunt = this.myConunt + 100;
      this.socketInstant.emit("c_add", {
        openId: openid,
        points: 10
      });
    },
    doStart: function() {
      this.socketInstant.emit("c_start", {});
    },
    addMax: function() {
      var that=this
      var openid = this.getParam("id");
      this.myConunt = this.myConunt + 10000;
      this.socketInstant.emit("c_add", {
        openId: openid,
        points: that.addMaxNum
      });
    },
    clearMax: function() {
      var openid = this.getParam("id");
      this.socketInstant.emit("c_clean", {
        openId: openid,
      });
    },
    doLogin: function() {
      var openid = this.getParam("id");
      this.socketInstant.emit("c_login", {
        openId: openid,
        nickname: this.randomString(10),
        headimg: "http://qn.kiis.cn/003b3899-c6f7-42a1-891a-2c1be0de9736.jpg"
      });
    },
    setProgress:function(){
      var that=this
      this.socketInstant.emit("c_progress", {
        progress:that.userProgress
      })
      //that.allStand()
    },

    endStart: function() {
      var that=this
      var openid = this.getParam("id");
      this.socketInstant.emit("c_end", {
        openId: openid,
        nickname: this.randomString(10),
        headimg: "http://qn.kiis.cn/003b3899-c6f7-42a1-891a-2c1be0de9736.jpg"
      });
    },

    setMoney: function() {
      var that=this
      var openid = this.getParam("id");
      this.socketInstant.emit("c_set_dowm_moeny", {
        down_money:that.money
      })
      //that.allStand()
    },

    setTime: function() {
      var that=this
      var openid = this.getParam("id");
      this.socketInstant.emit("c_set_down_time", {
        down_time:that.gameTime
      })
      //that.allStand()
    },

    setMove: function() {
      var that=this
      var openid = this.getParam("id");
      this.socketInstant.emit("c_set_down_per_time", {
        down_per_time:that.objMove
      })
    },

    allStand: function() {
      console.log(11)
      var that=this
     
    },

    watchSocket: function() {
      var that = this;
      this.socketInstant.on("s_get_all_stand", function(data) {
        console.log("s_get_all_stand");
        //console.log(data);
        that.newData=data
      });
      this.socketInstant.on("s_start", function(data) {
        console.log("s_start");
        //console.log(data);
      });

      this.socketInstant.on("c_get_progress", function(data) {
        console.log("s_start");
        //console.log(data);
      });

      this.socketInstant.on("s_people", function(data) {
        console.log("s_people");
        console.log(data);
        that.newData=data
      });

      this.socketInstant.on("s_status", function(data) {
        console.log("s_status");
        console.log(data);
      });
      //返回信息
      this.socketInstant.on("s_add", function(data) {
        console.log("s_add");
        console.log(data);
      });
      this.socketInstant.on("s_clean", function(data) {
        console.log("s_clean");
        console.log(data);
      });
      this.socketInstant.on("s_someOneAdd", function(data) {
        console.log("s_someOneAdd");
        console.log(data);
        that.lastRes = data;
        var num=data[0].allopints

      });

      this.socketInstant.on("s_login", function(data) {
        console.log("s_login");
        console.log(data);
      });
    },
    tipFun:function(text){
      var that=this;
      that.textMessage=text
      that.tipShow=true
      setTimeout(function(){
         that.tipShow=false
      },2000)
    },
    initSocket: function() {
      var openid = this.getParam("id");
      var that = this;

      this.socketInstant = io.connect(
        "ws://120.76.45.115:5125?openid=" + openid,
        {
          path: "/"
        }
      );
      this.socketInstant.on("connect", function() {
        that.doLogin();
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
