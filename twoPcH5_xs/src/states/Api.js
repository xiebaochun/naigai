

var actid = "h5cyAct";
window.Api = {
  doAjax: function(parms, url, cb) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: parms,
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }
};
