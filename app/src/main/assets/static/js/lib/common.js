window.APP = {
  addScript: function(src, callback) {
    var head = document.getElementsByTagName('head')[0],
      js = document.createElement('script'),
      d = new Date(),
      id = "_script_"+d.getTime();

    js.setAttribute('type', 'text/javascript'); 
    js.setAttribute('src', src); 
    js.setAttribute('id', id);
    head.appendChild(js);
    var innerCallback = function(){
      $("#"+id).remove();
      if(typeof callback === 'function'){
        callback();
      }
    };
    if (document.all) {
      js.onreadystatechange = function() {
        if (js.readyState == 'loaded' || js.readyState == 'complete') {
          innerCallback();
        }
      }
    } else {
      js.onload = function() {
        innerCallback();
      }
    }
  },
  addCss: function(href) {
    var linkElem = document.createElement('link');
    document.getElementsByTagName('head')[0].appendChild(linkElem);
    linkElem.rel = 'stylesheet';
    linkElem.type = 'text/css';
    linkElem.href = href;
  },
  ready: function(callback) {
    if(typeof callback !== 'function') {
      return;
    }
    if(typeof BROWSER_TYPE === 'undefined') {
      BROWSER_TYPE = 'browser';
    }
    switch(BROWSER_TYPE) {
      case 'browser':
        $(document).ready(function(){
          callback();
        });
        break;
      case 'app':
        var app = {
          initialize: function() {
            this.bindEvents(); 
          },  
          bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
          },  
          onDeviceReady: function() {
            app.receivedEvent('deviceready');
          },  
          receivedEvent: function(id) {
            document.addEventListener("resume", this.onResume, false);
            callback();
          },  
          onResume: function() {
          }   
        };  
        app.initialize();
        break;
      case 'weixin':
        break;
      default:
        callback();
        break;
    }
  }
};


