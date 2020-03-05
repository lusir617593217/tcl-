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
            <img src="${item.list_url}" alt="">
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
// 给 nav-hide 里的每一个 li 添加点击事件
$('.nav-hide').on('click','li',function(){
  var goods = {
    'url': $(this).children('img').attr('src'),
    'title': $(this).children('p').text(),
    'price':  $(this).children('span').text()
  }
  localStorage.setItem('goods_info',JSON.stringify(goods))
  window.location.href = '../pages/details.html'
})

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

  // 渲染页面
  bind()
  function bind(){
    var list = JSON.parse(localStorage.getItem('goods_info')) 
    $('.address').attr('src', list.url)
    $('.content-right > .title').text(list.title)
    $('.title_span').text(list.title)
    $('.now_price').text(list.price)
  }

  // 加入购物车
  
  var flag2 = true   // 第一次加入商品
  var flag1 = true  // 默认是第一次加入该商品
  $('.buy-right').click(function(){
    // 判断是否登录
    if( !getCookie("login") ){
      alert("您还没有登录，请先登录！");
      window.location.href = "../pages/login.html";
      return;
    }

    var cart = JSON.parse(localStorage.getItem('cart')) || []
    var imgUrl = $('.address').attr('src')
    var title = $('.content-right > .title').text()
    var now_price = $('.now_price').text()
    var count = $('.count').text()
    var obj = {
      "url": imgUrl,
      "title": title,
      "price": now_price,
      "count": count,
      "isSelect": false
    }


    if(cart.length === 0){
      cart.push(obj)  // 第一次加入购物车，直接push
      flag1 = false   // 阻止第一次 把商品加入 cart 中
      flag2 = false  // 阻止第一次加入购物车时 重复 计算 count
    }

    // 判断购物车是否已经存在该商品
    cart.forEach(item => {
      if(item.title === title){
        if(flag2){
          item.count = parseInt(item.count) + parseInt(count)
        }
        flag1 = false  // 找到了一样的商品，就不需要再加入数组中了
        // break
      }
    })
    flag2 = true
    
    if(flag1){
      cart.unshift(obj)
    }
    flag1 = true

    localStorage.setItem('cart', JSON.stringify(cart))
    alert("添加成功")
    // 刷新页面
    window.location.href = "../pages/details.html";
  })