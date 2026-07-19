/**
 * Header behaviour:
 *  1. Color-switch — the header is light over the hero, then flips to a solid
 *     light bar with dark text as soon as the page starts scrolling.
 *  2. Mobile burger toggle.
 */
(function () {
	'use strict';

	var header = document.querySelector('[data-header]');
	var hero = document.querySelector('[data-hero]');

	if (header) {
		if (hero) {
			// Flip the moment the user scrolls away from the very top.
			var threshold = 24;
			var scrolled = null;
			var sync = function () {
				var now = window.pageYOffset > threshold;
				if (now !== scrolled) {
					scrolled = now;
					header.classList.toggle('is-scrolled', now);
				}
			};
			window.addEventListener('scroll', sync, { passive: true });
			sync();
		} else {
			// Non-hero pages: keep the solid header from the start.
			header.classList.add('is-scrolled');
		}
	}

	var burger = document.querySelector('[data-burger]');
	if (burger) {
		burger.addEventListener('click', function () {
			var open = document.body.classList.toggle('nav-open');
			burger.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	}
})();

/**
 * Services slider — active on mobile only. Desktop keeps the CSS grid.
 * Prev/next translate the track, update the NN / NN counter, mark the
 * selected card with the dark state, and disable buttons at the ends.
 */
(function () {
	'use strict';

	var slider = document.querySelector('[data-slider]');
	if (!slider) return;

	var track = slider.querySelector('[data-slider-track]');
	var slides = Array.prototype.slice.call(track.children);
	var prev = document.querySelector('[data-slider-prev]');
	var next = document.querySelector('[data-slider-next]');
	var currentEl = document.querySelector('[data-slider-current]');
	var totalEl = document.querySelector('[data-slider-total]');
	var mq = window.matchMedia('(max-width: 900px)');
	var index = 0;

	function pad(n) { return (n < 10 ? '0' : '') + n; }

	function step() {
		if (slides.length < 2) return slides.length ? slides[0].offsetWidth : 0;
		return slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
	}

	var last = slides.length - 1;

	function render() {
		if (totalEl) totalEl.textContent = pad(slides.length);

		if (!mq.matches) {
			track.style.transform = '';
			slides.forEach(function (s) { s.classList.remove('is-active'); });
			return;
		}

		index = Math.max(0, Math.min(index, last));
		track.style.transform = 'translateX(' + (-index * step()) + 'px)';
		slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
		if (currentEl) currentEl.textContent = pad(index + 1);
		if (prev) prev.disabled = index <= 0;
		if (next) next.disabled = index >= last;
	}

	if (prev) prev.addEventListener('click', function () { index -= 1; render(); });
	if (next) next.addEventListener('click', function () { index += 1; render(); });
	window.addEventListener('resize', render);
	if (mq.addEventListener) { mq.addEventListener('change', render); }
	else if (mq.addListener) { mq.addListener(render); }

	render();
})();

/**
 * 4-step resolution process — one shared index drives:
 *  desktop: label/title/text swap, step numbers, and the bridge deck line
 *           (the dark rect scales 25% → 100% along the bridge);
 *  mobile:  the card track slides, the NN / 04 counter and the plain
 *           progress line advance.
 */
(function () {
	'use strict';

	var root = document.querySelector('[data-process]');
	if (!root) return;

	function parse(attr) {
		try { return JSON.parse(root.getAttribute(attr)) || []; }
		catch (e) { return []; }
	}

	function pad(n) { return (n < 10 ? '0' : '') + n; }

	var labels = parse('data-labels');
	var titles = parse('data-titles');
	var texts = parse('data-texts');
	var total = Math.max(labels.length, titles.length, texts.length);
	if (total < 2) return;

	var labelEl = root.querySelector('[data-process-label]');
	var titleEl = root.querySelector('[data-process-title]');
	var textEl = root.querySelector('[data-process-text]');
	var content = root.querySelector('[data-process-content]');
	var steps = Array.prototype.slice.call(root.querySelectorAll('[data-process-steps] > *'));
	var prevs = Array.prototype.slice.call(root.querySelectorAll('[data-process-prev]'));
	var nexts = Array.prototype.slice.call(root.querySelectorAll('[data-process-next]'));
	var bridgeBar = root.querySelector('[data-process-bridge-bar]');
	var mobileBar = root.querySelector('[data-process-bar]');
	var track = root.querySelector('[data-process-track]');
	var slides = track ? Array.prototype.slice.call(track.children) : [];
	var currentEl = root.querySelector('[data-process-current]');
	var index = 0;

	function step() {
		if (slides.length < 2) return slides.length ? slides[0].offsetWidth : 0;
		return slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
	}

	// Restart the slide/fade animation on the desktop content block.
	function animate(dir) {
		if (!content) return;
		content.style.setProperty('--slide-from', dir < 0 ? '-24px' : '24px');
		content.classList.remove('is-animating');
		void content.offsetWidth;            // force reflow so the animation replays
		content.classList.add('is-animating');
	}

	function render(dir) {
		if (labelEl && labels[index] != null) labelEl.textContent = labels[index];
		if (titleEl && titles[index] != null) titleEl.textContent = titles[index];
		if (textEl && texts[index] != null) textEl.textContent = texts[index];
		steps.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
		if (bridgeBar) bridgeBar.style.transform = 'scaleX(' + ((index + 1) / total) + ')';
		if (mobileBar) mobileBar.style.width = ((index + 1) / total * 100) + '%';
		if (track) track.style.transform = 'translateX(' + (-index * step()) + 'px)';
		if (currentEl) currentEl.textContent = pad(index + 1);
		prevs.forEach(function (b) { b.disabled = index <= 0; });
		nexts.forEach(function (b) { b.disabled = index >= total - 1; });
		if (dir) animate(dir);
	}

	function go(to) {
		to = Math.max(0, Math.min(to, total - 1));
		if (to === index) return;
		var dir = to > index ? 1 : -1;
		index = to;
		render(dir);
	}

	prevs.forEach(function (b) { b.addEventListener('click', function () { go(index - 1); }); });
	nexts.forEach(function (b) { b.addEventListener('click', function () { go(index + 1); }); });
	steps.forEach(function (s, i) {
		s.style.cursor = 'pointer';
		s.addEventListener('click', function () { go(i); });
	});
	if (content) {
		content.addEventListener('animationend', function () { content.classList.remove('is-animating'); });
	}
	window.addEventListener('resize', function () { render(); });

	/* Desktop scroll-pinning (no scroll hijacking). The .process__sticky wrapper is
	   position:sticky and the section is made taller than the viewport here, so the
	   wrapper stays fixed in place under the header while the extra scroll distance
	   maps 1:1 onto the slide index. When the last slide's segment is scrolled past,
	   the wrapper unpins and the page keeps scrolling to the testimonials normally.
	   Mobile keeps normal flow plus the swipe/button card slider. */
	var sticky = root.querySelector('[data-process-sticky]');
	var desktop = window.matchMedia('(min-width: 769px)');
	var segment = 0;   // scroll pixels allotted to each slide while pinned

	function readPx(value) {
		var n = parseFloat(value);
		return isNaN(n) ? 0 : n;
	}

	// Build (or tear down) the tall scroll track that the pinned wrapper rides on.
	function layout() {
		if (!sticky) return;
		if (!desktop.matches) {
			root.style.height = '';       // mobile: normal flow, CSS forces height:auto
			segment = 0;
			return;
		}
		segment = Math.round(window.innerHeight * 0.55);
		// One segment per slide: the last slide holds for its segment before releasing.
		root.style.height = (sticky.offsetHeight + total * segment) + 'px';
		syncToScroll();
	}

	// Map the current scroll offset within the pinned zone onto the slide index.
	function syncToScroll() {
		if (!desktop.matches || !segment) return;
		var headerH = readPx(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
		var padTop = readPx(getComputedStyle(root).paddingTop);
		// Sticky top is 2× the header height (see .process__sticky in main.css).
		var pinStartTop = headerH * 2 - padTop;                   // section top when the wrapper pins
		var past = pinStartTop - root.getBoundingClientRect().top; // 0 at pin start, grows on the way down
		var idx = Math.floor(past / segment);
		idx = Math.max(0, Math.min(idx, total - 1));
		if (idx !== index) go(idx);
	}

	if (sticky) {
		window.addEventListener('scroll', syncToScroll, { passive: true });
		window.addEventListener('resize', layout);
		if (desktop.addEventListener) desktop.addEventListener('change', layout);
		else if (desktop.addListener) desktop.addListener(layout);
		// Recompute once the section's real height is known (fonts/images settled).
		window.addEventListener('load', layout);
		layout();
	}

	render();
})();

/**
 * Testimonials slider — translates the track, marks the leading card dark,
 * and updates the NN pager. Works at every breakpoint.
 */
(function () {
	'use strict';

	var slider = document.querySelector('[data-quotes]');
	if (!slider) return;

	var track = slider.querySelector('[data-quotes-track]');
	var slides = Array.prototype.slice.call(track.children);
	var prev = slider.querySelector('[data-quotes-prev]');
	var next = slider.querySelector('[data-quotes-next]');
	var pages = Array.prototype.slice.call(slider.querySelectorAll('[data-quotes-pager] > *'));
	var bar = slider.querySelector('[data-quotes-bar]');
	var currentEl = slider.querySelector('[data-quotes-current]');
	var index = 0;
	var last = slides.length - 1;

	function pad(n) { return (n < 10 ? '0' : '') + n; }

	function step() {
		if (slides.length < 2) return slides.length ? slides[0].offsetWidth : 0;
		return slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
	}

	function render() {
		index = Math.max(0, Math.min(index, last));
		track.style.transform = 'translateX(' + (-index * step()) + 'px)';
		slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
		pages.forEach(function (p, i) { p.classList.toggle('is-active', i === index); });
		if (bar) bar.style.width = ((index + 1) / slides.length * 100) + '%';
		if (currentEl) currentEl.textContent = pad(index + 1);
		if (prev) prev.disabled = index <= 0;
		if (next) next.disabled = index >= last;
	}

	if (prev) prev.addEventListener('click', function () { index -= 1; render(); });
	if (next) next.addEventListener('click', function () { index += 1; render(); });
	pages.forEach(function (p, i) {
		p.style.cursor = 'pointer';
		p.addEventListener('click', function () { index = i; render(); });
	});
	window.addEventListener('resize', render);

	render();
})();

/**
 * FAQ — category filter switches the visible list; questions toggle open,
 * one at a time within their list.
 */
(function () {
	'use strict';

	var faq = document.querySelector('.faq');
	if (!faq) return;

	var filters = Array.prototype.slice.call(faq.querySelectorAll('[data-faq-filter]'));
	var panels = Array.prototype.slice.call(faq.querySelectorAll('[data-faq-panel]'));

	filters.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var target = btn.getAttribute('data-faq-filter');
			filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
			panels.forEach(function (p) {
				p.classList.toggle('is-active', p.getAttribute('data-faq-panel') === target);
			});
		});
	});

	Array.prototype.slice.call(faq.querySelectorAll('.faq-item__q')).forEach(function (q) {
		q.addEventListener('click', function () {
			var item = q.closest('.faq-item');
			var list = q.closest('.faq__list');
			var open = item.classList.contains('is-open');
			if (list) {
				Array.prototype.slice.call(list.querySelectorAll('.faq-item.is-open')).forEach(function (other) {
					if (other !== item) {
						other.classList.remove('is-open');
						var b = other.querySelector('.faq-item__q');
						if (b) b.setAttribute('aria-expanded', 'false');
					}
				});
			}
			item.classList.toggle('is-open', !open);
			q.setAttribute('aria-expanded', open ? 'false' : 'true');
		});
	});
})();

