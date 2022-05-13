async function fetchAsyncTodos(url) {
	const response = await fetch(url);
	return response.json();
}

const dataArray = await fetchAsyncTodos('./../assets/json/pets.json');

export default function paginationSlide() {

	function createCards(paginationlItem, cardsArray) {
		paginationlItem.innerHTML = '';

		for(let card of cardsArray) {
			const cardTemplate = document.createElement('div');
			cardTemplate.classList.add('pagination__card');
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
			paginationlItem.appendChild(cardTemplate);
		}
	}

	const cards = dataArray.slice(0);
	const ITEM  = document.querySelector('.pagination__item');
	createCards(ITEM, cards);
	console.log(cards);

}