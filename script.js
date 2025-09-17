// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.querySelector('.nav__toggle');
if (navToggle) {
	navToggle.addEventListener('click', () => {
		document.querySelector('.nav')?.classList.toggle('open');
	});
}
// Header shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
	header?.classList.toggle('scrolled', window.scrollY > 4);
});

// Scroll progress bar animation
const scrollProgress = document.getElementById('scrollProgress');
function updateProgress() {
	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const percent = height > 0 ? (scrollTop / height) * 100 : 0;
	if (scrollProgress) scrollProgress.style.width = `${percent}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// Typewriter effect for hero subtitle
(function typewriter() {
	const el = document.querySelector('[data-key="hero-subtitle"]');
	if (!el) return;
	const full = el.textContent.trim();
	let i = 0;
	function tick() {
		el.textContent = full.slice(0, i);
		i++;
		if (i <= full.length) setTimeout(tick, 35);
	}
	// Only run once per load
	if (!sessionStorage.getItem('typed')) {
		el.textContent = '';
		tick();
		sessionStorage.setItem('typed', '1');
	}
})();

// Background particles (lightweight)
(function particles() {
	const canvas = document.getElementById('bgParticles');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	let w, h, dpr;
	const particles = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.5, vx: (Math.random() - 0.5) * 0.0005, vy: (Math.random() - 0.5) * 0.0005 }));

	function resize() {
		dpr = window.devicePixelRatio || 1;
		w = canvas.width = window.innerWidth * dpr;
		h = canvas.height = window.innerHeight * dpr;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ctx.scale(dpr, dpr);
	}
	window.addEventListener('resize', resize);
	resize();

	function step() {
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
		particles.forEach(p => {
			p.x += p.vx; p.y += p.vy;
			if (p.x < 0 || p.x > 1) p.vx *= -1;
			if (p.y < 0 || p.y > 1) p.vy *= -1;
			ctx.beginPath();
			ctx.arc(p.x * window.innerWidth, p.y * window.innerHeight, p.r, 0, Math.PI * 2);
			ctx.fill();
		});
		requestAnimationFrame(step);
	}
	step();
})();

// Counters animation on reveal
(function counters() {
	const els = document.querySelectorAll('[data-counter]');
	if (!els.length) return;
	const obs = new IntersectionObserver((entries) => {
		entries.forEach(e => {
			if (e.isIntersecting) {
				const num = e.target;
				const target = parseInt(num.getAttribute('target'), 10) || 0;
				let cur = 0;
				const inc = Math.max(1, Math.ceil(target / 80));
				const id = setInterval(() => {
					cur += inc;
					if (cur >= target) { cur = target; clearInterval(id); }
					num.textContent = cur.toString();
				}, 20);
				obs.unobserve(num);
			}
		});
	}, { threshold: 0.3 });
	els.forEach(el => obs.observe(el));
})();

// Carousel auto-fade (if multiple images present)
document.querySelectorAll('.carousel').forEach((wrap) => {
	const imgs = wrap.querySelectorAll('img');
	if (imgs.length <= 1) { imgs[0]?.classList.add('active'); return; }
	let i = 0; imgs[0].classList.add('active');
	setInterval(() => {
		imgs[i].classList.remove('active');
		i = (i + 1) % imgs.length;
		imgs[i].classList.add('active');
	}, 3000);
});

// Parallax tilt on cards
document.querySelectorAll('.card').forEach((card) => {
	card.addEventListener('mousemove', (e) => {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left; const y = e.clientY - rect.top;
		const rx = ((y / rect.height) - 0.5) * -6; // rotateX
		const ry = ((x / rect.width) - 0.5) * 6; // rotateY
		card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
	});
	card.addEventListener('mouseleave', () => {
		card.style.transform = 'translateY(-2px)';
	});
});

// Theme toggle using icon button near Contact
const themeIconBtn = document.getElementById('themeIconBtn');
const THEME_KEY = 'site-theme';
function applyThemeClass(theme) {
	if (theme === 'dark') {
		document.documentElement.classList.add('theme-dark');
		if (themeIconBtn) { themeIconBtn.textContent = '☾'; themeIconBtn.setAttribute('aria-pressed', 'true'); }
		// Dark background override
		document.body.style.backgroundImage = [
			'radial-gradient(260px circle at 22% 30%, rgba(255,255,255,.10) 0, transparent 60%)',
			'radial-gradient(320px circle at 82% 38%, rgba(255,255,255,.10) 0, transparent 60%)',
			'linear-gradient(135deg, #7c3aed 0%, #a855f7 45%, #7b2cbf 100%)',
			'repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 32px)',
			'repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, transparent 1px 32px)'
		].join(',');
	} else {
		document.documentElement.classList.remove('theme-dark');
		if (themeIconBtn) { themeIconBtn.textContent = '☀'; themeIconBtn.setAttribute('aria-pressed', 'false'); }
		// Light background
		document.body.style.backgroundImage = [
			'radial-gradient(280px circle at 20% 12%, rgba(14,165,233,.14) 0, transparent 60%)',
			'radial-gradient(340px circle at 85% 40%, rgba(99,102,241,.12) 0, transparent 58%)',
			'linear-gradient(135deg, #f0f9ff 0%, #ecfeff 50%, #f8fafc 100%)',
			'repeating-linear-gradient(0deg, rgba(0,0,0,.03) 0 1px, transparent 1px 32px)',
			'repeating-linear-gradient(90deg, rgba(0,0,0,.03) 0 1px, transparent 1px 32px)'
		].join(',');
	}
}
// Initialize from storage
applyThemeClass(localStorage.getItem(THEME_KEY) || 'light');
// Click toggles
themeIconBtn?.addEventListener('click', () => {
	const current = localStorage.getItem(THEME_KEY) || 'light';
	const next = current === 'dark' ? 'light' : 'dark';
	localStorage.setItem(THEME_KEY, next);
	applyThemeClass(next);
	// icon feedback
	themeIconBtn.classList.remove('spin');
	void themeIconBtn.offsetWidth; // restart animation
	themeIconBtn.classList.add('spin');
});

// Ripple effect on theme button
themeIconBtn?.addEventListener('click', (e) => {
	const rect = themeIconBtn.getBoundingClientRect();
	const x = e.clientX - rect.left; const y = e.clientY - rect.top;
	const span = document.createElement('span');
	span.className = 'ripple';
	span.style.left = `${x}px`; span.style.top = `${y}px`;
	themeIconBtn.appendChild(span);
	setTimeout(() => span.remove(), 650);
});

// Magnetic cursor effect on avatar
(function magnetic() {
	const avatar = document.querySelector('.hero__media');
	if (!avatar) return;
	avatar.addEventListener('mousemove', (e) => {
		const r = avatar.getBoundingClientRect();
		const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
		const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
		avatar.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
	});
	avatar.addEventListener('mouseleave', () => {
		avatar.style.transform = '';
	});
})();

// Pulse ring on avatar when entering dark mode
(function darkPulseHook() {
	const avatar = document.querySelector('.hero__media');
	if (!avatar) return;
	const origApply = applyThemeClass;
	applyThemeClass = function(theme) {
		origApply(theme);
		if (theme === 'dark') {
			const ring = document.createElement('span');
			ring.className = 'pulse-ring';
			avatar.appendChild(ring);
			setTimeout(() => ring.remove(), 1200);
		}
	}
})();

// About section inline edit
const aboutText = document.getElementById('about-text');
const aboutEditBtn = document.getElementById('about-edit-toggle');

aboutEditBtn?.addEventListener('click', () => {
	const isEditing = aboutText?.getAttribute('contenteditable') === 'true';
	if (!aboutText) return;
	if (isEditing) {
		aboutText.setAttribute('contenteditable', 'false');
		aboutEditBtn.textContent = 'Edit';
		aboutEditBtn.setAttribute('aria-pressed', 'false');
		localStorage.setItem('about-text', aboutText.innerHTML.trim());
	} else {
		aboutText.setAttribute('contenteditable', 'true');
		aboutText.focus();
		aboutEditBtn.textContent = 'Save';
		aboutEditBtn.setAttribute('aria-pressed', 'true');
	}
});

// Load saved about text
const storedAbout = localStorage.getItem('about-text');
if (storedAbout && aboutText) {
	aboutText.innerHTML = storedAbout;
}

// Generic inline edit/save toggler by section
function makeSectionEditable(toggleId, selector, storagePrefix) {
	const btn = document.getElementById(toggleId);
	const fields = document.querySelectorAll(`${selector}[data-editable][data-key]`);
	// Load saved
	fields.forEach((el) => {
		const key = el.getAttribute('data-key');
		if (!key) return;
		const saved = localStorage.getItem(`${storagePrefix}-${key}`);
		if (saved) el.innerHTML = saved;
	});
	btn?.addEventListener('click', () => {
		const isEditing = btn.getAttribute('aria-pressed') === 'true';
		if (isEditing) {
			fields.forEach((el) => {
				el.setAttribute('contenteditable', 'false');
				const key = el.getAttribute('data-key');
				if (key) localStorage.setItem(`${storagePrefix}-${key}`, el.innerHTML.trim());
			});
			btn.textContent = 'Edit';
			btn.setAttribute('aria-pressed', 'false');
		} else {
			fields.forEach((el) => el.setAttribute('contenteditable', 'true'));
			const first = fields[0];
			if (first instanceof HTMLElement) first.focus();
			btn.textContent = 'Save';
			btn.setAttribute('aria-pressed', 'true');
		}
	});
}

// Hero editable
makeSectionEditable('hero-edit-toggle', '[data-section="hero"]', 'hero');
// Projects editable (titles/descriptions already handled above but unify keys)
makeSectionEditable('projects-edit-toggle', '[data-section="projects"]', 'projects');
// Skills editable
makeSectionEditable('skills-edit-toggle', '[data-section="skills"]', 'skills');
// Contact editable
makeSectionEditable('contact-edit-toggle', '[data-section="contact"]', 'contact');

// Projects inline edit
const projectsEditBtn = document.getElementById('projects-edit-toggle');
const editableProjectFields = document.querySelectorAll('[data-editable]');

function loadProjectEdits() {
	editableProjectFields.forEach((el) => {
		const key = el.getAttribute('data-key');
		if (!key) return;
		const savedVal = localStorage.getItem(key);
		if (savedVal) el.innerHTML = savedVal;
	});
}
loadProjectEdits();

projectsEditBtn?.addEventListener('click', () => {
	const isEditing = projectsEditBtn.getAttribute('aria-pressed') === 'true';
	if (isEditing) {
		editableProjectFields.forEach((el) => {
			el.setAttribute('contenteditable', 'false');
			const key = el.getAttribute('data-key');
			if (key) localStorage.setItem(key, el.innerHTML.trim());
		});
		projectsEditBtn.textContent = 'Edit';
		projectsEditBtn.setAttribute('aria-pressed', 'false');
	} else {
		editableProjectFields.forEach((el) => el.setAttribute('contenteditable', 'true'));
		const first = editableProjectFields[0];
		if (first instanceof HTMLElement) first.focus();
		projectsEditBtn.textContent = 'Save';
		projectsEditBtn.setAttribute('aria-pressed', 'true');
	}
});

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
	const show = window.scrollY > 300;
	if (!backToTop) return;
	backToTop.hidden = !show;
	backToTop.classList.toggle('show', show);
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			io.unobserve(entry.target);
		}
	});
}, { threshold: 0.1 });
revealEls.forEach((el) => io.observe(el));

// Scrollspy (active nav)
const sections = document.querySelectorAll('main[id], section[id]');
const navLinks = document.querySelectorAll('.nav__links a');
const spy = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
		}
	});
}, { rootMargin: '-50% 0px -40% 0px', threshold: 0 });
sections.forEach((s) => spy.observe(s));

// Copy email to clipboard
const copyBtn = document.getElementById('copyEmail');
const contactEmail = document.getElementById('contactEmail');
copyBtn?.addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText(contactEmail?.textContent?.trim() || '');
		copyBtn.textContent = 'Copied!';
		setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
	} catch (e) {
		copyBtn.textContent = 'Copy failed';
		setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
	}
});

// Message character counter
const message = document.getElementById('message');
const messageCount = document.getElementById('messageCount');
message?.addEventListener('input', () => {
	const max = message.getAttribute('maxlength') ? parseInt(message.getAttribute('maxlength'), 10) : 500;
	const len = message.value.length;
	if (messageCount) messageCount.textContent = `${len} / ${max}`;
});
if (message && messageCount) messageCount.textContent = `0 / ${message.getAttribute('maxlength') || 500}`;

// Removed auto purple preset to avoid overriding theme backgrounds