/**
 * Custom dropdowns — replace the native <select> with an accessible listbox.
 * The chosen value is mirrored into a hidden input so the form still submits.
 */
(function () {
	'use strict';

	var roots = Array.prototype.slice.call(document.querySelectorAll('[data-select]'));
	if (!roots.length) return;

	roots.forEach(function (root) {
		var button = root.querySelector('[data-select-button]');
		var menu = root.querySelector('[data-select-menu]');
		var valueEl = root.querySelector('[data-select-value]');
		var input = root.querySelector('[data-select-input]');
		var options = Array.prototype.slice.call(root.querySelectorAll('.select__option'));
		if (!button || !menu || !options.length) return;

		function isOpen() { return root.classList.contains('is-open'); }

		function open() {
			root.classList.add('is-open');
			button.setAttribute('aria-expanded', 'true');
			var active = root.querySelector('.select__option.is-active') || options[0];
			if (active) active.focus();
		}

		function close(focusButton) {
			root.classList.remove('is-open');
			button.setAttribute('aria-expanded', 'false');
			if (focusButton) button.focus();
		}

		function choose(opt) {
			options.forEach(function (o) {
				var on = o === opt;
				o.setAttribute('aria-selected', on ? 'true' : 'false');
				o.classList.toggle('is-active', on);
			});
			if (valueEl) {
				valueEl.textContent = opt.textContent;
				valueEl.classList.remove('is-placeholder');
			}
			if (input) input.value = opt.getAttribute('data-value') || '';
		}

		button.addEventListener('click', function () { isOpen() ? close() : open(); });
		button.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
		});

		options.forEach(function (opt, i) {
			opt.addEventListener('click', function () { choose(opt); close(true); });
			opt.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(opt); close(true); }
				else if (e.key === 'ArrowDown') { e.preventDefault(); (options[i + 1] || options[0]).focus(); }
				else if (e.key === 'ArrowUp') { e.preventDefault(); (options[i - 1] || options[options.length - 1]).focus(); }
				else if (e.key === 'Escape') { e.preventDefault(); close(true); }
			});
		});

		document.addEventListener('click', function (e) {
			if (isOpen() && !root.contains(e.target)) close();
		});
	});
})();

