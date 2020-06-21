$(function () {
  $('.layui-nav-img').hide();
  $('.text-avatar').hide();

  getUserInfo();

  //退出功能
  //1. 根据layui 获取弹出对象
  var layer = layui.layer;
  //2. 点击退出 返回登录页面
  $('#outBack').on('click',function(){
    //3. 弹出确认框
    layer.confirm('你确定要退出吗?', {icon: 3, title:'提示'}, function(index){
      //点击确定 
      //3.1 清空本地储存
      localStorage.removeItem('token');
      //3.2 跳转登录页面
      location.href = '/big_project/login.html';
      
      layer.close(index);
    });  
  });
});
function getUserInfo() {
  //获取用户基本信息
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    success: function (res) {
      //  console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      // data   : 用户的基本信息
      renderAvatar(res.data)
    }
  })
};

//渲染用户头像  传递形参
function renderAvatar (user) {
  //1. 获取用户的名称
  var name = user.nickname || user.username;
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  // 3. 按需求 渲染用户的头像  判断 是否为图片 如果不是图片 使用文本头像
        if(user.user_pic !== null) {
          // 3.1 渲染图片头像   隐藏文本头像
          $('.layui-nav-img').attr('src',user.user_pic).shouw();
          //隐藏文本头像
          $('.text-avatar').hide();
        }else {
          // 3.2 渲染文本头像   隐藏图片头像
          //获取文本  //首个文本改为大写
          $('.text-avatar').html(name[0].toUpperCase()).show();
          $('.layui-nav-img').hide();
          
        }
        
        

  
}














// // 获取用户的基本信息
// function getUserInfo() {
//   $.ajax({
//     method: 'GET',
//     url: '/my/userinfo',
//     // headers 就是请求头配置对象
//     headers: {
//       Authorization: localStorage.getItem('token') || ''
//     },
//     success: function(res) {
//       if (res.status !== 0) {
//         return layui.layer.msg('获取用户信息失败！')
//       }
//       // 调用 renderAvatar 渲染用户的头像
//       renderAvatar(res.data)
//     },
//     // // 不论成功还是失败，最终都会调用 complete 回调函数
//     // complete: function(res) {
//     //   // console.log('执行了 complete 回调：')
//     //   // console.log(res)
//     //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
//     //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
//     //     // 1. 强制清空 token
//     //     localStorage.removeItem('token')
//     //     // 2. 强制跳转到登录页面
//     //     location.href = '/login.html'
//     //   }
//     // }
//   })
// }

// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}

/**
 * 主动切换 nav 
 * @param {*} newNavId 新的 nav 元素 id
 * @param {*} oldNavId 旧的 nav 元素 id
 */
function changeNav(newNavId, oldNavId) {
  $('#' + oldNavId).removeClass('layui-this');
  $('#' + newNavId).addClass('layui-this');
}