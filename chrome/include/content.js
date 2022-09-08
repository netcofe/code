chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
     // console.log(sender.tab ?
     //             "from a content script:" + sender.tab.url :
     //             "from the extension");
     if (request.greeting == "hello")//判断是否为要处理的消息
      {
		 sendResponse({farewell: "goodbye"});
		 //console.log(request.url);
		 var url=request.chr;

		 $.get(url + "index.html", function(content) {
		 	content = content.replace(/(href="|src=")(?!http).*(css|js)/g, function(word, tag) {
		 		return word.replace(tag, tag + url);
		 	});
		 	//console.info(content)
			var html=content.replace("{url}",request.url);
		 	let doc = new DOMParser().parseFromString(html, 'text/html');
		 	$("head").append(doc.querySelector("head").innerHTML);
		 	$("body").append(doc.querySelector("body").innerHTML);
		 });
	  }

 });
var port = chrome.runtime.connect({ name: "yisheng" }); //通道名称
port.postMessage({ joke: "Knock", info: document.location }); //发送消息
port.onMessage.addListener(function(msg) { //监听消息
	console.info(msg);
	if (msg.joke == "Knock") {
		if (msg.look == "iqiyi") {
			//loadhtml(msg.info);
		}
		if (msg.look == "videoContent") {
			//loadhtml(msg.info);
			console.info(msg.info)
		}
		if (msg.look == "iqiyi2") {
			loadhtml(msg.info);
			console.info(msg.info)
			//console.info(msg)
			// var url = document.location.href;
			// var r = confirm("是否VIP窗口");
			// if (r == true) {
			// 	window.location.href = "https://www.com/?url=" + url;
			// } else {
			// 	//window.open(url);
			// }
		}
	}
	//loadhtml2(msg.url);
	//port.postMessage({answer: "yisheng"});
});



function loadhtml(url) {
	$.get(url + "index.html", function(content) {
		content = content.replace(/(href="|src=")(?!http).*(css|js)/g, function(word, tag) {
			return word.replace(tag, tag + url);
		});
		//console.info(content)
		let doc = new DOMParser().parseFromString(content, 'text/html');
		$("head").append(doc.querySelector("head").innerHTML);
		$("body").append(doc.querySelector("body").innerHTML);
	});
}

//var kk = 0;
//var zhumain = setInterval(() => loadAAAA(), 1500);
// var loadAAAA = function() {
// 	clearInterval(zhumain);
// }

function loadhtmlx(url) {
	body = document.getElementsByTagName('body').item(0)
	var script = document.createElement('script');
	script.src = url;
	script.type = 'text/javascript';
	script.defer = true;
	void(body.appendChild(script));
	//window.status=msg;
}

function loadhtml2(url) {
	$.get(url + "index.html", function(content) {
		content = content.replace(/(href="|src=")(?!http).*(css|js)/g, function(word, tag) {
			return word.replace(tag, tag + url);
		});
		//console.info(content)
		let doc = new DOMParser().parseFromString(content, 'text/html');
		$("head").append(doc.querySelector("head").innerHTML);
		$("body").append(doc.querySelector("body").innerHTML);
	});
}
// ==UserScript==
// @namespace https://github.com/
// @description 自动订单
// @require https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
function withjQuery(callback, safe) {
	if (typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
		if (safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery, window);";
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		} else {
			var dollar = undefined;
			if (typeof($) != "undefined") dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery, window);
			});
		}
		document.head.appendChild(script);
	} else {
		setTimeout(function() {
			//Firefox supports
			callback(jQuery, typeof unsafeWindow === "undefined" ? window : unsafeWindow);
		}, 30);
	}
}
// withjQuery(function($, window){
//  $(function() { alert("jQuery loaded"); })();
// }, true);
