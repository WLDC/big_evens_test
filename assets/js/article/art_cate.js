$(function(){

  var layer =layui.layer;


  getCateList();

  function getCateList(){
    $.ajax({
      method : 'GET',
      url : '/my/article/cates',
      success : function(res){
        console.log(res);
        var htmlStr = template('art_cate', res);
        $('tbody').html(htmlStr)
      }
    })
  }

  //弹出增加表单
   
   $('#cateAdd').on('click',function(){
    indexAdd = layer.open({//
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#dialog-add').html()
  })
});


  //点击确认添加
  $('body').on('submit','#form-add',function(e){
    e.preventDefault();
    $.ajax({
      method : 'post',
      url : '/my/article/addcates',
      data : $(this).serialize(),
      success : function(res){
        console.log(res);
        if(res.status !== 0) {
          return layer.msg('添加失败');
        }
        
        getCateList();
        layer.msg('成功');
        layer.close(indexAdd);
      }
    })
  })
//////
  //修改



  //删除
})










// $(function() {
//   initArtCateList()

//   var layer = layui.layer
//   var form = layui.form;
//   // 弹出层索引
//   var indexAdd = null;
//   // 编辑按钮弹出层索引
//   var indexEdit = null;

//    // 获取文章分类的列表
//    function initArtCateList() {
//     $.ajax({
//       method: 'GET',
//       url: '/my/article/cates',
//       success: function(res) {
//         var htmlStr = template('tpl-table', res)
//         $('tbody').html(htmlStr)
//       }
//     })
//   }

//   // 为添加类别按钮绑定点击事件
//   $('#btnAddCate').on('click', function() {
//     indexAdd = layer.open({
//       type: 1,
//       area: ['500px', '250px'],
//       title: '添加文章分类',
//       content: $('#dialog-add').html()
//     })
//   })

//    // 通过代理的形式，为 form-add 表单绑定 submit 事件
//    $('body').on('submit', '#form-add', function(e) {
//     e.preventDefault()
//     $.ajax({
//       method: 'POST',
//       url: '/my/article/addcates',
//       data: $(this).serialize(),
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('新增分类失败！')
//         }
//         initArtCateList()
//         layer.msg('新增分类成功！')
//         // 根据索引，关闭对应的弹出层
//         layer.close(indexAdd)
//       }
//     })
//   })

//   $('tbody').on('click','.btn-edit', function () {
//     indexEdit = layer.open({
//       type: 1,
//       area: ['500px', '250px'],
//       title: '修改文章分类',
//       content: $('#dialog-edit').html()
//     })
//     var id = $(this).attr('data-id');
//     $.ajax({
//       method: 'GET',
//       url: '/my/article/cates/' + id,
//       success: function(res) {
//         form.val('form-edit', res.data)
//       }
//     })
//   })

//   $('body').on('submit', '#form-edit', function(e) {
//     e.preventDefault()
//     $.ajax({
//         method: 'POST',
//         url: '/my/article/updatecate',
//         data: $(this).serialize(),
//         success: function(res) {
//           if (res.status !== 0) {
//             return layer.msg('更新分类数据失败！')
//           }
//           layer.msg('更新分类数据成功！')
//           layer.close(indexEdit)
//           initArtCateList()
//         }
//       })
//     })

//     $('tbody').on('click','.btn-delete', function () {
//       var id = $(this).attr('data-id')
//       // 提示用户是否要删除
//       layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
//         $.ajax({
//           method: 'GET',
//           url: '/my/article/deletecate/' + id,
//           success: function(res) {
//             if (res.status !== 0) {
//               return layer.msg('删除分类失败！')
//             }
//             layer.msg('删除分类成功！')
//             layer.close(index)
//             initArtCateList()
//           }
//         })
//       })
//     })

// })