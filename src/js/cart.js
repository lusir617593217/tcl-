// 查看 localStorage cart 里面是否有数据
var cart_list = JSON.parse(localStorage.getItem('cart'))

// 判断购物车是否为空
if(cart_list === null){
  $('.main-w').show().siblings().hide()
}else{
  $('.main-w').hide().siblings().show()

  // 渲染页面
  var str = '';
  cart_list.forEach(item => {
    str += `
      <li>
        <input class="check_one" type="checkbox">
        <img src="${item.url}" alt="图片">
        <span class="message">${item.title}</span>
        <span class="unit">${item.price}</span>
        <p class="count">
          <button class="sub">-</button>
          <span>${item.count}</span>
          <button class="add">+</button>
        </p>
        <span class="price">
        ${(parseInt(item.price) * item.count).toFixed(2)} 元
        </span>
        <p class="font">
          <i class="glyphicon glyphicon-star"></i>
          <i class="glyphicon glyphicon-trash"></i>
        </p>
      </li>
    `
    // 放入页面中
    $('.product').html(str)
  });
}

// 全选
$('.check_all').click(function(){
  $('.check_one').prop('checked',$(this).prop('checked'));
  account();
})
 // 给每个选项添加状态改变触发事件
 $('.check_one').change(function(){
  isAll();
  account();
})

// 判断是否全选，并设置全选按钮
function isAll(){
  var flag = true;
  $('.check_one').each(function(index,item){
    // 判断是否有未选择的
    if($(item).prop('checked')===false){
      flag = false;
    }
  })
  $('.check_all').prop('checked',flag);
}

// 数量加减
  // 减法
$('.product').on('click', '.sub', function(){
  var count = $(this).next().text()
  count--;
  if(count<1){
    count = 1;
  }
  $(this).next().text(count)
  // 重新渲染页面价格
  var sub = (parseInt($(this).parent().prev().text()) * count).toFixed(2)
  $(this).parent().next().text(sub + " 元")
  account()
})
  // 加法
$('.product').on('click', '.add', function(){
  var count = $(this).prev().text()
  count++;
  $(this).prev().text(count)
  // 重新渲染页面价格
  var add = (parseInt($(this).parent().prev().text()) * count).toFixed(2)
  $(this).parent().next().text(add + " 元")
  account()
})

// 计算总数
priceSum()
function priceSum(){
  var price_sum = 0;
  var goods_count = 0;
  var goods_selected = 0;
  $('.check_one').each(function(index,item){
    goods_count += parseInt($(this).siblings('.count').children('span').html())
    if($(this).prop('checked')){
      price_sum += parseInt($(this).siblings('.price').html())
      goods_selected += parseInt($(this).siblings('.count').children('span').html())
    }
  })
  return {
    "goods_count": goods_count,
    "goods_selected": goods_selected,
    "price_sum": price_sum
  }
}

// 结算
account()
function account(){
  var obj = priceSum()
  if(obj.goods_selected != 0){
    $('.go_buy').addClass('active');
  }else{
    $('.go_buy').removeClass('active');
  }
  $('.goods_count').html(obj.goods_count);
  $('.goods_selected').html(obj.goods_selected);
  $('.price_sum').html(obj.price_sum);
}
