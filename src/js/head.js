// 获取登录信息
var username = getCookie("login");

// username 不为空说明 已经登录了
if(username){
  var dom = $(`<li style="color:#ccc;font-size:10px;margin-left:18px">用户：${username}</li>`)
  $('.is_login').hide().parent().append(dom)
}else{
  $('.is_login').show()
}

// 获取 购物车数据
 var cartData = JSON.parse(localStorage.getItem('cart'))
 $('.cartNum').text(cartData.length)