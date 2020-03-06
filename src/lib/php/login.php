<?php

$username = $_POST['username'];
$password = $_POST['password'];

header('content-type: text/html;charset=utf-8;');
// echo "用户名：$uname ，密码是：$upass"

// 建立连接
$link = mysqli_connect('localhost','root','root','sz1920');

// 查询数据
$res = mysqli_query($link,"SELECT * FROM `login` WHERE `username`='$username' AND `password`='$password'");

// 解析结果
$row = mysqli_fetch_assoc($res);  

// 断开连接
mysqli_close($link);

// 判断是否查到
if($row){
  echo json_encode(array("message" => "登录成功", "code" => 1));
}else{
  echo json_encode(array("message" => "登录失败", "code" => 0));
}
?>