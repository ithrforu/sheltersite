export default function modalWindowsToggle() {

	const carousel     = document.querySelector('.friends__cards');

	// Listener for window open by card click
	carousel.addEventListener('click', (e) => {
		const friendsElement = e.target.closest('.carousel__card');

		if(friendsElement) {
			const modalWindow = friendsElement.querySelector('.friends__modal');

			if(!modalWindow.open) {
				modalWindow.showModal();
				document.body.classList.toggle('body--hidden');
			}
		}
	});

	// Listener for modal window close by click on close button
	// or by click on space without window
	document.addEventListener('click', (e) => {
		if(!e.target.closest('.friends__article') && e.target.open) {
			e.target.close();
			document.body.classList.toggle('body--hidden');
		}

		if(e.target.closest('.friends__article-button')) {
			e.target.closest('.friends__modal').close();
			document.body.classList.toggle('body--hidden');
		}
	});

}