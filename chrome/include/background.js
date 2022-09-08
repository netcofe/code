chrome.runtime.onConnect.addListener(function(port) {
	if (port.name == "yisheng") {
		port.onMessage.addListener(function(msg) {
			//console.info(msg)
			if (msg.joke == "Knock") {
				//console.info(msg);				
				if (msg.info) {
					//port.postMessage({ url: chrome.extension.getURL("include/data/") });
					if (msg.info.href.indexOf("com/videoContent/") > -1) {
						//port.postMessage({ joke: "Knock", look: "videoContent", info:chrome.extension.getURL("include/data/") });
					}
					if (msg.info.href.indexOf("www.iqiyi.com/v_") > -1 && msg.info.host.indexOf(
							"iqiyi.com") > -1) {
						port.postMessage({
							joke: "Knock",
							look: "iqiyi2",
							info: chrome.extension.getURL(
								"include/data/iqiyi/")
						});
					}
					if (msg.info.href.indexOf("v.youku.com/v_show/id_") > -1 && msg.info.host.indexOf(
							"youku.com") > -1) {
						port.postMessage({
							joke: "Knock",
							look: "iqiyi2",
							info: chrome.extension.getURL(
								"include/data/iqiyi/")
						});
					}
					if (msg.info.href.indexOf("v.qq.com/x/cover") > -1 && msg.info.host.indexOf(
							"qq.com") > -1) {
						port.postMessage({
							joke: "Knock",
							look: "iqiyi2",
							info: chrome.extension.getURL(
								"include/data/iqiyi/")
						});
					}
				}
			}
		});
	}
});
// chrome.contextMenus.create({
// 	title: '父菜单1', // %s表示选中的文字
// 	id: '0',
// 	contexts: ['all'], // 只有当选中文字时才会出现此右键菜单
// 	onclick: function(params) {
// 		// 注意不能使用location.href，因为location是属于background的window对象
// 		chrome.tabs
// 	.create({ url: `https://www.baidu.com/s?wd=${encodeURI(params.selectionText)}&ie=UTF-8` });
// 	}

// });


var temp = {}
temp["time"] = new Date();
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		//message_tab(details['type'])
		//console.info(details)
		var url = details.url;
		//console.debug(url);
		// //console.debug(details.method, details.type, details.url)		
		if (url.indexOf("12312312790e4525f377e47e00b3.v1661493031680.js") > -1) {
			//console.debug(url.replace(txt,""));
			return {
				redirectUrl: chrome.extension.getURL("include/data/123.js")
			};
		}

		if (url.indexOf("hls/index.m3u8") > -1 && url.indexOf("start=") > -1 && url.indexOf("&end=") > -1) {
			var a = url.indexOf("start=");
			var b = url.indexOf("&sign") + 1;
			var txt = url.substr(a, b - a);
			//console.debug(details)
			var newurl = url.replace(txt, "");
			chrome.tabs.query({ active: true, currentWindow: true },
				function(tabs) {
					chrome.tabs.sendMessage(
						details.tabId, {
							greeting: "hello",
							chr: chrome.extension.getURL(
								"include/data/videoContent/"),
							url: chrome.extension.getURL(
								"include/data/hls/index.html?") + newurl
						},
						function(response) {
							//console.log(response.farewell);
						});
				});
			//console.debug(url.replace(txt,""));
			return {
				redirectUrl: newurl
			};
		}
	}, {
		urls: ["<all_urls>"]
	},
	["blocking"]
);


var timernd = function(tag) {
	var tmp = ((new Date()).getTime()).toString();
	tmp = tmp.substr(0, 11) + fix(tag, 2);
	return tmp;
}

var fix = function(num, length) {
	return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

var getQueryString = function(url, e) {
	var a = new RegExp("(/?|^|&)" + e + "=([^&]*)(&|$)"),
		t = url.match(a);
	return null != t ? t[2] : null
}
