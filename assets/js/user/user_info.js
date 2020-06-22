$(function(){
  var form = layui.form;
  form.verify({
    nickname: function(value) {
      if (value.length > 6) {
        return '长度在1-6个字符之间';
      }
    }
  });
  // 获取用户的基本信息
  getInfo();
   // 封装一个函数 获取数据

  function getInfo() {
    $.ajax({
      method : 'get',
      url : '/my/userinfo',
      // headers: {
      //   Authorization: localStorage.getItem('token') || '',
      // },
      success: function (res) {
        //  console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        };
        // console.log('成功');
        form.val("formUserInfo", res.data)
      }
    })
  }

  //重置
  $('#restBtn').on('click',function(e){
    e.preventDefault();
    getInfo();
  });

  var layer = layui.layer;

  //点击提交
  $('.layui-form').on('submit',function(e){
    // console.log('11');
    e.preventDefault();
    $.ajax({
      method :'post',
      url : '/my/userinfo',
      data : $(this).serialize(),
      success : function(res){
        console.log(res);
        if(res.status !== 0){
          return layer.msg('更新数据失败');
        }
        layer.msg('更新数据成功');
        window.parent.getUserInfo();
      }
    })
  })

});














// $(function() {
//   var form = layui.form

//   form.verify({
//     nickname: function(value) {
//       if (value.length > 6) {
//         return '昵称长度必须在 1 ~ 6 个字符之间！'
//       }
//     }
//   })

//   initUserInfo()

//   // 因为 form 为局部变量，我们无法在函数之外使用，所以我们把 initUserInfo 移入到了函数内
//   // 初始化用户的基本信息
//   function initUserInfo() {
//     $.ajax({
//       method: 'GET',
//       url: '/my/userinfo',
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('获取用户信息失败！')
//         }
//         form.val("formUserInfo", res.data)
//       }
//     })
//   }

//   // 重置表单的数据
//   $('#btnReset').on('click', function(e) {
//     // 阻止表单的默认重置行为
//     e.preventDefault()
//     initUserInfo()
//   })

//   // 监听表单的提交事件
//   $('.layui-form').on('submit', function (e) {
//     // 阻止表单的默认重置行为
//     e.preventDefault();
//     // 发起 ajax 数据请求
//     $.ajax({
//       method: 'POST',
//       url: '/my/userinfo',
//       data: $(this).serialize(),
//       success: function (res) {
//         if (res.status !== 0) {
//           return layer.msg('更新用户信息失败！')
//         }
//         layer.msg('更新用户信息成功！')
//         // 调用父页面中的方法，重新渲染用户的头像和用户的信息
//         // <iframe> 中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可
//         window.parent.getUserInfo()
//       }
//     })
//   })
// })