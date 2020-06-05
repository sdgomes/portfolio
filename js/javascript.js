(function ($) {
	"use strict";
	function vibrateClick() {
		try {
			navigator.vibrate(25);
		} catch (error) {
			console.log('Error: ' + error.message)
		}
	}

	$('[name="list-slide"]').click(function () {
		vibrateClick()
	})
	$('.button').click(function () {
		vibrateClick()
	})
	$('a').click(function () {
		vibrateClick()
	})
	$('button').click(function () {
		vibrateClick()
	})
	$('.back-button').click(function () {
		vibrateClick()
	})

	$('.slider-for').slick({
		centerMode: true,
		adaptiveHeight: true,
		centerPadding: '60px',
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider-nav',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					centerPadding: '30px',
				}
			}, {
				breakpoint: 480,
				settings: {
					centerPadding: '10px',
				}
			}
		]
	});
	$('.slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		centerMode: true,
		focusOnSelect: true,
		breakpoint: 345,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					centerPadding: '40px'
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					centerPadding: '75px'
				}
			}
		]
	});

	$(document).on('click', '[name="filter-button"]', function () {
		var show = $(this).attr('class');
		$('[name="filter-button"]').each(function () {
			$(this).removeAttr('data-widget');
		});
		$(this).attr('data-widget', 'active');
		$.when($('.post').each(function () {
			$(this).show("scale");
			var test = $(this).attr('class');
			if (test.indexOf(show) < 0) $(this).hide("scale");
		})).done(
			() => {
				$('[data-slick-index="1"]').trigger('click')
			}
		);

	});

	window.addEventListener('load', function () {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					addComment()
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);

	$(window).scroll(() => {
		if ($(window).scrollTop() >= ($('.header').outerHeight() - 20)) {
			$('.back-button').hide('fade')
		} else {
			$('.back-button').show('fade')
		}
	});

	$('[data-dismiss="modal"]').click(function () {
		$("#demo").empty()
	});

	$('[name="viewer-portfolio"]').click(function (e) {
		e.preventDefault();

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				myFunction(this);
			}
		};
		xhttp.open("GET", $(this).attr('href'), true);
		xhttp.send();
	});

	function myFunction(xml) {
		var xmlDoc = xml.responseXML;
		var finalHTML = ""
		finalHTML += "<div class='layer-portfolio'>" +
			"<div class='content-container'>" +
			"<header class='row'><div class='col-sm-9 pb-5 text-center text-sm-left'><h2>" + xmlDoc.getElementsByTagName("TITLEH2")[0].childNodes[0].nodeValue + "</h2></div>" +
			"<div class='col-sm-3 pb-5'><div class='ml-sm-auto layer-close' data-dismiss='modal'><i class='fas fa-times'></i></div></div></header>" +
			"<article class='row'><section class='col-md-8 px-md-3 p-0'><div class='row'>"
		var imagelist = xmlDoc.getElementsByTagName("IMAGELIST");
		var finalImages = "";
		for (let i = 0; i < imagelist.length; i++) {
			finalImages += "<div><img src='" +
				imagelist[i].getElementsByTagName("DATASRC")[0].childNodes[0].nodeValue +
				"' class='w-100 mb-5'></div>"
		}
		finalHTML += finalImages + "</div></section><section class='col-md-4 p-0'><div class='description-side'>" +
			'<h3>' + xmlDoc.getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue + '</h3>'
		var pList = xmlDoc.getElementsByTagName("TEXTABOUT");
		var finalP = ""
		for (let i = 0; i < pList.length; i++) {
			finalP += "<p>" +
				pList[i].getElementsByTagName("P")[0].childNodes[0].nodeValue +
				"</p>"
		}
		finalHTML += finalP + "<h3>CLIENT</h3><p>" + xmlDoc.getElementsByTagName("CLIENT")[0].childNodes[0].nodeValue + "</p>" +
			"<h3>TECHNOLOGY</h3><ul class='tech-tag'>"
		var tagList = xmlDoc.getElementsByTagName("TECHNOLOGY");
		var finalTag = ""
		for (let i = 0; i < tagList.length; i++) {
			finalTag += "<li><a>" +
				tagList[i].getElementsByTagName("TAG")[0].childNodes[0].nodeValue +
				"</li></a>"
		}
		finalHTML += finalTag + "</ul></div>" +
			"<div class='text-left py-4'><a class='button' href='" + xmlDoc.getElementsByTagName("PROJECTHREF")[0].childNodes[0].nodeValue + "'>"
			+ xmlDoc.getElementsByTagName("PROJECTSTATUS")[0].childNodes[0].nodeValue
			+ "</a></div></section></article></div></div>"
		$("#demo").html(finalHTML);
	}
})(jQuery);