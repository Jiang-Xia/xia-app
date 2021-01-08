var $ = {
  ajax: function (options) {
    var xhr = null,          // XMLHttpRequest对象
      url = options.url,   // url地址
      method = options.method || 'get', // 传输方式，默认为get
      async = typeof (options.async) === "undefined" ? true : options.async,
      data = options.data || null,      // 参数
      params = '',
      callback = options.success,       // ajax请求成功的回调函数                   
      error = options.error;
    // 将data的对象字面量的形式转换为字符串形式
    if (data) {
      for (var i in data) {
        params += i + '=' + data[i] + '&';
      }
      params = params.replace(/&$/, "");
    }
    // 根据method的值改变url
    if (method === "get") {
      url += '?' + params;
    }
    if (typeof XMLHttpRequest != "undefined") {
      xhr = new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
      // 将所有可能出现的ActiveXObject版本放在一个数组中
      var xhrArr = ['Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP.2.0'];
      // 遍历创建XMLHttpRequest对象
      var len = xhrArr.length;
      for (var i = 0; i < len; i++) {
        try {
          // 创建XMLHttpRequest对象
          xhr = new ActiveXObject(xhrArr[i]);
          break;
        }
        catch (ex) {

        }
      }
    } else {
      throw new Error('No XHR object availabel.');
    }
    // onreadystatechanges属性改变的时候触发
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          // 异步调用成功
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          callback && callback(JSON.parse(xhr.responseText))
          // 文件为.json的就得用JSON.parse() ,方可使用数据
          //.js时就不用了。
        } else {
          error && error();
        }
      }
    }
    // 创建发送请求
    xhr.open(method, url, async);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // post 才需要设置http请求头
    xhr.send(params);
    // psot 方式是传参需要通过send()  get方式为null
  },
  //// 封装一个jsonp函数,实现跨域
  jsonp: function (url, callback) {
    if (!url) {
      return;
    }
    var a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']; //定义一个数组以便产生随机函数名
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var r3 = Math.floor(Math.random() * 10);
    var name = 'getJSONP' + a[r1] + a[r2] + a[r3];
    var cbname = '$.' + name; //作为jsonp函数的属性
    if (url.indexOf('?') === -1) {
      url += '?jsonp=' + cbname;
    } else {
      url += '&jsonp=' + cbname;
    }
    var script = document.createElement('script');
    //定义被脚本执行的回调函数
    $[name] = function (e) {
			console.log(222222222,cbname)
      try {
        callback && callback(e);
      } catch (e) {
        //
      } finally {
        //最后删除该函数与script元素
        delete $[name];
        script.parentNode.removeChild(script);
      }

    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
export default $