/* eslint-disable no-console */
$(function() {
	// 修改电影
	$('#update-btn').on('click', function() {
		const name = $('#movie-name').val();
		const title = $('#movie-title').val();
		const doctor = $('#movie-doctor').val();
		const year = $('#movie-year').val();
		const updateTime = $('#movie-updateTime').val();
		const country = $('#movie-country').val();
		const language = $('#movie-language').val();
		const summary = $('#movie-summary').val();
		$.ajax({
			url: '/movie/list',
			type:'put',
			data: {
				id: $('#movie-id').val(),
				name: name,
				title: title,
				doctor: doctor,
				year: year,
				updateTime: updateTime,
				country: country,
				language: language,
				summary: summary
			},
			success: function (data) {
				if (data.code === 200) {
					console.log('修改成功');
					window.location.href = '/movie/list';
				} else {
					console.log(data.msg);
				}
			},
			error:function(err) {
				console.log(err);
			}
		});
	});

	// 添加电影
	$('#add-btn').on('click', function() {
		const name = $('#movie-name').val();
		const title = $('#movie-title').val();
		const doctor = $('#movie-doctor').val();
		const year = $('#movie-year').val();
		const updateTime = $('#movie-updateTime').val();
		const country = $('#movie-country').val();
		const language = $('#movie-language').val();
		const summary = $('#movie-summary').val();
		$.ajax({
			url: '/movie/list',
			type:'post',
			data: {
				name: name,
				title: title,
				doctor: doctor,
				year: year,
				updateTime: updateTime,
				country: country,
				language: language,
				summary: summary
			},
			success: function (data) {
				if (data.code === 200) {
					console.log('添加成功');
					window.location.href = '/movie/list';
				} else {
					console.log(data.msg);
				}
			},
			error:function(err) {
				console.log(err);
			}
		});
	});
});