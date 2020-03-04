 	//页面加载完成是与后台数据交互，后台返回总页数（如果只有总条数的话就自己算。Math.ceil(总条数/每条多少页)=总页数）
   var pageCount = 8;//后台返回的总页数
   icon_load(pageCount);
     //点击分页按钮触发
   $(document).on("click","#pageGro li",function(){
     var pageNum = parseInt($(this).html());//获取当前页数
     var selector = $(this);
     
     //这里写ajax数据交互,json.html为后台，返回了总页数。实际开发中请删除json.html文件，
     //$.post('json.html',{},function(rs){
       //判断请求是否成功，后台一般会给一个标识。
       //if(true){
         
         //成功后生成分页按钮
         num_click(pageCount,pageNum,selector);
         
       //}else{
         //alert('这里就表示获取后台的数据失败了');
       //}
     //},'json');
   });
   
   //点击上一页触发
   $(document).on("click","#pageGro .pageUp",function(){
     var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
     var index = $("#pageGro ul li.on").index();//获取index
     
     //这里写ajax数据交互,json.html为后台，返回了总页数。实际开发中请删除json.html文件，
     //$.post('json.html',{},function(rs){
       //判断请求是否成功，后台一般会给一个标识。
       //if(true){
         
         //成功后生成分页按钮
         pageUp_click(pageCount,pageNum,index);
         
       //}else{
         //alert('这里就表示获取后台的数据失败了');
       //}
     //},'json');
   });
   
   //点击下一页触发
   $(document).on("click","#pageGro .pageDown",function(){
     var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
     var index = $("#pageGro ul li.on").index();//获取index
     
     //这里写ajax数据交互,json.html为后台，返回了总页数。实际开发中请删除json.html文件，
     //$.post('json.html',{},function(rs){
       //判断请求是否成功，后台一般会给一个标识。
       //if(true){
         
         //成功后生成分页按钮
         pageDown_click(pageCount,pageNum,index);
         
       //}else{
         //alert('这里就表示获取后台的数据失败了');
       //}
     //},'json');
     
   });