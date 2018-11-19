/* eslint-disable no-console */
$(function() {
	$('#update-btn').on('click', function() {
		const name = $('#movie-name').val();
		const title = $('#movie-title').val();
		const doctor = $('#movie-doctor').val();
		const year = $('#movie-year').val();
		const updateTime = $('#movie-updateTime').val();
		const country = $('#movie-country').val();
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
				country: country
			},
			success: function (data) {
				if (data.code === 200) {
					alert('修改成功');
					window.location.href = '/movie/list';
				} else {
					alert(data.msg);
				}
			},
			error:function(err) {
				console.log(err);
			}
		});
	});
});