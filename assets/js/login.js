$(function(){
  //登录页面 点击切换注册
  $('.links #register').on('click',function(){
    $('.login_box').hide();
    $('.register_box').show();
  });
  $('.links #login').on('click',function(){
    $('.login_box').show();
    $('.register_box').hide();
  });

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
      // 密码校验
      pwd : [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
       repwd : function(value){
         var pwd = $('.register_box #password').val();
         //判断
         if(pwd !== value){
           return '两次输入密码不一致';
         }
       }
    });

     // 监听注册表单的提交事件
  $('#reg_form').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#reg_form [name=username]').val(),
      password: $('#reg_form [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#login').click()
  })
})

// 监听登录表单的提交事件
$('#login_form').submit(function(e) {
  // 1.阻止默认提交行为
  e.preventDefault()
  // 2. 发起Ajax的POST请求
  $.ajax({
    url: '/api/login',
    method: 'POST',
    // 快速获取表单中的数据
    data: $(this).serialize(),
    success: function(res) {
      if (res.status !== 0) {
        return layer.msg('登录失败！')
      }
      layer.msg('登录成功！')
      // 将登录成功得到的 token 字符串，保存到 localStorage 中
      localStorage.setItem('token', res.token)
      // 跳转到后台主页
      // location.href = '/index.html';
      location.href = '/big_project/index.html'
    }
  })
})






    // // 监听注册
    // $('#reg_form').on('submit',function(e){
    //   e.preventDefault();
    //   //获取数据
    //   var data = {
    //     username : $('#reg_form [name = "username"]').val(),
    //     password : $('#reg_form [name = "username"]').val()
    //   };
    //   //post请求
    //   $.post('/api/reguser',data,function(res){
    //     console.log(res);
    //     if(res.status !== 0){
    //       return layer.msg(res.message);
    //     };
    //     layer.msg('注册成功,请登录');
    //     //成功后跳转登录页面
    //     $('#login').click();
    //   })
    // });

    //  // 监听登录

    //   $('#login_form').on('submit',function(e){
    //    e.preventDefault();
    //    //获取数据
    //    var data =$(this).serialize();
    //    //post请求
    //    $.post('http://ajax.frontend.itheima.net/api/login',data,function(res){
    //      console.log(res);
    //      if(status !== 0){
    //        return layer.msg('登录失败');
    //      };
    //      layer.msg('登录成功');
    
    //      //
    //      localStorage.setItem('token', res.token);
    //      location.href = "/big_project/index.html";
    //    })
    //  });
})