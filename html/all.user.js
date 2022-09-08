if (document.getElementById("signBtn")) {
	console.debug("签到");
	document.getElementById("signBtn").click();
}
//视频地址生成
var ig = document.getElementsByTagName('param');
for (var i = 0; i < ig.length; i++) {
	if (ig[i].name == "flashvars") {
		var param = ig[i].value;
		var x = param.indexOf("&a=");
		var y = param.indexOf("/index.m3u8");
		var param = param.substring(x + 3, y);
		var arr = param.split("/")
		console.clear();
		console.debug(param + "/mp4/" + arr[arr.length - 1] + ".mp4");
	}
}
//选择所有标签
if (document.URL.indexOf("ucenter/pm") > -1) {
	var allInputs = document.getElementsByTagName('input');
	var libIds = [];
	// 在所有Input中过滤出type="text" and name="libID"的元素，放到数组libIds中
	for (var i = 0; i < allInputs.length; i++) {
		if (allInputs[i].type === 'checkbox' && allInputs[i].checked == false) {
			allInputs[i].checked = true;
		}
	}
}
//大小事件
var kk;
window.onresize = function () {
	//console.debug("11");
	var obj = document.getElementById("game_view");
	if (obj && window.location.href.indexOf("time") > -1) {
		clearTimeout(kk);
		kk = setTimeout(function () {
			obj.style.height = parseInt(window.innerHeight) - 35 + "px";
			//console.debug(obj.style.height);
		}, 100);
	}
}