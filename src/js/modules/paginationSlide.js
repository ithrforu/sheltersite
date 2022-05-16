async function fetchAsyncData(url) {
	const response = await fetch(url);
	return response.json();
}

const dataArray = await fetchAsyncData('assets/json/pets.json');

export default function paginationSlide() {

	const cards = dataArray.slice(0);
	const PAGINATION   = document.querySelector('.pagination__inner');
	const BUTTON_FIRST = document.querySelector('.button-nav--first');
	const BUTTON_PREV  = document.querySelector('.button-nav--prev');
	const BUTTON_NEXT  = document.querySelector('.button-nav--next');
	const BUTTON_LAST  = document.querySelector('.button-nav--last');
	let pageCounter;
	let pageAmount;

	// Cards shuffle (The Fisher–Yates shuffle)
	function getRandomCards(array) {

		for(let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
			let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

	}

	// Pagination steps
	let step;

	const mediaQueries = {
		mediaQueryMax: {
			query: '(min-width: 1280px)',
			step: 8,
			},

		mediaQueryMid: {
			query: '(min-width: 768px) and (max-width: 1279px)',
			step: 6,
			},

		mediaQuerySmall: {
			query: '(max-width: 767px)',
			step: 3,
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
			generateStartCards();
		}

		if(query.matches && query.media === queryMid.query) {
			step = queryMid.step;
			generateStartCards();
		}

		if(query.matches && query.media === querySmall.query) {
			step = querySmall.step;
			generateStartCards();
		}
	}

	// Generate 48 pseudo random cards
	// And after set media queries states to inital values
	function generateStartCards() {
		PAGINATION.innerHTML = '';

		let cardsCount = 0;
		let pageCount = 1;

		while(cardsCount < 48) {
			getRandomCards(cards);
			const stepCards = cards.slice(0, step);
			createPage(pageCount, stepCards);

			cardsCount += step;
			pageCount += 1;
		}

		// Initial pagination states
		pageCounter = 1;
		pageAmount = PAGINATION.children.length;
		makePageVisible(1);
		BUTTON_PREV.disabled = true;
		BUTTON_FIRST.disabled = true;

		BUTTON_NEXT.disabled = false;
		BUTTON_LAST.disabled = false;

	}

	// Generate page's DOM
	function createPage(pageNumber, cardsArray) {

		const pageTemplate = document.createElement('div');
		pageTemplate.id = pageNumber;
		pageTemplate.classList.add('pagination__page');

		for(let card of cardsArray) {
			const cardTemplate = document.createElement('div');
			cardTemplate.classList.add('card', 'pagination__card');
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
								<li class="friends__article-item"><b>Inoculations:</b> ${card.inoculations.join(', ')}</li>
								<li class="friends__article-item"><b>Diseases:</b> ${card.diseases.join(', ')}</li>
								<li class="friends__article-item"><b>Parasites:</b> ${card.parasites.join(', ')}</li>
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
			pageTemplate.appendChild(cardTemplate);
		}
		PAGINATION.appendChild(pageTemplate);
	}

	function makePageVisible(pageNumber) {
		const page = document.getElementById(`${pageNumber}`);
		page.classList.add('pagination__page--active');

		const BUTTON_CURRENT = document.querySelector('.button-nav--current');
		BUTTON_CURRENT.textContent = pageNumber;
	}

	function hiddenPage(pageNumber) {
		const page = document.getElementById(`${pageNumber}`);
		page.classList.remove('pagination__page--active');
	}

	function enableNextButtons() {
		BUTTON_NEXT.disabled = false;
		BUTTON_LAST.disabled = false;

		if(pageCounter === 1) {
			BUTTON_PREV.disabled = true;
			BUTTON_FIRST.disabled = true;
		}
	}

	function enablePrevButtons() {
		BUTTON_PREV.disabled = false;
		BUTTON_FIRST.disabled = false;

		if(pageCounter === pageAmount) {
			BUTTON_NEXT.disabled = true;
			BUTTON_LAST.disabled = true;
		}
	}

	BUTTON_NEXT.addEventListener('click', (e) => {
		if(pageCounter < pageAmount) {
			pageCounter += 1;
			makePageVisible(pageCounter);
			hiddenPage(pageCounter - 1);
			enablePrevButtons();
		}
	});

	BUTTON_LAST.addEventListener('click', (e) => {
		if(pageCounter !== pageAmount) {
			hiddenPage(pageCounter);
			pageCounter = pageAmount;
			makePageVisible(pageCounter);
			enablePrevButtons();
		}
	});

	BUTTON_PREV.addEventListener('click', (e) => {
		if(pageCounter > 1) {
			pageCounter -= 1;
			makePageVisible(pageCounter);
			hiddenPage(pageCounter + 1);
			enableNextButtons();
		}
	});

	BUTTON_FIRST.addEventListener('click', (e) => {
		if(pageCounter !== 1) {
			hiddenPage(pageCounter);
			pageCounter = 1;
			makePageVisible(pageCounter);
			enableNextButtons();
		}
	});

}