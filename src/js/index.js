// 轮播图
$('.carousel').carousel({
  interval: 2000
})
// 显示 info
$('.tab>li').mouseenter(function(){
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

// nav
$('.nav-left > .one').siblings().mouseenter(function(){
  $('.nav-hide').stop().slideDown()
})
$('.nav-left > .one').siblings().mouseleave(function(){

  $('.nav-hide').stop().slideUp()
})
$('.nav-hide').mouseenter(function(){
  console.log(11)
  this.style.display = "block";
})
$('.nav-hide').mouseleave(function(){
  this.style.display = "none";
})
// 回到顶部
$("#backTop > .two").click(function(){
  // $(window).animate({'scrollTop': 0},1000);
  $('html').stop().animate({scrollTop: 0},1000)
})

$(window).scroll(function(){
  if($(this).scrollTop() >= 800){
    $('#backTop').show();
  }else{
    $('#backTop').hide();
  }
})