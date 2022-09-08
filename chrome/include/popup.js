$(function() {
	$("#click").unbind("click").click(function(e) {

	});
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		var bg = chrome.extension.getBackgroundPage();
		//console.debug(bg.temp[tabs[0].id])
		var data = bg.temp[tabs[0].id];
		for (var key in data) {
			var i = data[key];
			//$(".content").append('<div class="item">' + i.url + '</div>');
			if (!isExistButton(i.type)) {
				$(".top").append('<button class=selectitem>' + i.type + '</button>');
			}
		}
		$("button:contains(media)").click();
	});
	$(".top").on("click", "button", function() {
		$(".content").empty();
		var text = $(this).text();
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			var bg = chrome.extension.getBackgroundPage();
			var data = bg.temp[tabs[0].id];
			for (var key in data) {
				var i = data[key];
				if (i.type == text) {
					if (i.type == "image") {
						$(".content").prepend(
							'<div class="item"><img style="max-height:150px" src="' + i
							.url + '"></div>');
					} else {
						var url = i.url
						if (i.url.length > 70) {
							url = url.substring(0, 30) + '......' + url.substring(url.length -
								45, url.length);
						}
						$(".content").prepend('<div class="item"  title="' + i.url +
							'"><div class="url">' + url +
							'</div><div class="caozuo"><button>打开</button></div></div>');
					}
				}
			}
		});
	});
	$(".content").on("click", "button", function() {
		var url = $(this).parent().parent().attr("title");
		chrome.windows.create({
			// Just use the full URL if you need to open an external page
			url: "" + url,
			width: 960,
			height: 540,
			left: 400,
			type: "panel", //"normal", "popup", "panel", or "detached_panel"
			focused: true,
			incognito: true
		});
	});

});

function isExistButton(value) {
	var isExist = false;
	$(".top button").each(function(index) {
		if ($(this).text() == value) {
			isExist = true;
			return false
		}
	})
	return isExist;
}
