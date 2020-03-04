
var pageCount; //后台返回的总页数
var list = [];  // 用来存放获取的数据
var flag = true; // 默认升序

getList()
function getList(){
  var str = "";
  // 发送请求，获取数据
  $.ajax({
    url: "../lib/list.json",
    dataType: "json",
    success: function(res){
      list = res;  // 请求的全部数据
      pageCount = Math.ceil(res.length/12)
      icon_load(pageCount);  // 渲染分页器
      bindList(1) // 首次渲染页面
    }
  })
}

  //点击分页按钮触发
$(document).on("click","#pageGro li",function(){
  var pageNum = parseInt($(this).html());//获取当前页数
  var selector = $(this);
  bindList(pageNum);

  num_click(pageCount,pageNum,selector);
});

//点击上一页触发
$(document).on("click","#pageGro .pageUp",function(){
  var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
  var index = $("#pageGro ul li.on").index();//获取index
  bindList(pageNum - 1);

   pageUp_click(pageCount,pageNum,index);
});

//点击下一页触发
$(document).on("click","#pageGro .pageDown",function(){
  var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
  var index = $("#pageGro ul li.on").index();//获取index 从 0 开始
  bindList(pageNum + 1);

  pageDown_click(pageCount,pageNum,index);
});


// 根据当前页 渲染页面
function bindList(index){
  var str = "";
  // 取出对应页 数据
  var newList = list.slice((index - 1) * 12, index * 12);
  newList.forEach(function(item){
    str += `
      <li>
        <div class="pic">
          <img src="${item.url}" alt="">
        </div>
        <div class="text">
          <strong>
            ${item.title}
            <span style="color:red">AI</span>
            电视
          </strong>
          <p>
            ${item.info}
            <span style="color:red">AI</span>
            电视，无边款全面屏，远场语音，Q引擎画质，健康护眼，四维场景优化，精锐色域控制，2GB+8GB
          </p>
          <b>${item.price}</b>
          <button>立即购买</button>
        </div>
      </li>
    `
  })
  // 加入页面中
  $('.list-box').html(str)
}

// 按价格排序
$('.ascending').click(function(){
  flag = !flag;
  if(flag){
    list.sort(function(a,b){  // 升序
      return parseInt(a.price) - parseInt(b.price);
    })
  }else{
    list.sort(function(a,b){  // 降序
      return  parseInt(b.price) - parseInt(a.price);
    })
  }
  bindList(1)
})

// 按价格区间筛选
$('.space').click(function(){
  var low = $('.low').val()
  var hight = $('.hight').val()
  list = list.filter(function(item, index){
    return parseInt(item.price) >= low && parseInt(item.price) <= hight
  })
  bindList(1);
})




