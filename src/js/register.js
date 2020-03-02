// 失去焦点验证
$('.username').blur(function(){
  var username = $(this).val();
  if(!username){
    $(this).next().show();
  }
})
$('.password').blur(function(){
  var password = $(this).val();
  if(!password){
    $(this).next().show();
  }
})

// 点击注册按钮
$('.btn').click(function(e){
  // 阻止默认行为
  var event = e || window.event;
  event.preventDefault();

  var username = $('.username').val();
  var password = $('.password').val();

  // 发送请求
  $.ajax({
    url: "/register",
    type: "post",
    dataType: "json",
    data: `username=${username}&password=${password}`,
    success: function(res){
      if(res.code===1){
        $('.baffle').show();
        var count = 5;
        var span = $('.baffle span');
        span.timer = setInterval(() => {
          count--;
          if(count < 0){
            count = 0;
          }
          span.html(count);
        }, 1000);
        setTimeout(function(){
          clearInterval(span.timer);
          window.location.href = "../pages/login.html";
        },5000)
        $('.skip').click(function(){
          clearInterval(span.timer)
          window.location.href = "../pages/login.html";
        })
      }
    }
  })
})