/**
 * Based in Toronto — draws the thin connector line from the info card to the
 * Toronto dot on the map. Recomputed on resize so it stays attached in both
 * the desktop (card left) and mobile (card below) layouts.
 */
(function () {
	'use strict';

	var stage = document.querySelector('[data-toronto]');
	if (!stage) return;

	var card = stage.querySelector('.toronto__card');
	var dot = stage.querySelector('.toronto__dot');
	var svg = stage.querySelector('.toronto__wire');
	var line = svg ? svg.querySelector('line') : null;
	if (!card || !dot || !line) return;

	function draw() {
		var s = stage.getBoundingClientRect();
		var c = card.getBoundingClientRect();
		var d = dot.getBoundingClientRect();
		if (!s.width || !c.width || !d.width) return;

		var dx = d.left + d.width / 2 - s.left;
		var dy = d.top + d.height / 2 - s.top;
		var cx = c.left + c.width / 2 - s.left;
		var cy = c.top + c.height / 2 - s.top;

		// Start the line where the card's border faces the dot.
		var vx = dx - cx;
		var vy = dy - cy;
		var tx = vx ? ((vx > 0 ? c.right - s.left : c.left - s.left) - cx) / vx : Infinity;
		var ty = vy ? ((vy > 0 ? c.bottom - s.top : c.top - s.top) - cy) / vy : Infinity;
		var t = Math.min(Math.abs(tx), Math.abs(ty));

		svg.setAttribute('viewBox', '0 0 ' + s.width + ' ' + s.height);
		if (s > 768) {
			line.setAttribute("x1", (cx + vx * t) / 4);
		} else {
			line.setAttribute("x1", (cx + vx * t) / 2 + 50 );
		}
		
		line.setAttribute('y1', cy + vy * t);
		line.setAttribute('x2', dx);
		line.setAttribute('y2', dy);
	}

	var mapImg = stage.querySelector('.toronto__map img');
	if (mapImg) {
		if (mapImg.complete) draw();
		else mapImg.addEventListener('load', draw);
	}
	window.addEventListener('resize', draw);
	window.addEventListener('load', draw);
	if (typeof ResizeObserver === 'function') {
		new ResizeObserver(draw).observe(stage);
	}
	window.requestAnimationFrame(draw);
	draw();
})();
