// 轮播图
$('.carousel').carousel({
  interval: 3000
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

// 渲染 nav-list
navList()
function navList(){
  var str1 = "";
  // 请求数据
  $.ajax({
    url: "../lib/nav-list.json",
    dataType: "json",
    success: function(res){
      res.forEach(item=> {
        str1 += `
        <li>
          <a href="#">${item.title}</a>
          <i class="glyphicon glyphicon-chevron-right"></i>
        </li>`
      });
      // 渲染页面 nav
      $('.tab').html(str1)

      // 显示 info
      $('.tab>li').mouseenter(function(){
        var str2 = "";
        var index = $(this).index()
        var list = res[index].list
        list.forEach(function(item){
            str2 += `
            <li>
              <img src="${item['list-img']}" alt="">
              <div class="info-text">
                <p>${item['list-title']}</p>
                <span>${item['list-price'] + ".00 元"}</span>
              </div>
            </li>
            `
        })
        // 渲染 info
        $('.info > ul').html(str2)
        $('.info').show();
      })
      $('.tab>li').mouseleave(function(){
        $('.info').hide();
      })
      $('.info').mouseenter(function(){
        $(this).show();
      })
      $('.info').mouseleave(function(){
        $(this).hide();
      })
    }
  })
}

// 渲染 nav-top
navTop()
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

// 渲染 television
television();
function television(){
  var str = '';
  $.ajax({
    url: '../lib/television.json',
    dataType: 'json',
    success: function(res){
      res.forEach(function(item){
        str += `
        <li>
          <img class="pic" src="${item.url}" alt="">
          <img class="sm" src="${item.sm_url}" alt="">
          <p class="title">${item.title}</p>
          <p class="dice">${item.info}</p>
          <p class="price">${item.price}</p>
        </li>
      `
      })
      $('.main-right').html(str)
    }
  })
}

// 给 nav-hide 里的每一个 li 添加点击事件
$('.nav-hide').on('click', 'li', function(){
  var goods = {
    'url': $(this).children('img').attr('src'),
    'title': $(this).children('p').text(),
    'price':  $(this).children('span').text()
  }
  localStorage.setItem('goods_info', JSON.stringify(goods))
  window.location.href = '../pages/details.html'
})
// 给 info > ul 里的每一个 li 添加点击事件
$('.info > ul').on('click', 'li', function(){
  var goods = {
    'url': $(this).children('img').attr('src'),
    'title': $(this).children('div').children('p').text(),
    'price':  $(this).children('div').children('span').text()
  }
  localStorage.setItem('goods_info',JSON.stringify(goods))
  window.location.href = '../pages/details.html'
})

// 给 main-right 里面的 li 添加事件
$('.main-right').on('click', 'li', function(){
  var goods = {
    'url': $(this).children('.pic').attr('src'),
    'title': $(this).children('.title').text(),
    'price':  $(this).children('.price').text()
  }
  localStorage.setItem('goods_info',JSON.stringify(goods))
  window.location.href = '../pages/details.html'
})