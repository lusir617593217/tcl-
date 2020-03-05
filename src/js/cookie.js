
// 封装设置cookie 的方法 expires 有效时间 单位秒
function setCookie(key,value,expires){
  if(expires){
    var time = new Date();
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires);
    document.cookie = key + "=" + value + ";expires=" + time;
  }else{
    document.cookie = key + "=" + value;
  }
}


// 封装获取cookie 的方法
function getCookie(key){
  // 1.准备好字符串返回cookie的值
  var str = "";

  // 2. 获取要查询的cookie值
  var tmp = document.cookie.split("; ");
  tmp.forEach(function(item){
    var t = item.split("=");
    if(t[0]==key){
      str = t[1];
    }
  })

  // 3. 返回cookie值
  return str;
}