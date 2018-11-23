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
					console.log(data.msg);
					if (data.code === 200) {
						tr.remove();
					} 
				}, error: function(err) {
					console.log(err);
				}
			});
		}
	});

	// 搜索电影
	$("#search-btn").click(function () {
		$.ajax({
			url:"/movie/search?name=" + $("#search-input").val(),
			type: "get",
			success: function(res) {
				if (res.code === 200) {
					const data = res.data
					let html = '',currentData = null
					for (var i = 0; i < data.length;i++) {
						currentData = data[i]
						html += `<tr><td>${currentData.name}</td>`
						html += `<td>${currentData.title}</td>`
						html += `<td>${currentData.doctor}</td>`
						html += `<td>${currentData.year}</td>`
						html += `<td>${currentData.updateTime}</td>`
						html += `<td>${currentData.country}</td>`
						html += `<td>${currentData.language}</td>`
						html += `<td>${currentData.summary}</td>`
						html += `<td><a target="_blank" href="/movie/update/${currentData._id}">修改</a></td>`
						html += `<td><button type="button" data-id="${currentData._id}" class="btn btn-danger del">删除</button></td></tr>`
					}
					$("#movie-list tbody").html(html)
				}
			},error: function (err) {
				console.log(err)
			}
		})
	})
});