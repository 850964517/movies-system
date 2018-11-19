/* eslint-disable no-console */
$(function(){
	// 删除电影
	$('.del').click(function(e) {
		const $target = $(e.target);
		const id = $target.data('id');
		if (!id) return;
		const flag = window.confirm('你确认删除该电影么?');
		var tr = $('.item-id-' + id);
		if(flag) {
			$.ajax({
				url: '/movie/list?id='+id,
				type:'DELETE',
				success: function(data) {
					alert(data.msg);
					if (data.code === 200) {
						tr.remove();
					} 
				}, error: function(err) {
					console.log(err);
				}
			});
		}
	});
});