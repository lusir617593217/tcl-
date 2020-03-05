// 密码登录
$('.pwd-login').click(function(){
  $('.note').hide()
  $('.pwd').show()
})
// 短信登录
$('.note-login').click(function(){
  $('.note').show()
  $('.pwd').hide()
})



// 失去焦点验证
$('.username').blur(function(){
  var username = $(this).val();
  if(!username){
    $(this).next().show()
  }
})

$('.password').blur(function(){
  var password = $(this).val();
  if(!password){
    $(this).next().show()
  }

})
// var password = $('.password').value();
// 密码登录验证
$('.btn').click(function(e){
  // 阻止默认行为
  var event = e || window.event;
  event.preventDefault();

  var username = $('.username').val();
  var password = $('.password').val();
  if(!username || !password){
    alert("请填写表单")
    return
  }
  // 发送请求
  $.ajax({
    url: "/login",
    type: "post",
    dataType: 'json',
    data: `username=${username}&password=${password}`,
    success: function(res){
      if(res.code === 1){
        setCookie('login', username, 1*60*60*24); // 一天免登陆
        window.location.href = "../pages/index.html";
      }else{
        $('.err').show()
      }
    }
  })
 
})