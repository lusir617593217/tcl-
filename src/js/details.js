// 放大镜
$("#exzoom").exzoom({
  autoPlay: false,
});//方法调用，务必在加载完后执行

// 渲染 nav-top
$(function(){
  navTop()
})
function navTop(){
  var str1 = $('.nav-w > .nav-left').html();
  // 请求数据
  $.ajax({
    url: "../lib/nav-top.json",
    dataType: "json",
    success: function(res){
      res.forEach(function(item){
        str1 += ` <li>${item.title}</li> `
      })
      $('.nav-w > .nav-left').html(str1)
      // nav-top
      $('.nav-left > .one').siblings().mouseenter(function(){
        var index = $(this).index();
        var list = res[index-1].list;
        var str2 = "";
        list.forEach(item => {
          str2 += `
          <li>
            <a href="../pages/details.html">
              <img src="${item.list_url}" alt="">
            </a>
            <p>${item.list_title}</p>
            <span>${item.list_price}</span>
          </li>
          `
        })
        $('.nav-hide').html(str2).stop().slideDown()
      })
      $('.nav-left > .one').siblings().mouseleave(function(){

        $('.nav-hide').stop().slideUp()
      })
      $('.nav-hide').mouseenter(function(){
        $(this).stop().slideDown()
      })
      $('.nav-hide').mouseleave(function(){
        $(this).stop().slideUp()
      })
    }
  })
}

// 回到顶部
$("#backTop > .two").click(function(){
  $('html').stop().animate({scrollTop: 0},1000)
})

$(window).scroll(function(){
  if($(this).scrollTop() >= 200){
    $('#backTop').show();
  }else{
    $('#backTop').hide();
  }
})

// 商品加减
var count = $('.buy-left > .count').html();
$('.buy-left .one')
  .click(function(){
    count++;
    $('.buy-left > .count').html(count);
  })
  .next()
  .click(function(){
    count--;
    if(count<0){
      count = 0;
    }
    $('.buy-left > .count').html(count);
  })

  // 系列添加点击事件
  $('.span').children().click(function(){
    $(this)
    .addClass('active')
    .siblings()
    .removeClass('active')
  })

  // 鼠标移入显示二维码
  $('.price > .phone')
  .mouseenter(function(){
    $('.price > .code').show()
  })
  .mouseleave(function(){
    $('.price > .code').hide()
  })
  $('.price > .code')
  .mouseenter(function(){
    $(this).show()
  })
  .mouseleave(function(){
    $(this).hide()
  })