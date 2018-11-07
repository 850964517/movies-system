$(function () {
	$("#login-btn").on("click",function () {
		const userName = $("#username").val()
		const password = $("#password").val()
		if (!userName || !password) {
			alert("用户名和密码不能为空")
			return
		}
		$.ajax({
			url: "/login",
			type: "post",
			data: {
				username:userName,
				password: password
			},
			success: function(data){
				if (data.code === 200) {
					window.location.href = "/list"
				} else {
					alert(data.msg)
				}
			},error(err) {
				console.log(err)
			}
		})
	})
})