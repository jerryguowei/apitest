function init() {
	showHeaders();
	var a = ['api_id', 'method', 'test', 'data', 'sign'];
	for (var n in a) {
		$('.httpparameter:first').clone(true).appendTo("#allparameters").find("label").text(a[n]);
	}
}
init();


function showHeaders() {
	$("#allparameters").show();
}

$("#addprambutton").click(function (e) {
	e.preventDefault();
	$('.httpparameter:first').clone(true).appendTo("#allparameters");
	showHeaders();
});

function postWithAjax(myajax) {
	myajax = myajax || {};
	myajax.url = $("#web :selected").text();
	myajax.type = $("#httpmethod").val();

	myajax.complete = function (jqXHR) {
		$("#statuspre").text(
			"HTTP " + jqXHR.status + " " + jqXHR.statusText);
		if (jqXHR.status == 0) {
			httpZeroError();
		} else if (jqXHR.status >= 200 && jqXHR.status < 300) {
			$("#statuspre").addClass("alert-success");
		} else if (jqXHR.status >= 400) {
			$("#statuspre").addClass("alert-error");
		} else {
			$("#statuspre").addClass("alert-warning");
		}
		$("#outputpre").text(jqXHR.responseText);
		$("#headerpre").text(jqXHR.getAllResponseHeaders());
	}

	if (jQuery.isEmptyObject(myajax.data)) {
		myajax.contentType = 'application/x-www-form-urlencoded';
	}

	$("#outputframe").hide();
	$("#outputpre").empty();
	$("#headerpre").empty();
	$("#outputframe").attr("src", "")
	$("#ajaxoutput").show();
	$("#statuspre").text("0");
	$("#statuspre").removeClass("alert-success");
	$("#statuspre").removeClass("alert-error");
	$("#statuspre").removeClass("alert-warning");

	$('#ajaxspinner').show();
	var req = $.ajax(myajax).always(function () {
		$('#ajaxspinner').hide();
	});
}

$("#submitajax").click(function (e) {
	e.preventDefault();
		postWithAjax({
			data: createUrlData()
		});
	
});


function checkForAuth() {
	return $("#paramform").find("input[type=password]").length > 0;
}

function createUrlData() {
	var mydata = {};
	var parameters = $("#allparameters").find(".realinputvalue");
	for (i = 0; i < parameters.length; i++) {
		name = $(".mylabel").eq(i + 1).text();
		if (name == undefined || name == "undefined") {
			continue;
		}
		value = $(parameters).eq(i).val();
		mydata[name] = value
	}
	return (mydata);
}

function sign() {

	var data = createUrlData();
	data['key'] = $("#key").val();

	var keys = [];

	for (k in data) {
		if (data.hasOwnProperty(k)) {
			keys.push(k);
		}
	}

	keys.sort();
	len = keys.length;
	var s;
	if (!data['key']) {
		alert('your forget your key!');
	}
	s = data['key'];
	for (i = 0; i < len; i++) {
		if (keys[i] == 'key' || !data[keys[i]] || keys[i] == 'sign') continue;
		s += keys[i] + data[keys[i]];
	}
	s += data['key'];
	return s;
}

$("#submitSign").click(function (e) {
	e.preventDefault();
	s = sign();
	$.ajax({
		url: "signmd5.php",
		type: "POST",
		data: { data: s },
		complete: function (data) {
			$("#outputkey").text('Sign: ' + data.responseText);
			$(".realinputvalue:last").val(data.responseText);
		},
	});

});


function httpZeroError() {
	$("#errordiv").append('<div class="alert alert-error"> <a class="close" data-dismiss="alert">&times;</a> <strong>Oh no!</strong> Javascript returned an HTTP 0 error. One common reason this might happen is that you requested a cross-domain resource from a server that did not include the appropriate CORS headers in the response. Better open up your Firebug...</div>');
}




$("#web").change(function (e) {
	val = $(this).val();

	if (val == "1") {
		showHeaders();
		number = $("#allparameters").find(".realinputvalue").length;
		for (i = 0; i < number; i++) {
			$('.httpparameter:last').remove();
		}
		var a = ['api_id', 'method', 'test', 'data', 'sign'];
		for (var n in a) {
			$('.httpparameter:first').clone(true).appendTo("#allparameters").find("label").text(a[n]);

		}

	}

	if (val == "2") {
		showHeaders();
		number = $("#allparameters").find(".realinputvalue").length;
		for (i = 0; i < number; i++) {
			$('.httpparameter:last').remove();
		}
		var a = ['api_id', 'method', 'test', 'data', 'sign'];
		for (var n in a) {
			$('.httpparameter:first').clone(true).appendTo("#allparameters").find("label").text(a[n]);

		}

	}


	if (val == "3") {
		showHeaders();
		number = $("#allparameters").find(".realinputvalue").length;
		for (i = 0; i < number; i++) {
			$('.httpparameter:last').remove();
		}
		var a = ['api_id', 'method', 'test', 'data', 'sign'];
		for (var n in a) {
			$('.httpparameter:first').clone(true).appendTo("#allparameters").find("label").text(a[n]);

		}

	}


	if (val == "4") {
		showHeaders();
		number = $("#allparameters").find(".realinputvalue").length;
		for (i = 0; i < number; i++) {
			$('.httpparameter:last').remove();
		}
		var a = ['api_id', 'test', 'data', 'sign'];
		for (var n in a) {
			$('.httpparameter:first').clone(true).appendTo("#allparameters").find("label").text(a[n]);

		}

	}




	if (val == "5") {
		showHeaders();
		number = $("#allparameters").find(".realinputvalue").length;
		for (i = 0; i < number; i++) {
			$('.httpparameter:last').remove();
		}
		var a = ['api_id', 'method', 'test', 'data', 'sign'];
		for (var n in a) {
			$('.httpparameter:first').clone(true).appendTo("#allparameters").find("label").text(a[n]);

		}

	}

});