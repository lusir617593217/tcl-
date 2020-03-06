<?php
$uname = $_POST['username'];
$pwd = $_POST['password'];

header('content-type:text/html;charset=utf-8;');

if($uname && $pwd){
  $link = mysqli_connect('localhost','root','root','sz1920');
  $sql = "INSERT INTO `login` VALUES (null,'$uname','$pwd')";
  // $sql = "INSERT INTO `login` (`username`,`password`) VALUES ('$uname','$pwd')"
  $row = mysqli_query($link,$sql);

  mysqli_close($link);

  if($row){
    echo json_encode(array("message" => "注册成功", "code" => 1));
  }else{
    echo json_encode(array("message" => "注册失败", "code" => 0));
  }
}else{
  echo "填写信息有误";
}
