(function ($) {
	"use strict";

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

	$('[name="list-slide"]').click(function () {
		vibrateClick()
	})
	function vibrateClick() {
		try {
			navigator.vibrate(25);
		} catch (e) {
			console.log("outer", e.message);
		}
	}
})(jQuery);