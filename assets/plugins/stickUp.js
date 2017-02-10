jQuery(
	function($) {

		$(document).ready(function() {
			var contentButton = [];
			var contentTop = [];
			var content = [];
			var lastScrollTop = 0;
			var scrollDir = '';
			var itemClass = '';
			var itemHover = '';
			var menuSize = null;
			var stickyHeight = 0;
			var stickyMarginB = 0;
			var currentMarginT = 0;
			var topMargin = 0;
			$(window).scroll(function(event) {
				var st = $(this).scrollTop();
				if (st > lastScrollTop) {
					scrollDir = 'down';
				} else {
					scrollDir = 'up';
				}
				lastScrollTop = st;
			});
			$.fn.stickUp = function(options) {
				// adding a class to users div
				$(this).addClass('stuckMenu');
				//getting options
				var objn = 0;
				if (options != null) {
					for (var o in options.parts) {
						if (options.parts.hasOwnProperty(o)) {
							content[objn] = options.parts[objn];
							objn++;
						}
					}
					if (objn == 0) {
						console.log('error:needs arguments');
					}

					itemClass = options.itemClass;
					itemHover = options.itemHover;
					if (options.topMargin != null) {
						if (options.topMargin == 'auto') {
							topMargin = parseInt($('.stuckMenu').css('margin-top'));
							console.log(topMargin)
						} else {
							if (isNaN(options.topMargin) && options.topMargin.search("px") > 0) {
								topMargin = parseInt(options.topMargin.replace("px", ""));
							} else if (!isNaN(parseInt(options.topMargin))) {
								topMargin = parseInt(options.topMargin);
							} else {
								console.log("incorrect argument, ignored.");
								topMargin = 0;
							}
						}
					} else {
						topMargin = 0;
					}
					menuSize = $('.' + itemClass).size();
					console.log(menuSize)
				}
				stickyHeight = parseInt($(this).height());
				stickyMarginB = parseInt($(this).css('margin-bottom'));
				currentMarginT = parseInt($(this).next().closest('div').css('margin-top'));
				vartop = parseInt($(this).offset().top);
				console.log(currentMarginT)
				//$(this).find('*').removeClass(itemHover);
			}
			$('.main-wrapper').on('scroll', function() {
				varscroll = parseInt($('.main-wrapper').scrollTop());
				console.log(varscroll)
				if (menuSize != null) {
					for (var i = 0; i < menuSize; i++) {
						contentTop[i] = $('#' + content[i] + '').offset().top;
						console.log(contentTop[i])
						function bottomView(i) {
							contentView = $('#' + content[i] + '').height() * .4;
							testView = contentTop[i] - contentView;
							console.log(testView)
							//console.log(varscroll);
							if (varscroll > testView) {
								$('.' + itemClass).removeClass(itemHover);
								$('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
							} else if (varscroll < 50) {
								$('.' + itemClass).removeClass(itemHover);
								$('.' + itemClass + ':eq(0)').addClass(itemHover);
							}
						}
						if (scrollDir == 'down' && varscroll > contentTop[i] - 50 && varscroll < contentTop[i] + 50) {
							$('.' + itemClass).removeClass(itemHover);
							$('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
						}
						if (scrollDir == 'up') {
							bottomView(i);
							console.log(bottomView(i))
						}
					}
				}



				if (vartop < varscroll + topMargin) {
					
					$('.stuckMenu').next().closest('div').css({
						'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
					}, 10);
					// $('.stuckMenu').addClass('isStuck');
					// $('.stuckMenu').css("position", "fixed");
					// $('.isStuck').css({
					// 	top: '0px'
					// }, 10, function() {

					// });
				};

				if (varscroll + topMargin < vartop) {
					// $('.stuckMenu').removeClass('isStuck');
					// $('.stuckMenu').css("position", "relative");
					$('.stuckMenu').next().closest('div').css({
						'margin-top': currentMarginT + 'px'
					}, 10);
				};

			});
		});

	});