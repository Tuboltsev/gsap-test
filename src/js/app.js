$(document).ready(function() {

	var sliderSection = $('.slider-section'),
		oldScrolled = 0,

		scrollbar = Scrollbar.init(document.getElementById('wrapper'), {
			continuousScrolling: false,
			// alwaysShowTracks: true,
		}),

		tl = new TimelineMax({
			onComplete: function() { 
				disableScroll(false);
			}
		}).set(
			[$('.slide1'), $('.slider-description').first().addClass('current')], 
			{autoAlpha: 1}
		);


	scrollbar.addListener(function() {
		
		var scrolled = this.scrollTop,
			coords = sliderSection.position();

		if (coords.top > scrolled && coords.top - scrolled < 10 && oldScrolled < scrolled) {
			disableScroll(true, this);
			scrollbar.scrollTo(coords.left, coords.top);
			scrollbar.setPosition(coords.left, coords.top);
			animateIn(tl);
		}

		if (coords.top < scrolled && scrolled - coords.top < 20 && oldScrolled > scrolled) {
			disableScroll(true, this);
			scrollbar.scrollTo(coords.left, coords.top);
			scrollbar.setPosition(coords.left, coords.top);
			animateIn(tl);
		}

		oldScrolled = scrolled;
	});
	
	
	$('.slider-skip').on('click', function() {
		disableScroll(false);
		var descSlideIdx = tl.seek().data;
		if (descSlideIdx && descSlideIdx.endSlide) {
			showSlideDescription(descSlideIdx.endSlide);
		}
	});


	function disableScroll(status, scope) {
		scope = scope || scrollbar;

		if (status) {
			scope.options.damping = 0;
		} else {
			scope.options.damping = 0.1;
		}
	}
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