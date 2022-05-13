async function fetchAsyncTodos(url) {
	const response = await fetch(url);
	return response.json();
}

const dataArray = await fetchAsyncTodos('./../assets/json/pets.json');

export default function carouselSlide() {

	const cards        = dataArray.slice(0);
	const carousel     = document.querySelector('.carousel__inner');
	const ITEM_LEFT    = document.querySelector('.carousel__item--left');
	const ITEM_RIGHT   = document.querySelector('.carousel__item--right');
	const ITEM_ACTIVE  = document.querySelector('.carousel__item--active');

	const BUTTON_RIGHT = document.querySelector('.button-nav--next');
	const BUTTON_LEFT  = document.querySelector('.button-nav--prev');

	// Cards shuffle (The Fisher–Yates shuffle)
	function getRandomCards(array) {

		for(let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
			let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

	}
	getRandomCards(cards);

	// Carousel steps
	let step;

	const mediaQueries = {
		mediaQueryMax: {
			query: '(min-width: 1280px)',
			step: 3,
			},

		mediaQueryMid: {
			query: '(min-width: 768px) and (max-width: 1279px)',
			step: 2,
			},

		mediaQuerySmall: {
			query: '(max-width: 767px)',
			step: 1,
			},
	};

	// Set step value by media queries check
	for(let prop in mediaQueries) {
		const matchMediaObj = window.matchMedia(mediaQueries[prop]['query']);
		setStep(matchMediaObj);
		matchMediaObj.onchange = setStep;
	}

	function setStep(query) {
		const queryMax   = mediaQueries.mediaQueryMax;
		const queryMid   = mediaQueries.mediaQueryMid;
		const querySmall = mediaQueries.mediaQuerySmall;

		if(query.matches && query.media === queryMax.query) {
			step = queryMax.step;
			createStartCards();
		}

		if(query.matches && query.media === queryMid.query) {
			step = queryMid.step;
			createStartCards();
		}

		if(query.matches && query.media === querySmall.query) {
			step = querySmall.step;
			createStartCards();
		}
	}

	function getItemNumbers(itemPosition) {
		const numbers = [];
		const itemCards = document.querySelectorAll(`.carousel__item--${itemPosition} .carousel__card`);
		itemCards.forEach(card => numbers.push(+card.dataset.unicNumber));

		return numbers;
	}

	function createStartCards() {
		const leftCards = cards.slice(0, step);
		createCards(ITEM_LEFT, leftCards);

		const leftNumbers = getItemNumbers('left');
		const activeCards = cards.filter(card => !leftNumbers.includes(card.unicNumber)).slice(0, step);
		createCards(ITEM_ACTIVE, activeCards);

		const activeNumbers = getItemNumbers('active');
		const rightCards = cards.filter(card => !activeNumbers.includes(card.unicNumber)).slice(0, step);
		createCards(ITEM_RIGHT, rightCards);
	}

	// Generate cards DOM
	function createCards(carouselItem, cardsArray) {
		carouselItem.innerHTML = '';

		for(let card of cardsArray) {
			const cardTemplate = document.createElement('div');
			cardTemplate.classList.add('carousel__card');
			cardTemplate.dataset.unicNumber = card.unicNumber;
			cardTemplate.innerHTML = `
				<div class="friends__card">
					<figure class="friends__figure">
						<img class="friends__photo"
						     src="assets/images/${card.img}.jpg"
						     alt="${card.name} photo">
						<figcaption class="friends__name">${card.name}</figcaption>
					</figure>

					<button class="button button--color--light friends__card-button">Learn more</button>
				</div>

				<dialog class="friends__modal">
					<article class="friends__article" tabindex="1">
						<img class="friends__article-image"
						     src="assets/images/${card.img}-500px.jpg"
						     alt="${card.name} description photo">

						<div class="friends__article-text">
							<h3 class="friends__article-title">${card.name}</h3>
							<span class="friends__article-subtitle">${card.type} - ${card.breed}</span>

							<p class="friends__article-paragraph">${card.description}</p>

							<ul class="friends__article-list">
								<li class="friends__article-item"><b>Age:</b> ${card.age}</li>
								<li class="friends__article-item"><b>Inoculations:</b> ${card.inoculations.join()}</li>
								<li class="friends__article-item"><b>Diseases:</b> ${card.diseases.join()}</li>
								<li class="friends__article-item"><b>Parasites:</b> ${card.parasites.join()}</li>
							</ul>
						</div>

						<button class="friends__article-button button-nav button-nav--color--light"
						        type="button"
						        aria-label="Close window"
						        title="Close card's window">
							<svg width="12" 
							     height="12" 
							     viewBox="0 0 12 12" 
							     fill="none" 
							     xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" c
									      lip-rule="evenodd" 
									      d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" 
									      fill="#292929"/>
							</svg>
						</button>
					</article>
				</dialog>
			`;
			carouselItem.appendChild(cardTemplate);
		}

	}

	function generateCards(NodeForChange) {
		// Shuffle cards array
		getRandomCards(cards);

		const activeNumbers = getItemNumbers('active');
		let generatedCards;

		if(step === mediaQueries.mediaQuerySmall.step) {
			// For mediaQuerySmall
			// Generate array of not viewed cards (witch viewed cards array dont have)
			// ViewNumbers is a global scope array
			viewedNumbers.push(...activeNumbers);

			if(cards.length === viewedNumbers.length) {
				viewedNumbers = viewedNumbers.slice(viewedNumbers.length - 2, viewedNumbers.length - 1)
			}

			generatedCards = cards.filter(card => !viewedNumbers.includes(card.unicNumber));
		} else {
			// For other queries
			// Generate unic cards (witch active carousel item dont have)
			generatedCards = cards.filter(card => !activeNumbers.includes(card.unicNumber));
		}

		// Splice generated cards by amount of active cards
		generatedCards.splice(step);

		// Create DOM of changed cards
		createCards(NodeForChange, generatedCards);
	}

	// Animation and listeners settings
	function moveLeft() {
		carousel.classList.add('transition-left');

		BUTTON_LEFT.removeEventListener('click', moveLeft);
		BUTTON_RIGHT.removeEventListener('click', moveRight);
	}

	function moveRight() {
		carousel.classList.add('transition-right');

		BUTTON_LEFT.removeEventListener('click', moveLeft);
		BUTTON_RIGHT.removeEventListener('click', moveRight);
	}

	// Button listeners
	BUTTON_LEFT.addEventListener('click', moveLeft);
	BUTTON_RIGHT.addEventListener('click', moveRight);

	// For mediaQuerySmall. Push start active card's number to viewNumbers array
	let viewedNumbers;
	if(step === mediaQueries.mediaQuerySmall.step) {
		const activeNumbers = getItemNumbers('active');
		viewedNumbers       = [...activeNumbers];
	}

	// Items swap logic
	carousel.addEventListener('animationend', (animationEvent) => {
		let changeItem;

		// Slider animation classes remove and cards swaps
		if(animationEvent.animationName === 'move-left') {
			carousel.classList.remove('transition-left');
			ITEM_RIGHT.innerHTML = ITEM_ACTIVE.innerHTML;
			ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
			changeItem = ITEM_LEFT;
		} else {
			carousel.classList.remove('transition-right');
			ITEM_LEFT.innerHTML = ITEM_ACTIVE.innerHTML;
			ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
			changeItem = ITEM_RIGHT;
		}
		generateCards(changeItem);

		// Return button listeners after remove by button 'click'
		BUTTON_LEFT.addEventListener('click', moveLeft);
		BUTTON_RIGHT.addEventListener('click', moveRight);
	});

	}