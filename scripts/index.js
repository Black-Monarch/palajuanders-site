// Function Calls
isOnDesktop();
changeAttraction(0);
faqsItem();

// Functions
function faqsItem() {
	const questionBullets = document.querySelectorAll(".faqitem");

	questionBullets.forEach((faqitem) => {
		const question = faqitem.querySelector(".question");
		const answer = faqitem.querySelector(".answer");

		question.addEventListener("click", () => {
			faqitem.classList.toggle("active");
		});
	});
}

async function changeAttraction(index) {
	const attractions = ['El Nido', 'Puerto Princesa', 'Coron', 'Port Barton', 'Balabac', 'Taytay'];
	const selectors = ['.background', '.text-region', '.text-attraction', '.text-description']
	const animations = ['fadeIn', 'fadeOut'];

	if (index == attractions.length) index = 0;
	const attraction = attractions[index];
	const elements = getElements([], selectors);
	setAttraction(attraction, elements[0]);

	await toggleAnimation(elements, animations[0], 7000);
	await toggleAnimation(elements, animations[1], 400);
	removeAnimation(elements, animations);
	changeAttraction(++index);
}

function setAttraction(name, background) {
	background.src = `images/${name}.jpg`;
	name = name.split(' ');

	const attractionName = document.querySelector('.text-attraction');
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

function isOnDesktop() {
	const mediaQuery = window.matchMedia('(min-width: 768px)')
	if (mediaQuery.matches) {
		changeHeaderColorOnSroll();
	}
}

function changeHeaderColorOnSroll() {
	window.addEventListener('scroll', () => {
		const nav = document.querySelector('nav');
		const header = document.querySelector('header');
		// const isScrolling = window.scrollY >= window.innerHeight - header.clientHeight / 2;
		// nav.classList.toggle('scrolled', isScrolling);

		const isScrolling = window.scrollY >= window.innerHeight - header.clientHeight / 2 - 20;
		header.classList.toggle('scrolled', isScrolling);
	});
}