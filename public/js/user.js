$(function () {
	// 登录
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
	// 注册
	$("#register-btn").on("click", function () {
		const username = $("#username").val()
		const password = $("#password").val()
		const resPassword = $("#res-password").val()
		if (!username || !password || !resPassword) {
			alert("用户名和密码不能为空")
			return
		}
		if (password !== resPassword) {
			alert("两次密码不一致")
			return
		}
		$.ajax({
			url: "/register",
			type: "post",
			data: {
				username:username,
				password: password
			},
			success: function (data) {
				if (data.code === 200) {
					alert('恭喜你注册成功')
					window.location.href = "/"
				} else {
					alert(data.msg)
				}
			}, error (err) {
				console.log(err)
			}
		})
	})
})