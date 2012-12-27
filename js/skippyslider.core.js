// times in milliseconds (seconds * 1000)
var slidingTime_auto = 2500;
var slidingTime_manual = 800;
var autoslideTime = 3500;

function autoSlideSwitch() {
	slideSwitch('next', slidingTime_auto);
}

var sliding = false;
function slideSwitch(direction, slidingTime) {
	sliding = true;
	var $active = $('#skippySlider DIV.active');
	var $next = null;

	if ($active.length == 0)
		$active = $('#skippySlider DIV:last');

	if (direction == 'prev')
		$next = $active.prev().length ? $active.prev()
				: $('#skippySlider DIV:last');
	else
		$next = $active.next().length ? $active.next()
				: $('#skippySlider DIV:first');

	$active.addClass('last-active');
	$next.css({
		opacity : 0.0
	}).addClass('active').animate({
		opacity : 1.0
	}, slidingTime, function() {
		$active.removeClass('active last-active');
		sliding = false;
	});
}

ctrl = $(".slider-control");
ban = $("#bannerSlider");
ctrl_left = $('.slider-control.left');
ctrl_right = $('.slider-control.right');
ctrl.hide('slow');
hiding = false;

// hide controls when enter and protect from multiple hiding/showing, run autoslide
// FIXME: change to jquery queues support
ban.bind("mouseleave", function(evt) {
	playSlideshow = setInterval("autoSlideSwitch()", autoslideTime);
	if (ctrl.is(":visible") && !hiding) {
		hiding = true;
		ctrl.hide('slow', function() {
			hiding = false;
		});
	}
});
// show controls when enter and protects from multiple hiding/showing, disable autoslide
ban.bind("mouseenter", function(evt) {
	clearInterval(playSlideshow);
	if (ctrl.is(":hidden") || hiding) {
		ctrl.show('slow', function() {
			hiding = false;
		});
	}
});
// bind left/right slide
ctrl_left.bind("click", function(evt) {
	if (!sliding)
		slideSwitch('prev', slidingTime_manual)
});
ctrl_right.bind("click", function(evt) {
	if (!sliding)
		slideSwitch('next', slidingTime_manual)
});
var playSlideshow = setInterval("autoSlideSwitch()", autoslideTime);