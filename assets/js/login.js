$(function(){
  //登录页面 点击切换注册
  $('#register').on('click',function(){
    $('.login_box').hide();
    $('.register_box').show();
  });
  $('#login').on('click',function(){
    $('.login_box').show();
    $('.register_box').hide();
  });
})