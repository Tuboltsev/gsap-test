$(document).ready(function() {

	var sliderSection = $('.slider-section'),
		oldScrolled = 0,
		tl = new TimelineMax({
			onComplete: function() { 
				$(window).disablescroll('undo');
			}
		})
		.set(
			[$('.slide1'), $('.slider-description').first().addClass('current')], 
			{autoAlpha: 1}
		);

	window.onscroll = function() {
		var scrolled = $(document).scrollTop(),
			coords = sliderSection.position();

		if (coords.top > scrolled && coords.top - scrolled < 50 && oldScrolled < scrolled) {
			$("html, body").stop()
				.animate({scrollTop:coords.top}, 150, 'swing', function() {
					$(window).disablescroll();
					animateIn(tl);
			});
		}

		if (coords.top < scrolled && scrolled - coords.top < 50 && oldScrolled > scrolled) {
			$("html, body").stop()
				.animate({scrollTop:coords.top}, 150, 'swing', function() {
					$(window).disablescroll();
					animateOut(tl);
			});
		}

		oldScrolled = scrolled;
	}
	
	$('.slider-skip').on('click', function() {
		$(window).disablescroll('undo');
		var descSlideIdx = tl.seek().data.endSlide;
		showSlideDescription(descSlideIdx);
	});

});


function animateIn(timeline) {

	timeline.clear()

	  .call(showSlideDescription, [1])
	  .fromTo($('.slide2'), 1, {autoAlpha: 0}, {autoAlpha: 1}, 'slide2')
	  .fromTo($('.slide2 .piece'), 1, 
	  	{autoAlpha: 0, scale: 0.43, y: -78, x: -27}, 
	  	{autoAlpha: 1, scale: 1, y: 235, x: -90}, 'slide2')

	  .to($('.slide2 .piece'), 1, {scale: 0.43, y: -78, x: -27}, '+=0.5')
	  .call(showSlideDescription, [2])
	  .fromTo($('.slide3'), 1, {autoAlpha: 0}, {autoAlpha: 1}, 'slide3')
	  .fromTo($('.slide3 .piece'), 1, 
	  	{autoAlpha: 0, scale: 0.45, y: 40, x: 15}, 
	  	{autoAlpha: 1, scale: 1, y: 70, x: 140}, 'slide3')

	  .to($('.slide3 .piece'), 1, {scale: 0.45, y: 40, x: 15}, '+=0.5')
	  .call(showSlideDescription, [3])
	  .fromTo($('.slide4'), 1, {autoAlpha: 0}, {autoAlpha: 1}, 'slide4')
	  .fromTo($('.slide4 .piece'), 1, 
	  	{autoAlpha: 0, scale: 0.45, y: 100, x: -25}, 
	  	{autoAlpha: 1, scale: 1, y: 50, x: -160}, 'slide4')

	  .to($('.slide4 .piece'), 1, {scale: 0.45, y: 100, x: -25}, '+=0.5')
	  .call(showSlideDescription, [4])
	  .fromTo($('.slide5'), 1, {autoAlpha: 0}, {autoAlpha: 1}, 'end')
	  .data = {endSlide: 4};
}


function animateOut(timeline) {

	timeline.clear()

	  .call(showSlideDescription, [3])
	  .fromTo($('.slide5'), 1, {autoAlpha: 1}, {autoAlpha: 0}, 'slide5')

	  .fromTo($('.slide4 .piece'), 1, 
	  	{autoAlpha: 0, scale: 0.45, y: 100, x: -25}, 
	  	{autoAlpha: 1, scale: 1, y: 50, x: -160}, 'slide5')
	  .to($('.slide4 .piece'), 1, {scale: 0.45, y: 100, x: -25}, '+=0.5')
	  .call(showSlideDescription, [2])
	  .fromTo($('.slide4'), 1, {autoAlpha: 1}, {autoAlpha: 0}, 'slide4')

	  .fromTo($('.slide3 .piece'), 1, 
	  	{autoAlpha: 0, scale: 0.45, y: 40, x: 15}, 
	  	{autoAlpha: 1, scale: 1, y: 70, x: 140}, 'slide4')
	  .to($('.slide3 .piece'), 1, {scale: 0.45, y: 40, x: 15}, '+=0.5')
	  .call(showSlideDescription, [1])
	  .fromTo($('.slide3'), 1, {autoAlpha: 1}, {autoAlpha: 0}, 'slide3')

	  .fromTo($('.slide2 .piece'), 1, 
	  	{autoAlpha: 0, scale: 0.43, y: -78, x: -27}, 
	  	{autoAlpha: 1, scale: 1, y: 235, x: -90}, 'slide3')
	  .to($('.slide2 .piece'), 1, {scale: 0.43, y: -78, x: -27}, '+=0.5')
	  .call(showSlideDescription, [0])
	  .fromTo($('.slide2'), 1, {autoAlpha: 1}, {autoAlpha: 0}, 'end')
	  .data = {endSlide: 0};
}


function showSlideDescription(slideIndex) {
	var active = $('.slider-descriptions').children().eq(slideIndex),
		current = $('.slider-descriptions').find('.current');

	if (current.index() !== slideIndex) {
		TweenMax.to(current.removeClass('current'), 1, {autoAlpha: 0});
		TweenMax.to(active.addClass('current'), 1, {autoAlpha: 1});
	}
}