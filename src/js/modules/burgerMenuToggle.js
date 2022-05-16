export default function burgerMenuToggle() {

	const menuButton = document.querySelector('.menu__button');
	const menu       = document.querySelector('.menu');

	menuButton.addEventListener('click', (e) => {
		menuToggle();
		e.stopPropagation();
	});

	document.addEventListener('click', (e) => {
		if(!e.target.classList.contains('menu__list') && menu.classList.contains('menu--active')) {
			menuToggle();
		}
	});

	function menuToggle() {
		const logoLink = document.querySelector('.logo-link');

		menu.classList.toggle('menu--active');
		logoLink.classList.toggle('logo-link--fixed');
		document.body.classList.toggle('body--hidden');

		if(menu.classList.contains('menu--active')) {
			menuButton.setAttribute('aria-expanded', 'true');
		} else {
			menuButton.setAttribute('aria-expanded', 'false');
		};
	}

}

