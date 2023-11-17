// Function Calls
showCurrentPage();
shrinkHeaderOnScroll();
startCarousel(0);
onFAQHover();

let element = document.getElementById('default').dispatchEvent(new Event('mouseover'));

// Function Definitions
function showCurrentPage() {
	const links = document.querySelectorAll('nav > ul > li > a');
	for (const link of links) {
		if (link.pathname === window.location.pathname) link.classList.toggle('active');
	}
}

function shrinkHeaderOnScroll() {
	window.addEventListener('scroll', () => {
		const nav = document.querySelector('nav');
		const isScrolling = window.scrollY >= 50;
		nav.classList.toggle('scrolled', isScrolling);
	});
}

async function startCarousel(index) {
	const attractions = ['El Nido', 'Puerto Princesa', 'Coron', 'Port Barton', 'Balabac', 'Taytay'];
	const selectors = ['#background', '#region', '#name', '#description']
	const animations = ['fadeIn', 'fadeOut'];

	if (index == attractions.length) index = 0;
	const attraction = attractions[index];
	const elements = getElements([], selectors);
	setAttraction(attraction, elements[0]);

	await toggleAnimation(elements, animations[0], 7000);
	await toggleAnimation(elements, animations[1], 400);
	removeAnimation(elements, animations);
	startCarousel(++index);
}

function setAttraction(name, background) {
	background.src = `images/${name}.jpg`;
	name = name.split(' ');

	const attractionName = document.querySelector('#name');
	if (name.length > 1) name = [name.join(' ')];
	attractionName.innerHTML = name;
}

function getElements(elements, selectors) {
	for (const selector of selectors) {
		elements.push(document.querySelector(selector));
	}
	return elements;
}

function toggleAnimation(elements, animation, time) {
	return new Promise((resolve, reject) => {
		elements.forEach(element => {
			element.classList.toggle(animation);
		});
		setTimeout(() => resolve(), time);
	});
}

function removeAnimation(elements, animations) {
	elements.forEach(element => {
		animations.forEach(animation => {
			element.classList.remove(animation);
		})
	});
}

function onFAQHover() {
	const indicators = document.querySelectorAll('.bar');

	indicators.forEach((indicator, index) => {
		indicator.addEventListener('mouseover', () => {
			const selected = document.querySelector('.selected');
			if (selected) selected.classList.toggle('selected');

			indicator.classList.toggle('selected');
			showFAQ(index);
		});
	});
}

function showFAQ(index) {
	const questions = ['Does the agency have special prices during the holidays?',
		'Does the agency offer discounts for 3 or more passengers?',
		'Do you offer a package that has everything included?',
		'How many people can you accomodate?'];
	const answers = ['This opulent suite is designed to cater to the needs and preferences of heads of state, dignitaries, celebrities, or other prominent guests.',
		'Yes, every month, there is an offer.',
		'Yes, we have such package.',
		'We can not tell the exact number, as long as there are rooms, we can let people in.'];

	const question = document.querySelector('#question');
	const answer = document.querySelector('#answer');

	question.innerHTML = questions[index];
	answer.innerHTML = answers[index];
}
