// Function Calls
showCurrentPage();
shrinkHeaderOnScroll();
startCarousel(0);

// Function Definitions
function shrinkHeaderOnScroll() {
	window.addEventListener('scroll', () => {
		const nav = document.querySelector('nav');
		// const isScrolling = window.scrollY >= window.innerHeight - nav.clientHeight - 50;
		const isScrolling = window.scrollY >= 50;
		nav.classList.toggle('scrolled', isScrolling);
	});
}

function showCurrentPage() {
	const links = document.querySelectorAll('nav > ul > li > a');
	for (const link of links) {
		if (link.pathname === window.location.pathname) link.classList.toggle('active');
	}	
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
	await toggleAnimation(elements, animations[1], 500);
	removeAnimation(elements, animations);
	startCarousel(++index);
}

function setAttraction(name, background) {
	background.src = `images/${name}.jpg`;
	name = name.split(' ');

	const attractionName = document.querySelector('#name');
	if (name.length > 1) name = [name.join(' ')];
	console.log(name);
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
